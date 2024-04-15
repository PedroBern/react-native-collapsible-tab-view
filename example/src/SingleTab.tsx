import React from 'react'
import { StyleSheet } from 'react-native'
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view'

import { ArticleContent } from './Shared/Article'
import { HEADER_HEIGHT, buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Single Tab'

const Header = buildHeader(title)

const SingleTabExample: ExampleComponentType = () => {
  return (
    <Tabs.Container
      renderHeader={Header}
      headerHeight={HEADER_HEIGHT}
      renderTabBar={(props) => (
        <MaterialTabBar
          {...props}
          scrollEnabled
          contentContainerStyle={styles.padding}
        />
      )}
    >
      <Tabs.Tab name="article" label="Article">
        <Tabs.ScrollView>
          <ArticleContent />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  )
}

SingleTabExample.title = title

export default SingleTabExample

const styles = StyleSheet.create({
  padding: { paddingHorizontal: 30 },
})
