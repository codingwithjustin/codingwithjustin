import React from 'react';
import {Box, Container, ContainerProps} from '@chakra-ui/react';
import {Footer} from './Footer';
import {NavBar} from './NavBar';

export const LayoutNavbarFooter: React.FC = ({children}) => {
  return (
    <Box position="relative" minH="100vh" paddingBottom={24}>
      <NavBar />
      {children}
      <Box bottom={0} h={24} left={0} w="full" position="absolute">
        <Footer />
      </Box>
    </Box>
  );
};

export const LayoutContainer: React.FC<ContainerProps> = ({
  children,
  ...rest
}) => {
  return (
    <LayoutNavbarFooter>
      <Container {...rest} maxW="7xl" mt={12} mb={16}>
        {children}
      </Container>
    </LayoutNavbarFooter>
  );
};
