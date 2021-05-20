import React from 'react'
import { Button, Center, Heading, Text } from '@chakra-ui/react'
import { CodeBlock } from './CodeBlock'
import { MDXProviderComponentsProp } from '@mdx-js/react'
import { CodeGroup, CodePanel } from './CodeGroup'

const h1: React.FC = props => (
  <Heading as="h2" fontSize="4xl" mt={8} {...props} />
)
const h2: React.FC = props => (
  <Heading as="h3" fontSize="3xl" mt={8} {...props} />
)
const h3: React.FC = props => (
  <Heading as="h4" fontSize="2xl" mt={7} {...props} />
)
const h4: React.FC = props => (
  <Heading as="h5" fontSize="xl" mt={7} {...props} />
)
const h5: React.FC = props => (
  <Text fontSize="xl" fontStyle="italic" mt={6} {...props} />
)
const p: React.FC = props => (
  <Text fontSize={{ base: 'lg', md: 'xl' }} my={6} {...props} />
)

export const components: MDXProviderComponentsProp = {
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  Button,
  Text,
  Heading,
  Center,
  pre: props => <div {...props} />,
  code: CodeBlock,
  CodeGroup,
  CodePanel
}
