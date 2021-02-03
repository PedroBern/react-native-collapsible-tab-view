import React from 'react'
import { View, StyleSheet, ListRenderItem } from 'react-native'
import { createCollapsibleTabs } from 'react-native-collapsible-tab-view'

const TabNames = ['A', 'B'] as const

const { useTabsContext, ...Tabs } = createCollapsibleTabs(TabNames)

const HEADER_HEIGHT = 250

const Example: React.FC = () => {
  return (
    <Tabs.Container
      HeaderComponent={Header}
      headerHeight={HEADER_HEIGHT} // optional
    >
      <ScreenA />
      <ScreenB />
    </Tabs.Container>
  )
}

const ScreenB = () => {
  return (
    <Tabs.ScrollView>
      <View style={[styles.box, styles.boxA]} />
      <View style={[styles.box, styles.boxB]} />
    </Tabs.ScrollView>
  )
}

const renderItem: ListRenderItem<number> = ({ index }) => {
  return (
    <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
  )
}

const ScreenA = () => {
  return (
    <Tabs.FlatList
      data={[0, 1, 2, 3, 4]}
      renderItem={renderItem}
      keyExtractor={(v) => v + ''}
    />
  )
}

const Header = () => {
  return <View style={styles.header} />
}

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
})

export default Example
