import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import ExampleComponent from './Shared/ExampleComponent'
import { ExampleComponentType } from './types'
import { TabBarProps } from '../../src/types'

const title = 'Conditional Tabs'

const HEADER_HEIGHT = 200

const NewHeader: React.FC<
  TabBarProps & {
    setHideArticleTab: React.Dispatch<React.SetStateAction<boolean>>
  }
> = (props) => {
  return (
    <View pointerEvents="box-none" style={styles.headerView}>
      <TouchableOpacity
        onPress={() => props.setHideArticleTab((prev) => !prev)}
      >
        <Text>Toggle articles tab</Text>
      </TouchableOpacity>
    </View>
  )
}

const DefaultExample: ExampleComponentType = () => {
  const [hideArticleTab, setHideArticleTab] = useState(false)
  return (
    <ExampleComponent
      renderHeader={(props) => (
        <NewHeader setHideArticleTab={setHideArticleTab} {...props} />
      )}
      headerHeight={HEADER_HEIGHT}
      hideArticleTab={hideArticleTab}
    />
  )
}

DefaultExample.title = title

export default DefaultExample

const styles = StyleSheet.create({
  headerView: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
