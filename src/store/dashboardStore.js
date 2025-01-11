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
        
        // Course actions
        setSelectedCourse: (courseId) => 
          set({ selectedCourse: courseId }),
        
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
        
        // Update methods
        updateCourseProgress: (courseId, progress) =>
          set(state => ({
            courses: state.courses.map(course =>
              course.id === courseId
                ? { ...course, progress }
                : course
            )
          })),
        
        updateAssignmentStatus: (courseId, assignmentId, status) =>
          set(state => ({
            courses: state.courses.map(course =>
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
            )
          }))
      }),
      {
        name: 'dashboard-storage'
      }
    )
  )
);

export default useDashboardStore;