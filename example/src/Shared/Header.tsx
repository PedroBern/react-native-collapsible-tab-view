import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TabBarProps } from 'react-native-collapsible-tab-view'

type Props = {
  title: string
  description?: string
  height?: number
}

export const HEADER_HEIGHT = 250

export const Header = ({
  title,
  description,
  height = HEADER_HEIGHT,
}: TabBarProps & Props) => {
  return (
    <View style={[styles.root, { height }]}>
      <Text style={styles.title}>
        {title}
        {'\n'}<Text style={styles.description}>{description}</Text>
      </Text>
    </View>
  )
}

function buildHeader<T extends TabBarProps<any>>(
  title: string,
  description?: string
) {
  const NewHeader = (props: T) => {
    return <Header title={title} description={description} {...props} />
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
  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default Header
