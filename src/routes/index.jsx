import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import CourseDetails from '../pages/CourseDetails';
import Assignments from '../pages/Assignments';
import Progress from '../pages/Progress';
import Profile from '../pages/Profile';
import ErrorBoundary from '../components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'courses',
        children: [
          {
            index: true,
            element: <Courses />
          },
          {
            path: ':courseId',
            element: <CourseDetails />
          }
        ]
      },
      {
        path: 'assignments',
        element: <Assignments />
      },
      {
        path: 'progress',
        element: <Progress />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  }
]);