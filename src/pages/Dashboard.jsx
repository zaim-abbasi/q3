import { Box, Grid, Heading, Text, Progress, Badge, Icon, Flex, VStack } from '@chakra-ui/react';
import { useDashboard } from '../context/DashboardContext';
import { FaGraduationCap, FaBell, FaTasks, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const { student, courses, notifications } = useDashboard();
  
  const pendingAssignments = courses.flatMap(course => 
    course.assignments.filter(assignment => assignment.status === 'pending')
  );

  const overallProgress = Math.round(
    courses.reduce((acc, course) => acc + course.progress, 0) / courses.length
  );

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
        <Icon as={FaGraduationCap} />
        Welcome back, {student.name}!
      </Heading>
      
      <Grid templateColumns="repeat(2, 1fr)" gap="8">
        <Box 
          p="8" 
          bg="white" 
          borderRadius="2xl" 
          boxShadow="xl"
          border="1px"
          borderColor="gray.100"
        >
          <Flex align="center" mb="6">
            <Icon as={FaGraduationCap} fontSize="24px" color="blue.500" />
            <Heading size="md" ml="3">Active Courses</Heading>
          </Flex>
          <VStack spacing="6" align="stretch">
            {courses.map(course => (
              <Box key={course.id}>
                <Text fontWeight="semibold" mb="2">{course.name}</Text>
                <Progress 
                  value={course.progress} 
                  colorScheme="blue" 
                  size="sm" 
                  mb="2"
                  borderRadius="full"
                />
                <Text color="gray.500" fontSize="sm">Progress: {course.progress}%</Text>
              </Box>
            ))}
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
          <Flex align="center" mb="6">
            <Icon as={FaTasks} fontSize="24px" color="orange.500" />
            <Heading size="md" ml="3">Pending Assignments</Heading>
          </Flex>
          <VStack spacing="4" align="stretch">
            {pendingAssignments.map(assignment => (
              <Box 
                key={assignment.id} 
                p="4" 
                bg="orange.50" 
                borderRadius="lg"
              >
                <Text fontWeight="semibold" mb="1">{assignment.title}</Text>
                <Text color="gray.600" fontSize="sm" mb="2">Deadline: {assignment.deadline}</Text>
                <Badge colorScheme="orange" borderRadius="full" px="3">
                  Pending
                </Badge>
              </Box>
            ))}
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
          <Flex align="center" mb="6">
            <Icon as={FaBell} fontSize="24px" color="purple.500" />
            <Heading size="md" ml="3">Recent Announcements</Heading>
          </Flex>
          <VStack spacing="4" align="stretch">
            {notifications.map(notification => (
              <Box 
                key={notification.id} 
                p="4" 
                bg="purple.50" 
                borderRadius="lg"
              >
                <Text fontWeight="semibold" mb="1">{notification.title}</Text>
                <Text color="gray.600" fontSize="sm" mb="2">{notification.date}</Text>
                <Text color="gray.700">{notification.content}</Text>
              </Box>
            ))}
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
          <Flex align="center" mb="6">
            <Icon as={FaChartLine} fontSize="24px" color="green.500" />
            <Heading size="md" ml="3">Overall Progress</Heading>
          </Flex>
          <Box textAlign="center" p="6">
            <Box 
              position="relative" 
              width="200px" 
              height="200px" 
              margin="0 auto"
            >
              <Progress
                value={overallProgress}
                size="lg"
                thickness="8px"
                colorScheme="green"
                borderRadius="full"
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                width="100%"
                height="100%"
              />
              <Text 
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                fontSize="3xl"
                fontWeight="bold"
                color="green.500"
              >
                {overallProgress}%
              </Text>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;