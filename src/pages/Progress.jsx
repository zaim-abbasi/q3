import { Box, CircularProgress, Grid, Heading, Text } from '@chakra-ui/react';
import { useDashboard } from '../context/DashboardContext';

const Progress = () => {
  const { courses } = useDashboard();
  
  const overallProgress = Math.round(
    courses.reduce((acc, course) => acc + course.progress, 0) / courses.length
  );

  return (
    <Box>
      <Heading mb="6">Progress Tracker</Heading>
      
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <Box p="6" bg="white" borderRadius="lg" shadow="md" textAlign="center">
          <Heading size="md" mb="4">Overall Progress</Heading>
          <CircularProgress value={overallProgress} size="120px" color="blue.400">
            <Box as="div" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
              <Text fontSize="xl" fontWeight="bold">{overallProgress}%</Text>
            </Box>
          </CircularProgress>
        </Box>

        {courses.map(course => (
          <Box key={course.id} p="6" bg="white" borderRadius="lg" shadow="md" textAlign="center">
            <Heading size="md" mb="4">{course.name}</Heading>
            <CircularProgress value={course.progress} size="120px" color="green.400">
              <Box as="div" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                <Text fontSize="xl" fontWeight="bold">{course.progress}%</Text>
              </Box>
            </CircularProgress>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Progress;