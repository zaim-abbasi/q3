import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bg="gray.50"
    >
      <Box 
        p="8" 
        bg="white" 
        borderRadius="2xl" 
        boxShadow="xl" 
        textAlign="center"
        maxW="500px"
      >
        <Heading mb="4" color="red.500">Oops!</Heading>
        <Text mb="6" color="gray.600">
          {error.message || 'Something went wrong'}
        </Text>
        <Button 
          colorScheme="blue" 
          onClick={() => navigate('/')}
        >
          Return to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorBoundary;