import React, { useMemo } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native'

import { TabBarProps } from '../../src/types'
import ExampleComponent from './Shared/ExampleComponent'
import { ExampleComponentType } from './types'

const title = 'Scroll On Header with Touchables'

const SLIDER_ITEM_SIZE = 200
const HEADER_HEIGHT = SLIDER_ITEM_SIZE * 2

const data = Array.from({ length: 15 }).map((_, i) => i.toString())

const styles = StyleSheet.create({
  item: {
    width: SLIDER_ITEM_SIZE,
    height: SLIDER_ITEM_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemButton: {
    padding: 16,
    backgroundColor: 'white',
  },
  itemName: {
    fontSize: 48,
    color: 'black',
  },
  itemSeparator: { width: 4 },
})

const Slider = ({ isReversed = false }) => {
  const config = useMemo(
    () => ({
      data: isReversed ? [...data].reverse() : data,
      backgroundColor: isReversed ? 'purple' : 'orangered',
    }),
    [isReversed]
  )

  return (
    <FlatList
      data={config.data}
      horizontal
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      bounces={false}
      renderItem={({ item }) => (
        <View
          style={[styles.item, { backgroundColor: config.backgroundColor }]}
        >
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => Alert.alert(`Touchable number ${item} pressed`)}
          >
            <Text style={styles.itemName}>{item}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  )
}

const NewHeader: React.FC<TabBarProps> = () => {
  return (
    <View>
      <Slider />
      <Slider isReversed />
    </View>
  )
}

const DefaultExample: ExampleComponentType = () => {
  return (
    <ExampleComponent renderHeader={NewHeader} headerHeight={HEADER_HEIGHT} />
  )
}

DefaultExample.title = title

export default DefaultExample
