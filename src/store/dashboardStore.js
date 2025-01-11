import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { studentData, coursesData, announcements } from '../data/mockData';

const useDashboardStore = create(
  devtools(
    persist(
      (set, get) => ({
        student: studentData,
        courses: coursesData,
        notifications: announcements,
        selectedCourse: null,
        lastVisitedCourse: null,
        unreadNotifications: announcements.filter(n => !n.isRead).length,
        
        // Course actions
        setSelectedCourse: (courseId) => 
          set(state => ({
            selectedCourse: courseId,
            lastVisitedCourse: courseId
          })),
        
        getCourseById: (courseId) => 
          get().courses.find(course => course.id === courseId),
        
        getAssignmentsByCourse: (courseId) => {
          const course = get().getCourseById(courseId);
          return course ? course.assignments : [];
        },
        
        getPendingAssignments: () => 
          get().courses.flatMap(course => 
            course.assignments.filter(assignment => 
              assignment.status === 'pending'
            )
          ),
        
        // Progress calculations
        getOverallProgress: () => {
          const courses = get().courses;
          return Math.round(
            courses.reduce((acc, course) => acc + course.progress, 0) / courses.length
          );
        },
        
        getCourseProgress: (courseId) => {
          const course = get().getCourseById(courseId);
          return course ? course.progress : 0;
        },

        // Calculate course progress based on completed assignments
        calculateCourseProgress: (courseId) => {
          const course = get().getCourseById(courseId);
          if (!course) return 0;
          
          const totalAssignments = course.assignments.length;
          const completedAssignments = course.assignments.filter(
            a => a.status === 'completed'
          ).length;
          
          return Math.round((completedAssignments / totalAssignments) * 100);
        },
        
        // Update assignment status and recalculate progress
        updateAssignmentStatus: (courseId, assignmentId, status) =>
          set(state => {
            const updatedCourses = state.courses.map(course =>
              course.id === courseId
                ? {
                    ...course,
                    assignments: course.assignments.map(assignment =>
                      assignment.id === assignmentId
                        ? { ...assignment, status }
                        : assignment
                    )
                  }
                : course
            );

            // Recalculate course progress
            const updatedProgress = Math.round(
              (updatedCourses
                .find(c => c.id === courseId)
                ?.assignments.filter(a => a.status === 'completed').length || 0) /
              (updatedCourses.find(c => c.id === courseId)?.assignments.length || 1) *
              100
            );

            return {
              courses: updatedCourses.map(course =>
                course.id === courseId
                  ? { ...course, progress: updatedProgress }
                  : course
              )
            };
          }),

        // Notification management
        addNotification: (notification) =>
          set(state => ({
            notifications: [notification, ...state.notifications],
            unreadNotifications: state.unreadNotifications + 1
          })),

        markNotificationAsRead: (notificationId) =>
          set(state => ({
            notifications: state.notifications.map(notification =>
              notification.id === notificationId
                ? { ...notification, isRead: true }
                : notification
            ),
            unreadNotifications: state.unreadNotifications - 1
          })),

        markAllNotificationsAsRead: () =>
          set(state => ({
            notifications: state.notifications.map(notification => ({
              ...notification,
              isRead: true
            })),
            unreadNotifications: 0
          }))
      }),
      {
        name: 'dashboard-storage',
        version: 1
      }
    )
  )
);

export default useDashboardStore;