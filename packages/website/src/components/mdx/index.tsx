import React from 'react'
import {
  Button,
  Center,
  chakra,
  Code,
  Heading,
  HeadingProps,
  Text
} from '@chakra-ui/react'
import { CodeBlock } from './CodeBlock'
import { MDXProviderComponentsProp } from '@mdx-js/react'
import { CodeGroup, CodePanel } from './CodeGroup'
import { anchorize } from '@/utils'

const AnchorHeading: React.FC<HeadingProps & { children: string }> = props => {
  return <Heading id={anchorize(props.children)} {...props} />
}

const p: React.FC = props => (
  <Text fontSize={{ base: 'lg', md: 'xl' }} my={4} {...props} />
)

export const components: MDXProviderComponentsProp = {
  h1: props => <AnchorHeading as="h2" fontSize="4xl" mt={8} {...props} />,
  h2: props => <AnchorHeading as="h3" fontSize="3xl" mt={8} {...props} />,
  h3: props => <Heading as="h4" fontSize="2xl" mt={7} {...props} />,
  h4: props => <Heading as="h5" fontSize="xl" mt={6} {...props} />,
  h5: props => <Text fontSize="xl" fontStyle="italic" mt={6} {...props} />,
  ul: props => <chakra.ul {...props} />,
  li: props => <chakra.li ml={10} my={1} {...props} />,
  inlineCode: props => <Code fontSize="lg" {...props} />,
  pre: props => <div {...props} />,
  code: CodeBlock,
  p,

  Button,
  Text,
  Heading,
  Center,
  CodeGroup,
  CodePanel
}
