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
import { TextMuted } from '../TextMuted'
import { Content } from '@shared/firestore'

export interface ContentCardProps extends BoxProps {
  content: Content
}

export const tagColors: Record<string, string> = {
  vue: 'green',
  vuex: 'green',
  quasar: 'cyan',
  react: 'blue',
  javascript: 'yellow',

  course: 'red',
  video: 'purple',
  blog: 'cyan'
}

export const ContentTag: React.FC<TagProps & { href?: string }> = props => {
  const getColor = () => {
    const { children } = props
    return typeof children === 'string'
      ? tagColors?.[children.toLocaleLowerCase()]
      : undefined
  }
  return (
    <NextLink href={props.href ?? `/tag/${props.children}`}>
      <Tag m={1} colorScheme={getColor()} {...props} cursor="pointer"></Tag>
    </NextLink>
  )
}

const MembershipTag: React.FC<TagProps> = props => (
  <ContentTag colorScheme="green" {...props}>
    $
  </ContentTag>
)

const formatSeconds = (secNum: number) => {
  const hours = Math.floor(secNum / 3600)
  const minutes = Math.floor(secNum / 60) % 60
  const seconds = secNum % 60

  return [hours, minutes, seconds]
    .map(v => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':')
}

export const HContentCard: React.FC<ContentCardProps> = props => {
  const { content, ...boxProps } = props
  const { type, title, description, tags, membershipOnly, slug, publishedAt } =
    content

  const publishedAtDate = new Date(publishedAt * 1000)

  const thumbnail =
    'youtubeId' in content
      ? `https://i.ytimg.com/vi/${content.youtubeId}/hqdefault.jpg`
      : content.thumbnail
  return (
    <NextLink href={`/content/${slug}`}>
      <Flex
        m={2}
        rounded="md"
        _hover={{ bgColor: useColorModeValue('gray.200', 'whiteAlpha.100') }}
        cursor="pointer"
        p={2}
        {...boxProps}
      >
        <Box>
          <Box position="relative">
            <AspectRatio w={275} ratio={16 / 9} flexShrink={0}>
              <Image src={thumbnail} rounded="md" />
            </AspectRatio>
            {'seconds' in content && (
              <Tag
                position="absolute"
                bottom={1}
                right={1}
                minH={0}
                p={1}
                fontSize="xs"
                colorScheme="blackAlpha"
                variant="solid"
              >
                {formatSeconds(content.seconds)}
              </Tag>
            )}
          </Box>
        </Box>
        <Box marginLeft={4} flexGrow={1} h="full">
          <Heading fontSize="xl" noOfLines={2}>
            {title}
          </Heading>
          <Text noOfLines={3}>{description}</Text>

          {membershipOnly && <MembershipTag />}
          <ContentTag ml={0}>{type}</ContentTag>
          {tags?.map((t, i) => (
            <ContentTag key={i} m={1}>
              {t}
            </ContentTag>
          ))}
          <TextMuted fontSize="sm">
            Justin Brooks •{' '}
            {publishedAtDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </TextMuted>
        </Box>
      </Flex>
    </NextLink>
  )
}

export const VContentCard: React.FC<ContentCardProps> = props => {
  const { content, ...boxProps } = props
  const { title, description, tags, membershipOnly } = content
  const thumbnail =
    'youtubeId' in content
      ? `https://i.ytimg.com/vi/${content.youtubeId}/maxresdefault.jpg`
      : content.thumbnail
  return (
    <Box
      rounded="md"
      bgColor={useColorModeValue('white', 'gray.700')}
      boxShadow="md"
      w={300}
      {...boxProps}
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
          {membershipOnly && <MembershipTag />}

          {tags?.map((t, i) => (
            <ContentTag key={i} m={1}>
              {t}
            </ContentTag>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
