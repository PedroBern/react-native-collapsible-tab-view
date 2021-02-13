import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as Tabs from 'react-native-collapsible-tab-view'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { IndexChangeEventData, TabName } from '../../src/types'
import { AlbumsContent } from './Shared/Albums'
import { ArticleContent } from './Shared/Article'
import { ExampleComponentType } from './types'

const HEADER_HEIGHT = 200
const title = 'Adding and removing tabs dynamically'

function shuffleArray<T>(array: T[]) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const ComponentTypes = [<ArticleContent />, <AlbumsContent />]

const DynamicTabs: ExampleComponentType = () => {
  const [lastTabIndex, setLastTabIndex] = React.useState(1)
  const [tabs, setTabs] = React.useState([
    { name: 'Default Tab', component: ComponentTypes[0] },
  ])

  const [currentTab, setCurrentTab] = React.useState<
    IndexChangeEventData<TabName>
  >()

  const addTab = React.useCallback(() => {
    const newIndex = lastTabIndex + 1
    setTabs((t) => [
      ...t,
      {
        name: `New Tab #${newIndex}`,
        component: ComponentTypes[lastTabIndex % ComponentTypes.length],
      },
    ])
    setLastTabIndex(newIndex)
  }, [lastTabIndex])

  const removeTab = React.useCallback(() => {
    if (!currentTab) return
    setTabs((t) => {
      t.splice(currentTab?.index, 1)
      return [...t]
    })
  }, [currentTab])

  const shuffleTabs = React.useCallback(() => {
    setTabs((t) => {
      return [...shuffleArray(t)]
    })
  }, [])

  const HeaderComponent = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={addTab}>
          <Text style={styles.buttonText}>Add new Tab</Text>
        </TouchableOpacity>
        {tabs.length > 1 && (
          <>
            <TouchableOpacity onPress={shuffleTabs}>
              <Text style={styles.buttonText}>Shuffle tabs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeTab}>
              <Text style={styles.buttonText}>Remove this tab</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    )
  }

  const TabBarComponent = React.useCallback(
    (props) => <Tabs.MaterialTabBar {...props} scrollEnabled />,
    []
  )

  return (
    <Tabs.Container
      headerHeight={HEADER_HEIGHT}
      HeaderComponent={HeaderComponent}
      lazy
      onTabChange={setCurrentTab}
      TabBarComponent={TabBarComponent}
    >
      {tabs.map((tab) => {
        return (
          <Tabs.Tab name={tab.name} key={tab.name}>
            <Tabs.ScrollView>
              <Text style={styles.listInner}>{tab.name}</Text>
              {tab.component}
            </Tabs.ScrollView>
          </Tabs.Tab>
        )
      })}
    </Tabs.Container>
  )
}

DynamicTabs.title = title

export default DynamicTabs

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
  },

  buttonText: {
    padding: 20,
    color: 'white',
    fontSize: 20,
  },
  listInner: {
    padding: 10,
    backgroundColor: '#2196f3',
    color: 'white',
    fontSize: 20,
    alignItems: 'center',
  },
})
