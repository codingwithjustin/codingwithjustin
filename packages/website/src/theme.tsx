import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const fonts = { mono: "'Menlo', monospace" }

const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  colors: { hint: 'gray.500', black: '#16161D', discord: '#5865F2' },
  styles: {
    global: props => ({
      body: {
        bg: mode('gray.50', 'gray.800')(props)
      }
    })
  },
  fonts
})

export default theme
