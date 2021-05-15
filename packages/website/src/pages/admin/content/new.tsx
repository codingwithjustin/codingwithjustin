import { HContentCard, VContentCard } from '@/components/content/ContentCard'
import { ContentCreator } from '@/components/content/ContentCreator'
import { LayoutContainer } from '@/components/Layout'

import { Box, Button, chakra, Heading, VStack } from '@chakra-ui/react'
import { addDoc, collection, getFirestore } from '@firebase/firestore'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const AdminIndex: NextPage = () => {
  const [content, setContent] = useState<any>({
    type: 'video',
    title: '',
    slug: '',
    description: '',
    body: '',
    tags: [],
    publishedAt: Date.now()
  })

  const router = useRouter()
  const onSave: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    await addDoc(collection(getFirestore(), 'content'), content)
    router.push('/')
  }

  return (
    <LayoutContainer>
      <Heading>New Content</Heading>
      <Box bgColor="gray.700" my={4} p={8} borderRadius="md" as="section">
        <chakra.form onSubmit={onSave}>
          <VStack spacing={3} alignItems="left">
            <ContentCreator content={content} setContent={setContent} />
            <Button type="submit" colorScheme="blue">
              Save
            </Button>
          </VStack>
        </chakra.form>
        <Box my={4} whiteSpace="pre-wrap">
          {JSON.stringify(content, null, 4)}
        </Box>
      </Box>

      <Box as="section">
        <Heading>Renders</Heading>
        <Box m={3}>
          <VContentCard content={content} />
        </Box>
        <Box m={3}>
          <HContentCard content={content} />
        </Box>
      </Box>
    </LayoutContainer>
  )
}

export default AdminIndex
