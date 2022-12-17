import { QuestionList } from '../../papers/QuestionList/QuestionList'
import { QmaDialoguePaper } from '../QmaDialoguePaper/QmaDialoguePaper'

import { Tab, Tabs } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Fragment, useState } from 'react'
import * as React from 'react'

export type MenuTabsProps = {
  questions: Question[]
  messageHistory: MessageHistory
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

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  index,
  value,
}) => {
  return (
    <Fragment>{value === index && <Fragment>{children}</Fragment>}</Fragment>
  )
}

export const MenuTabs: React.FC<MenuTabsProps> = ({
  questions,
  messageHistory,
}) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Fragment>
      <Tabs value={value} onChange={handleChange}>
        <Tab label='質問' {...tabProps(0)} />
        <Tab label='みんなの状況' {...tabProps(1)} />
        <Tab label='くま記録' {...tabProps(2)} />

        {/* <Tab label='資料' {...tabProps(3)} /> */}
      </Tabs>

      <TabPanel index={0} value={value}>
        <QuestionList questions={questions} />
      </TabPanel>

      <TabPanel index={1} value={value}>
        <Typography>みんなの状況</Typography>
      </TabPanel>

      <TabPanel index={2} value={value}>
        <QmaDialoguePaper
          // TODO: クマページで入力したメッセージを redux で管理する
          dialogues={['おはよう', 'こんにちは', 'こんばんは']}
          messageHistory={messageHistory}
        />
      </TabPanel>
    </Fragment>
  )
}
