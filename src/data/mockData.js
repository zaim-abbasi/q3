export const studentData = {
  id: "1",
  name: "Muhammad Ahmed Khan",
  email: "ahmed.khan@nu.edu.pk",
  program: "Computer Science",
  semester: 3,
  enrollmentYear: 2022,
  rollNo: "21K-3025",
  enrollmentStatus: "active"
};

export const coursesData = [
  {
    id: "CS101",
    name: "Introduction to Programming",
    instructor: "Dr. Zafar Iqbal",
    progress: 75,
    assignments: [
      { id: 1, title: "Variables and Data Types", deadline: "2024-03-20", status: "completed" },
      { id: 2, title: "Control Structures", deadline: "2024-03-25", status: "pending" }
    ]
  },
  {
    id: "CS102",
    name: "Data Structures",
    instructor: "Dr. Saima Shahid",
    progress: 60,
    assignments: [
      { id: 3, title: "Arrays and Lists", deadline: "2024-03-22", status: "completed" },
      { id: 4, title: "Trees and Graphs", deadline: "2024-03-28", status: "pending" }
    ]
  },
  {
    id: "CS201",
    name: "Database Systems",
    instructor: "Dr. Asad Ali",
    progress: 45,
    assignments: [
      { id: 5, title: "SQL Basics", deadline: "2024-03-21", status: "pending" }
    ]
  },
  {
    id: "CS202",
    name: "Web Development",
    instructor: "Prof. Fatima Hassan",
    progress: 80,
    assignments: [
      { id: 6, title: "HTML & CSS", deadline: "2024-03-23", status: "completed" }
    ]
  },
  {
    id: "CS301",
    name: "Software Engineering",
    instructor: "Dr. Imran Khan",
    progress: 30,
    assignments: [
      { id: 7, title: "Requirements Analysis", deadline: "2024-03-26", status: "pending" }
    ]
  },
  {
    id: "CS302",
    name: "Computer Networks",
    instructor: "Prof. Ayesha Malik",
    progress: 55,
    assignments: [
      { id: 8, title: "Network Protocols", deadline: "2024-03-24", status: "pending" }
    ]
  }
];

export const announcements = [
  {
    id: 1,
    title: "Mid-term Schedule",
    date: "2024-03-15",
    content: "Mid-term examinations will begin from 1st Ramadan",
    isRead: false
  },
  {
    id: 2,
    title: "Workshop Registration",
    date: "2024-03-14",
    content: "Register for the upcoming MERN Stack Workshop by Dr. Zafar Iqbal",
    isRead: false
  }
];