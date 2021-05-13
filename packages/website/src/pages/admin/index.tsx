import { LayoutContainer } from '@/components/Layout'
import { useAdminRedirect } from '@/firebase'
import { Button, Heading } from '@chakra-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import React from 'react'

const AdminIndex: NextPage = () => {
  useAdminRedirect()

  return (
    <LayoutContainer>
      <Heading>Admin Panel</Heading>
      <NextLink href="/admin/content/new" passHref>
        <Button>New Content</Button>
      </NextLink>
    </LayoutContainer>
  )
}

export default AdminIndex
