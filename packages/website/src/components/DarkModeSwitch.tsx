import {useColorMode, IconButton, IconButtonProps} from '@chakra-ui/react';
import React from 'react';
import {FaMoon, FaSun} from 'react-icons/fa';

export const DarkModeSwitch: React.FC<
  Omit<IconButtonProps, 'aria-label'>
> = (props) => {
  const {colorMode, toggleColorMode} = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      icon={isDark ? <FaMoon /> : <FaSun />}
      {...props}
      aria-label="dark-mode"
    />
  );
};
