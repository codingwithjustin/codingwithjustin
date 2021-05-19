import {
  AspectRatio,
  Box,
  BoxProps,
  Flex,
  Heading,
  Image,
  LinkBox,
  Tag,
  TagProps,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { TextMuted } from '../TextMuted'
import { contentThumbnail, formatPublishedAt, url } from '../../content'
import { Content } from '@shared/firestore'
import { ContentFakeThumbnail } from './ContentThumbnail'
import { formatSeconds } from '@/utils'

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
      <Tag m={0.5} colorScheme={getColor()} {...props} cursor="pointer"></Tag>
    </NextLink>
  )
}

const MembershipTag: React.FC<TagProps> = props => (
  <ContentTag colorScheme="green" {...props}>
    $
  </ContentTag>
)

export const HContentCard: React.FC<ContentCardProps> = props => {
  const { content, ...boxProps } = props
  const { type, title, description, tags, premium } = content

  const thumbnail = contentThumbnail(content)

  return (
    <NextLink href={url(content)}>
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
              {thumbnail ? (
                <Image src={thumbnail} alt={title} rounded="md" />
              ) : (
                <ContentFakeThumbnail rounded="md" content={content} />
              )}
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
          <Heading fontSize="xl" noOfLines={2} mb={1}>
            {title}
          </Heading>
          <Text noOfLines={2} mb={2}>
            {description}
          </Text>

          {premium && <MembershipTag />}
          <ContentTag>{type}</ContentTag>
          {tags?.map((t, i) => (
            <ContentTag key={i}>{t}</ContentTag>
          ))}
          <TextMuted fontSize="sm" mt={2}>
            Justin Brooks • {formatPublishedAt(content)}
          </TextMuted>
        </Box>
      </Flex>
    </NextLink>
  )
}

export const VContentCard: React.FC<ContentCardProps> = props => {
  const { content, ...boxProps } = props
  const { title, description, tags, premium } = content
  const thumbnail = contentThumbnail(content)
  return (
    <NextLink href={url(content)} passHref>
      <LinkBox
        rounded="md"
        bgColor={useColorModeValue('white', 'gray.700')}
        boxShadow="md"
        w={300}
        cursor="pointer"
        {...boxProps}
      >
        <AspectRatio ratio={16 / 9}>
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              roundedTopLeft="md"
              roundedTopRight="md"
            />
          ) : (
            <ContentFakeThumbnail
              roundedTopLeft="md"
              roundedTopRight="md"
              content={content}
            />
          )}
        </AspectRatio>
        <Box p={5}>
          <Text fontSize="lg" mb={1} fontWeight="bold" noOfLines={2}>
            {title}
          </Text>
          <Text noOfLines={2} mb={2}>
            {description}
          </Text>
          <Box>
            {premium && <MembershipTag />}
            {tags?.map((t, i) => (
              <ContentTag key={i}>{t}</ContentTag>
            ))}
          </Box>
        </Box>
      </LinkBox>
    </NextLink>
  )
}
