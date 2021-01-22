import * as React from 'react'
import { Image, Dimensions, StyleSheet, View } from 'react-native'

import Tabs from './Tabs'

const COVERS = [
  require('../../assets/album-art-1.jpg'),
  require('../../assets/album-art-2.jpg'),
  require('../../assets/album-art-3.jpg'),
  require('../../assets/album-art-4.jpg'),
  require('../../assets/album-art-5.jpg'),
  require('../../assets/album-art-6.jpg'),
  require('../../assets/album-art-7.jpg'),
  require('../../assets/album-art-8.jpg'),
]

const albumsContent = (n = 8) =>
  [...COVERS.filter((_e, i) => i < n)].map((source, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <Image key={i} source={source} style={styles.cover} />
  ))

export default class Albums extends React.Component {
  render() {
    return (
      <Tabs.ScrollView
        name="albums"
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.content}>{albumsContent()}</View>
      </Tabs.ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343C46',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cover: {
    width: '50%',
    height: Dimensions.get('window').width / 2,
  },
})
