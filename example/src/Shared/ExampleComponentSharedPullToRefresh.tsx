import Constants from 'expo-constants'
import React from 'react'
import { ScrollView, RefreshControl, useWindowDimensions } from 'react-native'
import {
  Tabs,
  CollapsibleProps,
  CollapsibleRef,
} from 'react-native-collapsible-tab-view'

import Contacts from './Contacts'
import { HEADER_HEIGHT } from './Header'
import { useRefresh } from './useRefresh'

type Props = Partial<CollapsibleProps>

const Example = React.forwardRef<CollapsibleRef, Props>((props, ref) => {
  const windowHeight = useWindowDimensions().height
  const [isRefreshing, startRefreshing] = useRefresh()

  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={{
        height: windowHeight - 56 - Constants.statusBarHeight, // 56 is the navigation header height
      }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={startRefreshing} />
      }
    >
      <Tabs.Container ref={ref} headerHeight={HEADER_HEIGHT} {...props}>
        <Tabs.Tab name="contact0" label="Tab 0">
          <Contacts nestedScrollEnabled />
        </Tabs.Tab>
        <Tabs.Tab name="contact1" label="Tab 1">
          <Contacts nestedScrollEnabled />
        </Tabs.Tab>
        <Tabs.Tab name="contact2" label="Tab 2">
          <Contacts nestedScrollEnabled />
        </Tabs.Tab>
      </Tabs.Container>
    </ScrollView>
  )
})

export default Example
