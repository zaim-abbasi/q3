import { Box, Grid, Heading, Progress, Text, Button, VStack, Icon, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaBook, FaArrowRight } from 'react-icons/fa';
import { useDashboard } from '../context/DashboardContext';

const Courses = () => {
  const { courses } = useDashboard();

  return (
    <Box>
      <Heading 
        mb="8" 
        fontSize="3xl" 
        color="blue.800"
        display="flex" 
        alignItems="center"
        gap="3"
      >
        <Icon as={FaBook} />
        My Courses
      </Heading>
      
      <Grid templateColumns="repeat(2, 1fr)" gap="8">
        {courses.map(course => (
          <Box 
            key={course.id} 
            p="8" 
            bg="white" 
            borderRadius="2xl" 
            boxShadow="xl"
            border="1px"
            borderColor="gray.100"
            transition="transform 0.2s"
            _hover={{ transform: 'translateY(-4px)' }}
          >
            <VStack align="stretch" spacing="6">
              <Heading size="md" color="blue.700">{course.name}</Heading>
              <Text color="gray.600" fontSize="lg">
                Instructor: {course.instructor}
              </Text>
              
              <Box>
                <Flex justify="space-between" mb="2">
                  <Text fontWeight="medium">Progress</Text>
                  <Text color="blue.600" fontWeight="semibold">{course.progress}%</Text>
                </Flex>
                <Progress 
                  value={course.progress} 
                  colorScheme="blue" 
                  size="sm"
                  borderRadius="full"
                />
              </Box>

              <Box bg="blue.50" p="4" borderRadius="xl">
                <Text fontWeight="semibold" mb="3" color="blue.700">
                  Upcoming Deadlines
                </Text>
                <VStack align="stretch" spacing="2">
                  {course.assignments
                    .filter(assignment => assignment.status === 'pending')
                    .map(assignment => (
                      <Text key={assignment.id} color="gray.600" fontSize="sm">
                        {assignment.title} - {assignment.deadline}
                      </Text>
                    ))
                  }
                </VStack>
              </Box>

              <Button
                as={RouterLink}
                to="/assignments"
                state={{ courseId: course.id }}
                colorScheme="blue"
                size="lg"
                rightIcon={<FaArrowRight />}
                borderRadius="xl"
              >
                View Assignments
              </Button>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Courses;