import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {
  createCollapsibleTabs,
  MaterialTabBar,
  TabBarProps,
} from 'react-native-collapsible-tab-view'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { IndexChangeEventData } from '../../src/types'
import { ArticleContent } from './Shared/Article'
import { HEADER_HEIGHT } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Adding and removing tabs dynamically'

const { useTabsContext, ...Tabs } = createCollapsibleTabs<string>()

const DynamicTabs: ExampleComponentType = () => {
  const [lastTabIndex, setLastTabIndex] = React.useState(0)
  const [tabs, setTabs] = React.useState(['Default Tab'])

  const [currentTab, setCurrentTab] = React.useState<
    IndexChangeEventData<string>
  >()

  const addTab = React.useCallback(() => {
    const newIndex = lastTabIndex + 1
    setTabs((t) => [...t, `New Tab #${newIndex}`])
    setLastTabIndex(newIndex)
  }, [lastTabIndex])

  const removeTab = React.useCallback(() => {
    if (!currentTab) return
    setTabs((t) => {
      t.splice(currentTab?.index, 1)
      return [...t]
    })
  }, [currentTab])

  const HeaderComponent = (props: TabBarProps<string>) => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={addTab}>
          <Text style={styles.buttonText}>Add new Tab</Text>
        </TouchableOpacity>
        {tabs.length > 1 && (
          <TouchableOpacity onPress={removeTab}>
            <Text style={styles.buttonText}>Remove this tab</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <Tabs.Container
      headerHeight={HEADER_HEIGHT}
      HeaderComponent={HeaderComponent}
      lazy
      onIndexChange={setCurrentTab}
      TabBarComponent={(props) => <MaterialTabBar {...props} scrollEnabled />}
    >
      {tabs.map((name) => {
        return (
          <Tabs.Tab name={name} key={name}>
            <Tabs.ScrollView>
              <Text style={styles.listInner}>{name}</Text>
              <ArticleContent />
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
    height: 200,
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
