import { useColorMode, Switch, SwitchProps } from '@chakra-ui/react'
import React from 'react'

export const DarkModeSwitch: React.FC<SwitchProps> = props => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Switch
      {...props}
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  )
}
