import { Box, VStack, Link, Text, Icon } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaTasks, FaChartLine, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: FaHome, text: 'Dashboard', path: '/' },
    { icon: FaBook, text: 'Courses', path: '/courses' },
    { icon: FaTasks, text: 'Assignments', path: '/assignments' },
    { icon: FaChartLine, text: 'Progress', path: '/progress' },
    { icon: FaUser, text: 'Profile', path: '/profile' }
  ];

  return (
    <Box 
      w="280px" 
      bg="white" 
      boxShadow="lg" 
      p="6"
      position="relative"
    >
      <VStack spacing="5" align="stretch">
        {menuItems.map((item) => (
          <Link
            as={RouterLink}
            to={item.path}
            key={item.path}
            p="4"
            borderRadius="xl"
            bg={location.pathname === item.path ? 'blue.50' : 'transparent'}
            color={location.pathname === item.path ? 'blue.600' : 'gray.600'}
            _hover={{
              bg: 'blue.50',
              color: 'blue.600',
              transform: 'translateX(8px)'
            }}
            display="flex"
            alignItems="center"
            transition="all 0.3s"
          >
            <Icon as={item.icon} fontSize="20px" />
            <Text ml="4" fontWeight="medium">{item.text}</Text>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;