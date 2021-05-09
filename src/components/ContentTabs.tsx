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
import { ContentFilter } from '../content'

import { VContentCard } from './ContentCard'
import { ContentCarousel } from './ContentCarousel'

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

const Banner: React.FC<FlexProps & { button?: React.ReactElement }> = ({
  children,
  button,
  ...rest
}) => (
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

export const ContentTabs: React.FC = () => {
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
              {ContentFilter.content()
                .first(10)
                .map(s => (
                  <VContentCard
                    key={s.title}
                    w={300}
                    flexShrink={0}
                    marginX={2}
                    {...s}
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
              {ContentFilter.content()
                .hasTag('javascript')
                .first(10)
                .map(s => (
                  <VContentCard
                    key={s.title}
                    w={300}
                    flexShrink={0}
                    marginX={2}
                    {...s}
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
              {ContentFilter.content()
                .hasTag('vue')
                .first(10)
                .map(s => (
                  <VContentCard
                    key={s.title}
                    w={300}
                    flexShrink={0}
                    marginX={2}
                    {...s}
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
              {ContentFilter.content()
                .hasTag('react')
                .first(10)
                .map(s => (
                  <VContentCard
                    key={s.title}
                    w={300}
                    flexShrink={0}
                    marginX={2}
                    {...s}
                  />
                ))}
            </ContentCarousel>
          </TabPanel>
        </TabPanels>
      </Box>
    </Tabs>
  )
}
