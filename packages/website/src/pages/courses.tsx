import { Card } from '@/components/Card'
import { LayoutContainer } from '@/components/Layout'
import { TextMuted } from '@/components/TextMuted'
import { Button, Center, Heading, Input, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

const Courses: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Search"
        description="Search for topics that interest you."
      />
      <LayoutContainer>
        <Heading as="h1" fontSize="4xl" mb={2}>
          Courses
        </Heading>
        <TextMuted>Learn concepts from beginning to end.</TextMuted>
        <Card as="section" marginY={10} p={5}>
          No courses available yet. We&lsquo;re working on it!
        </Card>

        <Card my={15} p={10}>
          <Center>
            <VStack maxW={450} textAlign="center" spacing={5}>
              <Heading>Get updates for new courses!</Heading>
              <Input placeholder="Enter your email to join." />
              <Button isFullWidth colorScheme="blue">
                Join Now
              </Button>
            </VStack>
          </Center>
        </Card>
      </LayoutContainer>
    </>
  )
}

export default Courses
