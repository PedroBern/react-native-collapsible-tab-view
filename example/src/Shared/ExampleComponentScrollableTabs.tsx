import React from 'react'
import {
  createCollapsibleTabs,
  CollapsibleProps,
  MaterialTabBar,
} from 'react-native-collapsible-tab-view'

import { ArticleContent } from './Article'
import { HEADER_HEIGHT } from './Header'

const TabNames = [
  'screenA',
  'screenB',
  'screenC',
  'screenD',
  'screenE',
  'screenF',
  'screenG',
  'screenH',
  'screenI',
] as const

type TabNamesType = typeof TabNames[number]

const { useTabsContext, ...Tabs } = createCollapsibleTabs(TabNames)

type Props = Partial<CollapsibleProps<TabNamesType>>

const Example: React.FC<Props> = (props) => {
  return (
    <Tabs.Container
      headerHeight={HEADER_HEIGHT}
      lazy
      TabBarComponent={(props) => <MaterialTabBar {...props} scrollEnabled />}
      {...props}
    >
      {TabNames.map((name) => {
        return (
          <Tabs.ScrollView key={name}>
            <ArticleContent />
          </Tabs.ScrollView>
        )
      })}
    </Tabs.Container>
  )
}

export default Example
