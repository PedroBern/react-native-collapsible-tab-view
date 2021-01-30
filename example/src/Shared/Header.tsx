import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TabBarProps } from 'react-native-collapsible-tab-view'

import { TabNames } from './Tabs'

type Props = {
  title: string
  height?: number
}

export const HEADER_HEIGHT = 250

export const Header = ({
  title,
  height = HEADER_HEIGHT,
}: TabBarProps<TabNames> & Props) => {
  return (
    <View style={[styles.root, { height }]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

function buildHeader<T extends TabBarProps<any>>(title: string) {
  const NewHeader = (props: T) => {
    return <Header title={title} {...props} />
  }

  return NewHeader
}

export { buildHeader }

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
})

export default Header
