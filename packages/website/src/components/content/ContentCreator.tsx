import { isCourse, isVideo } from '@/content'
import {
  Checkbox,
  Divider,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea
} from '@chakra-ui/react'
import { BaseContent, Content, Course, Video } from '@shared/firestore'
import React, { Dispatch, SetStateAction } from 'react'
import { ContentBody } from './ContentBody'

type StringHandler<T extends BaseContent> = (
  key: keyof T
) => (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => void

type BooleanHandler<T extends BaseContent> = (
  key: keyof T
) => (e: React.ChangeEvent<HTMLInputElement>) => void

function useHandlers<T extends BaseContent = Content>(
  props: ContextCreatorProps<T>
) {
  const { setContent } = props
  const stringHandler: StringHandler<T> = key => e =>
    setContent(c => ({ ...c, [key]: e.target.value }))

  const booleanHandler: BooleanHandler<T> =
    key => (e: React.ChangeEvent<HTMLInputElement>) =>
      setContent(c => ({ ...c, [key]: e.target.checked }))

  return { stringHandler, booleanHandler }
}

type ContextCreatorProps<T extends BaseContent = Content> = {
  content: T
  setContent: Dispatch<SetStateAction<T>>
}

const BaseContentCreator: React.FC<ContextCreatorProps<Content>> = props => {
  const { stringHandler, booleanHandler } = useHandlers<Content>(props)
  const { content, setContent } = props
  return (
    <>
      <Select value={content['type']} onChange={stringHandler('type')}>
        <option value="course">Course</option>
        <option value="video">Video</option>
        <option value="blog">Blog</option>
      </Select>
      <Input placeholder="Title" onChange={stringHandler('title')} />
      <Input placeholder="Slug" onChange={stringHandler('slug')} />
      <Textarea
        placeholder="Description"
        onChange={stringHandler('description')}
      />
      <Input
        placeholder="Thumbnail Url"
        onChange={stringHandler('thumbnail')}
      />
      <Input
        placeholder="Tags"
        onChange={e =>
          setContent(c => ({
            ...c,
            tags: e.target.value
              .split(',')
              .map(t => t.trim().toLocaleLowerCase())
          }))
        }
      />
      <Checkbox onChange={booleanHandler('premium')}>Premium Content</Checkbox>
      <Checkbox onChange={booleanHandler('draft')}>Draft</Checkbox>
    </>
  )
}

const VideoContentCreator: React.FC<ContextCreatorProps<Video>> = props => {
  const { stringHandler } = useHandlers<Video>(props)
  const { setContent } = props

  return (
    <>
      <HStack>
        <Input placeholder="YouTube ID" onChange={stringHandler('youtubeId')} />
        <Input placeholder="Vimeo  ID" onChange={stringHandler('vimeoId')} />
        <NumberInput
          min={0}
          w={250}
          placeholder="Seconds"
          onChange={(_, v) => setContent(c => ({ ...c, seconds: v }))}
        >
          <NumberInputField />
        </NumberInput>
      </HStack>
    </>
  )
}

const CourseContentCreator: React.FC<ContextCreatorProps<Course>> = props => {
  const { stringHandler } = useHandlers<Course>(props)

  return (
    <>
      <HStack>
        <Input placeholder="Vimeo  ID" onChange={stringHandler('vimeoId')} />
      </HStack>
    </>
  )
}

export const ContentCreator: React.FC<ContextCreatorProps<Content>> = props => {
  const { content, setContent } = props
  return (
    <>
      <BaseContentCreator {...props} />
      <Divider />
      {isVideo(content) && <VideoContentCreator {...(props as any)} />}
      {isCourse(content) && <CourseContentCreator {...(props as any)} />}
      <Divider />
      <ContentBody
        value={content.body}
        onChange={v => setContent(c => ({ ...c, body: v }))}
      />
      <Divider />
    </>
  )
}
