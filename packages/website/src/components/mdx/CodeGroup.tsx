import React, { createContext, useContext, useState } from 'react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'

export const CodeGroupContext = createContext<{
  index: number
  setIndex: (i: number) => void
}>({ index: 0, setIndex: () => {} })

export const CodeGroupProvider: React.FC = ({ children }) => {
  const [index, setIndex] = useState(0)
  return (
    <CodeGroupContext.Provider value={{ index, setIndex }}>
      {children}
    </CodeGroupContext.Provider>
  )
}

export const CodePanel: React.FC = props => <TabPanel {...props} m={0} p={0} />

export const CodeGroup: React.FC<{ tabs: string[] }> = ({ tabs, children }) => {
  const { index, setIndex } = useContext(CodeGroupContext)
  const currentIndex = Math.min(index, tabs.length - 1)
  return (
    <Tabs
      rounded="md"
      bgColor="gray.900"
      index={currentIndex}
      onChange={setIndex}
    >
      <TabList mb={0}>
        {tabs.map(t => (
          <Tab key={t} px={4} fontWeight="semibold">
            {t}
          </Tab>
        ))}
      </TabList>
      <TabPanels>{children}</TabPanels>
    </Tabs>
  )
}
