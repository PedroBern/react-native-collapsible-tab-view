import React from 'react'
import {
  View,
  StyleSheet,
  ListRenderItem,
  ScrollView,
  FlatList,
} from 'react-native'
import * as Tabs from 'react-native-collapsible-tab-view'

const HEADER_HEIGHT = 250

const Header = () => {
  return <View style={styles.header} />
}

const Example: React.FC = () => {
  const ref = React.useRef<ScrollView>(null)
  const ref2 = React.useRef<FlatList>(null)

  React.useEffect(() => {
    setTimeout(() => {
      //console.log(ref.current?.scrollToEnd)
      ref.current?.scrollToEnd()
      ref2.current?.scrollToEnd()
    }, 1000)
  }, [ref])

  const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    )
  }, [])

  return (
    <Tabs.Container
      HeaderComponent={Header}
      headerHeight={HEADER_HEIGHT} // optional
    >
      <Tabs.Tab name="A">
        <Tabs.FlatList
          ref={ref2}
          data={[0, 1, 2, 3, 4]}
          renderItem={renderItem}
          keyExtractor={(v) => v + ''}
        />
      </Tabs.Tab>
      <Tabs.Tab name="B">
        <Tabs.ScrollView ref={ref}>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  )
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
