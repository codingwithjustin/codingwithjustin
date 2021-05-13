import { LayoutContainer } from '@/components/Layout'
import { useAdminRedirect } from '@/firebase'
import {
  Button,
  chakra,
  Checkbox,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
  VStack
} from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'

const AdminIndex: NextPage = () => {
  useAdminRedirect()

  return (
    <LayoutContainer>
      <Heading>New Content</Heading>
      <chakra.form>
        <VStack spacing={3}>
          <Select placeholder="Type">
            <option value="course">Course</option>
            <option value="video">Video</option>
            <option value="blog">Blog</option>
          </Select>
          <Input placeholder="Title"></Input>
          <Input placeholder="Thumbnail Url"></Input>

          <Input placeholder="Tags"></Input>
          <Textarea placeholder="Description"></Textarea>
          <RadioGroup>
            <Stack direction="row">
              <Radio value="1">Beginner</Radio>
              <Radio value="2">Intermediate</Radio>
              <Radio value="3">Advanced</Radio>
            </Stack>
          </RadioGroup>
          <Checkbox>Membership required</Checkbox>
          <Checkbox>Draft</Checkbox>
          <Button type="submit">Save</Button>
        </VStack>
      </chakra.form>
    </LayoutContainer>
  )
}

export default AdminIndex
