import { Box, Tab, Tabs } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import * as React from 'react'
import { QuestionList } from '../QuestionList/QuestionList'

export type MenuTabsProps = {
  //
}

function tabProps(index: number) {
  return {
    'aria-controls': `simple-tabpanel-${index}`,
    id: `simple-tab-${index}`,
  }
}

type TabPanelProps = {
  children: React.ReactNode
  index: number
  value: number
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
  return <Box>{value === index && <Box>{children}</Box>}</Box>
}

export const MenuTabs: React.FC<MenuTabsProps> = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='質問' {...tabProps(0)} />
          <Tab label='みんなの状況' {...tabProps(1)} />
          <Tab label='資料' {...tabProps(2)} />
          <Tab label='くま記録' {...tabProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <QuestionList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>みんなの状況</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>資料</Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography>くま記録</Typography>
      </TabPanel>
    </Box>
  )
}
