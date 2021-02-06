import * as React from 'react'
import { Image, Dimensions, StyleSheet, View } from 'react-native'
import * as Tabs from 'react-native-collapsible-tab-view'

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

export const AlbumsContent = () => {
  return <View style={styles.content}>{albumsContent()}</View>
}

export default class Albums extends React.Component {
  render() {
    return (
      <Tabs.ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <AlbumsContent />
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
