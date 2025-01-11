import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Heading, 
  Text, 
  Progress, 
  VStack, 
  Grid, 
  Button,
  Icon,
  Flex
} from '@chakra-ui/react';
import { FaArrowLeft, FaBook } from 'react-icons/fa';
import useDashboardStore from '../store/dashboardStore';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getCourseById, getAssignmentsByCourse, getCourseProgress } = useDashboardStore();

  const course = getCourseById(courseId);
  const assignments = getAssignmentsByCourse(courseId);
  const progress = getCourseProgress(courseId);

  if (!course) {
    return navigate('/courses');
  }

  return (
    <Box>
      <Flex align="center" mb="8" gap="4">
        <Button
          leftIcon={<FaArrowLeft />}
          onClick={() => navigate('/courses')}
          variant="ghost"
        >
          Back to Courses
        </Button>
        <Heading 
          fontSize="3xl" 
          color="blue.800"
          display="flex" 
          alignItems="center"
          gap="3"
        >
          <Icon as={FaBook} />
          {course.name}
        </Heading>
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap="8">
        <Box 
          p="8" 
          bg="white" 
          borderRadius="2xl" 
          boxShadow="xl"
          border="1px"
          borderColor="gray.100"
        >
          <VStack align="stretch" spacing="6">
            <Box>
              <Text fontWeight="semibold" mb="2">Course Progress</Text>
              <Progress 
                value={progress} 
                colorScheme="blue" 
                size="lg"
                borderRadius="full"
              />
              <Text mt="2" color="blue.600" fontWeight="bold">
                {progress}% Complete
              </Text>
            </Box>

            <Box>
              <Text fontWeight="semibold" mb="4">Course Details</Text>
              <VStack align="stretch" spacing="3">
                <Flex justify="space-between">
                  <Text color="gray.600">Instructor</Text>
                  <Text fontWeight="medium">{course.instructor}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="gray.600">Total Assignments</Text>
                  <Text fontWeight="medium">{assignments.length}</Text>
                </Flex>
              </VStack>
            </Box>
          </VStack>
        </Box>

        <Box 
          p="8" 
          bg="white" 
          borderRadius="2xl" 
          boxShadow="xl"
          border="1px"
          borderColor="gray.100"
        >
          <Text fontWeight="semibold" mb="6">Course Assignments</Text>
          <VStack align="stretch" spacing="4">
            {assignments.map(assignment => (
              <Box 
                key={assignment.id}
                p="4"
                bg="gray.50"
                borderRadius="lg"
              >
                <Text fontWeight="medium" mb="2">{assignment.title}</Text>
                <Flex justify="space-between" color="gray.600">
                  <Text>Deadline: {assignment.deadline}</Text>
                  <Text 
                    color={assignment.status === 'completed' ? 'green.500' : 'orange.500'}
                    fontWeight="medium"
                  >
                    {assignment.status}
                  </Text>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default CourseDetails;