import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <Flex h="100vh" bg="gray.50">
      <Sidebar />
      <Box 
        flex="1" 
        p="8" 
        overflowY="auto"
        maxW="1400px"
        mx="auto"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;