import { Box, VStack, Heading, Text, Grid } from '@chakra-ui/react';
import { useDashboard } from '../context/DashboardContext';

const Profile = () => {
  const { student } = useDashboard();

  const details = [
    { label: 'Name', value: student.name },
    { label: 'Email', value: student.email },
    { label: 'Program', value: student.program },
    { label: 'Semester', value: student.semester },
    { label: 'Enrollment Year', value: student.enrollmentYear }
  ];

  return (
    <Box>
      <Heading mb="6">Student Profile</Heading>
      
      <Box p="6" bg="white" borderRadius="lg" shadow="md">
        <VStack spacing="4" align="stretch">
          <Grid templateColumns="1fr 2fr" gap={4}>
            {details.map(detail => (
              <Box key={detail.label}>
                <Text fontWeight="bold" color="gray.600">{detail.label}</Text>
                <Text fontSize="lg">{detail.value}</Text>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Box>
    </Box>
  );
};

export default Profile;