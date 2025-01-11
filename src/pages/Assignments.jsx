import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Heading, Select, Icon, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';
import { useDashboard } from '../context/DashboardContext';

const Assignments = () => {
  const location = useLocation();
  const { courses } = useDashboard();
  const [selectedCourse, setSelectedCourse] = useState(location.state?.courseId || 'all');
  
  const allAssignments = courses.flatMap(course => 
    course.assignments.map(assignment => ({
      ...assignment,
      courseName: course.name,
      courseId: course.id
    }))
  );

  const filteredAssignments = selectedCourse === 'all'
    ? allAssignments
    : allAssignments.filter(assignment => assignment.courseId === selectedCourse);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb="8">
        <Heading 
          fontSize="3xl" 
          color="blue.800"
          display="flex" 
          alignItems="center"
          gap="3"
        >
          <Icon as={FaTasks} />
          Assignments
        </Heading>
        <Select
          width="250px"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          bg="white"
          borderRadius="xl"
          size="lg"
          borderColor="gray.200"
          _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
        >
          <option value="all">All Courses</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </Select>
      </Flex>
      
      <Box 
        bg="white" 
        borderRadius="2xl" 
        boxShadow="xl"
        border="1px"
        borderColor="gray.100"
        overflow="hidden"
      >
        <Table variant="simple">
          <Thead>
            <Tr bg="gray.50">
              <Th py="4" fontSize="md">Course</Th>
              <Th py="4" fontSize="md">Assignment</Th>
              <Th py="4" fontSize="md">Deadline</Th>
              <Th py="4" fontSize="md">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAssignments.map(assignment => (
              <Tr key={assignment.id} _hover={{ bg: 'gray.50' }}>
                <Td py="4">{assignment.courseName}</Td>
                <Td py="4" fontWeight="medium">{assignment.title}</Td>
                <Td py="4">{assignment.deadline}</Td>
                <Td py="4">
                  <Badge
                    colorScheme={assignment.status === 'completed' ? 'green' : 'yellow'}
                    borderRadius="full"
                    px="3"
                    py="1"
                  >
                    {assignment.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Assignments;