import {
  Box,
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'

import { VContentCard } from './ContentCard'
import { ContentCarousel } from './ContentCarousel'
import { Content } from '@shared/firestore'

const StyledTab: React.FC = ({ children }) => (
  <Tab
    fontSize="lg"
    color="gray.500"
    fontWeight="bold"
    _selected={{ color: useColorModeValue('black', 'white') }}
    rounded="md"
  >
    {children}
  </Tab>
)

const Banner: React.FC<FlexProps> = ({ children, ...rest }) => (
  <Flex m={6} alignItems="center" {...rest}>
    {children}
  </Flex>
)

const BannerButton: React.FC<ButtonProps & { href: string }> = ({
  href,
  ...props
}) => (
  <NextLink href={href}>
    <Button
      flexShrink={0}
      size="sm"
      variant="outline"
      colorScheme="green"
      ml={2}
      {...props}
    />
  </NextLink>
)

const BannerHeader: React.FC<HeadingProps> = props => (
  <Heading as="h4" flexGrow={1} fontSize="2xl" {...props}></Heading>
)

export interface ContentTabsProps {
  latest: Content[]
  javascript: Content[]
  react: Content[]
  vue: Content[]
}

export const ContentTabs: React.FC<ContentTabsProps> = ({
  latest,
  javascript,
  react,
  vue
}) => {
  return (
    <Tabs variant="unstyled">
      <TabList>
        <StyledTab>Newest</StyledTab>
        <StyledTab>JavaScript</StyledTab>
        <StyledTab>Vue</StyledTab>
        <StyledTab>React</StyledTab>
      </TabList>

      <Box borderWidth="1px" borderRadius="lg">
        <TabPanels>
          <TabPanel p={0}>
            <Banner>
              <BannerHeader>
                Learn the last technologies to expand your career.
              </BannerHeader>
              <BannerButton href="/videos">Explore Newest</BannerButton>
            </Banner>

            <ContentCarousel pb={7} paddingX={5}>
              {latest.map(s => (
                <VContentCard
                  key={s.title}
                  flexShrink={0}
                  marginX={2}
                  content={s}
                />
              ))}
            </ContentCarousel>
          </TabPanel>

          <TabPanel p={0}>
            <Banner>
              <BannerHeader>
                Grow your software development skills with JavaScript.
              </BannerHeader>
              <BannerButton href="/tag/javascript">
                Explore JavaScript
              </BannerButton>
            </Banner>
            <ContentCarousel pb={7} paddingX={5}>
              {javascript.map(s => (
                <VContentCard
                  key={s.title}
                  flexShrink={0}
                  marginX={2}
                  content={s}
                />
              ))}
            </ContentCarousel>
          </TabPanel>
          <TabPanel p={0}>
            <Banner>
              <BannerHeader>
                Build websites and applications with Vue.
              </BannerHeader>
              <BannerButton href="/tag/vue">Explore Vue</BannerButton>
            </Banner>
            <ContentCarousel pb={7} paddingX={5}>
              {vue.map(s => (
                <VContentCard
                  key={s.title}
                  flexShrink={0}
                  marginX={2}
                  content={s}
                />
              ))}
            </ContentCarousel>
          </TabPanel>
          <TabPanel p={0}>
            <Banner>
              <BannerHeader>
                Build scalable applications with React.
              </BannerHeader>
              <BannerButton href="/tag/react">Explore React</BannerButton>
            </Banner>
            <ContentCarousel pb={7} paddingX={5}>
              {react.map(s => (
                <VContentCard
                  key={s.title}
                  flexShrink={0}
                  marginX={2}
                  content={s}
                />
              ))}
            </ContentCarousel>
          </TabPanel>
        </TabPanels>
      </Box>
    </Tabs>
  )
}
