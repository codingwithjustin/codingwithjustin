import { Box, Button, ButtonGroup, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'

export const ContentBody: React.FC<{
  value: string
  onChange: (v: string) => void
}> = ({ value, onChange }) => {
  const [mode, setMode] = useState<'mdx' | 'render'>('mdx')
  return (
    <Box position="relative">
      <ButtonGroup size="sm" variant="ghost" mb={2} mx={2}>
        <Button onClick={() => setMode('mdx')} isActive={mode === 'mdx'}>
          MDX
        </Button>
        <Button onClick={() => setMode('render')} isActive={mode === 'render'}>
          Render
        </Button>
      </ButtonGroup>
      <Textarea h={600} v={value} onChange={e => onChange(e.target.value)} />
    </Box>
  )
}
