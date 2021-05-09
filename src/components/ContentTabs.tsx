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
import * as Content from '../content'

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

const BannerButton: React.FC<ButtonProps> = props => (
  <Button
    flexShrink={0}
    size="sm"
    variant="outline"
    colorScheme="green"
    ml={2}
    {...props}
  />
)

const BannerHeader: React.FC<HeadingProps> = props => (
  <Heading as="h4" flexGrow={1} fontSize="2xl" {...props}></Heading>
)

export const ContentTabs: React.FC = () => {
  return (
    <Tabs variant="unstyled">
      <TabList>
        <StyledTab>Latest</StyledTab>
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
              <BannerButton>Explore Latest</BannerButton>
            </Banner>

            <ContentCarousel pb={7} paddingX={5}>
              {Content.contents.slice(0, 10).map(s => (
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
              <BannerButton>Explore JavaScript</BannerButton>
            </Banner>
            <ContentCarousel pb={7} paddingX={5}>
              {Content.hasTag('javascript')
                .map(s => (
                  <VContentCard
                    key={s.title}
                    w={300}
                    flexShrink={0}
                    marginX={2}
                    {...s}
                  />
                ))
                .slice(0, 10)}
            </ContentCarousel>
          </TabPanel>
          <TabPanel p={0}>
            <Banner>
              <BannerHeader>
                Build websites and applications with Vue.
              </BannerHeader>
              <BannerButton>Explore Vue</BannerButton>
            </Banner>
            <ContentCarousel pb={7} paddingX={5}>
              {Content.hasTag('vue')
                .map(s => (
                  <VContentCard
                    key={s.title}
                    w={300}
                    flexShrink={0}
                    marginX={2}
                    {...s}
                  />
                ))
                .slice(0, 10)}
            </ContentCarousel>
          </TabPanel>
          <TabPanel p={0}>
            <Banner>
              <BannerHeader>
                Build scalable applications with React.
              </BannerHeader>
              <BannerButton>Explore React</BannerButton>
            </Banner>
            <ContentCarousel pb={7} paddingX={5}>
              {Content.hasTag('react')
                .map(s => (
                  <VContentCard
                    key={s.title}
                    w={300}
                    flexShrink={0}
                    marginX={2}
                    {...s}
                  />
                ))
                .slice(0, 10)}
            </ContentCarousel>
          </TabPanel>
        </TabPanels>
      </Box>
    </Tabs>
  )
}
