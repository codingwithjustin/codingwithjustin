import { LayoutContainer } from '@/components/Layout'
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
      <LayoutContainer></LayoutContainer>
    </>
  )
}

export default Courses
