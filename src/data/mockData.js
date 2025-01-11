export const studentData = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  program: "Computer Science",
  semester: 3,
  enrollmentYear: 2022
};

export const coursesData = [
  {
    id: "CS101",
    name: "Introduction to Programming",
    instructor: "Dr. Smith",
    progress: 75,
    assignments: [
      { id: 1, title: "Variables and Data Types", deadline: "2024-03-20", status: "completed" },
      { id: 2, title: "Control Structures", deadline: "2024-03-25", status: "pending" }
    ]
  },
  {
    id: "CS102",
    name: "Data Structures",
    instructor: "Dr. Johnson",
    progress: 60,
    assignments: [
      { id: 3, title: "Arrays and Lists", deadline: "2024-03-22", status: "completed" },
      { id: 4, title: "Trees and Graphs", deadline: "2024-03-28", status: "pending" }
    ]
  }
];

export const announcements = [
  {
    id: 1,
    title: "Mid-term Schedule",
    date: "2024-03-15",
    content: "Mid-term examinations will begin from April 1st"
  },
  {
    id: 2,
    title: "Workshop Registration",
    date: "2024-03-14",
    content: "Register for the upcoming React Workshop"
  }
];