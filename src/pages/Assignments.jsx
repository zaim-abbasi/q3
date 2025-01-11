import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Heading, Select, Icon, Flex, Button, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';
import useDashboardStore from '../store/dashboardStore';

const Assignments = () => {
  const location = useLocation();
  const toast = useToast();
  const { 
    courses,
    selectedCourse,
    lastVisitedCourse,
    setSelectedCourse,
    updateAssignmentStatus
  } = useDashboardStore();
  
  const [currentCourse, setCurrentCourse] = useState(
    location.state?.courseId || lastVisitedCourse || 'all'
  );
  
  useEffect(() => {
    setSelectedCourse(currentCourse);
  }, [currentCourse, setSelectedCourse]);

  const allAssignments = courses.flatMap(course => 
    course.assignments.map(assignment => ({
      ...assignment,
      courseName: course.name,
      courseId: course.id
    }))
  );

  const filteredAssignments = currentCourse === 'all'
    ? allAssignments
    : allAssignments.filter(assignment => assignment.courseId === currentCourse);

  const handleStatusToggle = (courseId, assignmentId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    updateAssignmentStatus(courseId, assignmentId, newStatus);
    
    toast({
      title: `Assignment marked as ${newStatus}`,
      description: `Your progress has been updated automatically.`,
      status: newStatus === 'completed' ? 'success' : 'info',
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    });
  };

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
          value={currentCourse}
          onChange={(e) => setCurrentCourse(e.target.value)}
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
              <Th py="4" fontSize="md">Action</Th>
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
                <Td py="4">
                  <Button
                    size="sm"
                    colorScheme={assignment.status === 'completed' ? 'yellow' : 'green'}
                    onClick={() => handleStatusToggle(
                      assignment.courseId,
                      assignment.id,
                      assignment.status
                    )}
                  >
                    {assignment.status === 'completed' ? 'Mark Pending' : 'Mark Complete'}
                  </Button>
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