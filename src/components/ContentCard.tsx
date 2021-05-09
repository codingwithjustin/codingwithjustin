import {
  AspectRatio,
  Box,
  BoxProps,
  Flex,
  Heading,
  Image,
  Tag,
  TagProps,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { TextMuted } from './TextMuted'
import { Content } from '../content'

export type ContentCardProps = BoxProps & Content

const tagColors: Record<string, string> = {
  vue: 'green',
  quasar: 'cyan',
  react: 'blue',
  javascript: 'yellow',

  course: 'red',
  video: 'purple',
  blog: 'cyan'
}

const CardTag: React.FC<TagProps> = props => {
  const getColor = () => {
    const { children } = props
    return typeof children === 'string'
      ? tagColors?.[children.toLocaleLowerCase()]
      : undefined
  }
  return <Tag m={1} colorScheme={getColor()} {...props}></Tag>
}

const MembershipTag: React.FC<TagProps> = props => (
  <CardTag colorScheme="green" {...props}>
    $
  </CardTag>
)

export const HContentCard: React.FC<ContentCardProps> = props => {
  const { id, type, thumbnail, title, description, tags, membership } = props
  return (
    <NextLink href={`/${type}/${id}`}>
      <Flex
        m={2}
        rounded="md"
        _hover={{ bgColor: 'gray.700' }}
        cursor="pointer"
        p={2}
      >
        <Box position="relative">
          <AspectRatio w={275} ratio={16 / 9} flexShrink={0}>
            <Image src={thumbnail} rounded="md" />
          </AspectRatio>
          <Tag
            position="absolute"
            bottom={1}
            right={1}
            fontSize="xs"
            colorScheme="blackAlpha"
            variant="solid"
          >
            2:30
          </Tag>
        </Box>
        <Box marginLeft={4} flexGrow={1} h="full">
          <Heading fontSize="xl">{title}</Heading>
          <Text>{description}</Text>

          {membership && <MembershipTag />}
          <CardTag>{type}</CardTag>
          {tags?.map((t, i) => (
            <CardTag key={i} m={1}>
              {t}
            </CardTag>
          ))}
          <TextMuted fontSize="sm">3 days ago • All levels</TextMuted>
        </Box>
      </Flex>
    </NextLink>
  )
}

export const VContentCard: React.FC<ContentCardProps> = props => {
  const {
    type,
    thumbnail,
    title,
    description,
    tags,
    membership,
    ...rest
  } = props
  return (
    <Box
      rounded="md"
      bgColor={useColorModeValue('white', 'gray.700')}
      boxShadow="md"
      {...rest}
    >
      <Image
        src={thumbnail}
        w="full"
        roundedTopLeft="md"
        roundedTopRight="md"
      />
      <Box p={5}>
        <Text fontSize="lg" mb={1} fontWeight="bold" noOfLines={2}>
          {title}
        </Text>
        <Text noOfLines={2} mb={2}>
          {description}
        </Text>
        <Box>
          {membership && <MembershipTag />}

          {tags?.map((t, i) => (
            <CardTag key={i} m={1}>
              {t}
            </CardTag>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
