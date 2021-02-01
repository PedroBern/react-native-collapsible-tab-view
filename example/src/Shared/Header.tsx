import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

type Props = {
  title: string
  height?: number
}

export const HEADER_HEIGHT = 250

export const Header = ({ title, height = HEADER_HEIGHT }: Props) => {
  return (
    <View style={[styles.root, { height }]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

function buildHeader(title: string) {
  const NewHeader = (): React.ReactElement => {
    return <Header title={title} />
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
