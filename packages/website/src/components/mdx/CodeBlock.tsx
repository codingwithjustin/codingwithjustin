import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import vsDark from 'prism-react-renderer/themes/vsDark'
import { Box, chakra, Text } from '@chakra-ui/react'

export const CodeBlock: React.FC<{
  className: string
  children: string
  name?: string
}> = ({ children, className, name }) => {
  const language = className.replace(/language-/, '') as Language
  const trimNewlines = children.replace(/^\s+|\s+$/g, '')
  return (
    <Box rounded="md" bgColor="var(--chakra-colors-gray-900) !important" p={5}>
      <Text>{name}</Text>
      <Highlight
        {...defaultProps}
        theme={vsDark}
        code={trimNewlines}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <chakra.pre
            className={className}
            style={{ ...style }}
            rounded="md"
            bgColor="var(--chakra-colors-gray-900) !important"
          >
            {tokens.map((line, i) => (
              <chakra.div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <chakra.span key={key} {...getTokenProps({ token, key })} />
                ))}
              </chakra.div>
            ))}
          </chakra.pre>
        )}
      </Highlight>
    </Box>
  )
}
