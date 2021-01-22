import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { HeaderProps } from './Tabs'

type Props = {
  title: string
  height?: number
}

export const HEADER_HEIGHT = 250

const Header: React.FC<Props> = ({ title, height = HEADER_HEIGHT }) => {
  return (
    <View style={[styles.root, { height }]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export const buildHeader = (title: string) => {
  const NewHeader: React.FC<HeaderProps> = () => {
    return <Header title={title} />
  }

  return NewHeader
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
})

export default Header
