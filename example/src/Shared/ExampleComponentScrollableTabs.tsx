import React from 'react'
import {
  createCollapsibleTabs,
  CollapsibleProps,
  MaterialTabBar,
  useContainerRef,
  useRefMap,
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

const { useTabsContext, ...Tabs } = createCollapsibleTabs<TabNamesType>()

type Props = Partial<CollapsibleProps<TabNamesType>>

const Example: React.FC<Props> = (props) => {
  const containerRef = useContainerRef()
  const refMap = useRefMap(TabNames)

  return (
    <Tabs.Container
      containerRef={containerRef}
      headerHeight={HEADER_HEIGHT}
      refMap={refMap}
      lazy
      TabBarComponent={(props) => <MaterialTabBar {...props} scrollEnabled />}
      {...props}
    >
      {Object.keys(refMap).map((name) => {
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
