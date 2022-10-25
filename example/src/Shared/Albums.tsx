import * as React from 'react'
import {
  Image,
  Dimensions,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'

import { useRefresh } from './useRefresh'

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

interface AlbumsProps {
  numberOfAlbums?: number
}

export const AlbumsContent: React.FC<AlbumsProps> = ({
  numberOfAlbums = 8,
}) => {
  return <View style={styles.content}>{albumsContent(numberOfAlbums)}</View>
}

export const Albums: React.FC<AlbumsProps> = ({ numberOfAlbums }) => {
  const [isRefreshing, startRefreshing] = useRefresh()

  return (
    <Tabs.ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={startRefreshing} />
      }
    >
      <AlbumsContent numberOfAlbums={numberOfAlbums} />
    </Tabs.ScrollView>
  )
}

export default Albums

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
