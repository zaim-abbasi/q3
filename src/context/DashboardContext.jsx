import { createContext, useContext, useState } from 'react';
import { studentData, coursesData, announcements } from '../data/mockData';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [student] = useState(studentData);
  const [courses] = useState(coursesData);
  const [notifications] = useState(announcements);

  const getAssignmentsByCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.assignments : [];
  };

  const getCourseProgress = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.progress : 0;
  };

  const value = {
    student,
    courses,
    notifications,
    getAssignmentsByCourse,
    getCourseProgress
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};