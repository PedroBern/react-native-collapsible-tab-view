import React from 'react'
import {
  Tabs,
  MaterialTabBar,
  CollapsibleProps,
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

type Props = Partial<CollapsibleProps>

const Example: React.FC<Props> = (props) => {
  return (
    <Tabs.Container
      headerHeight={HEADER_HEIGHT}
      lazy
      renderTabBar={(props) => <MaterialTabBar {...props} scrollEnabled />}
      {...props}
    >
      {TabNames.map((name) => {
        return (
          <Tabs.Tab name={name} key={name}>
            <Tabs.ScrollView>
              <ArticleContent />
            </Tabs.ScrollView>
          </Tabs.Tab>
        )
      })}
    </Tabs.Container>
  )
}

export default Example
