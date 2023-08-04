import * as React from 'react'
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import * as Tabs from 'react-native-collapsible-tab-view'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'

import { useRefresh } from './useRefresh'

type Item = { id: string; aspectRatio: number; color: string }

export function getItems(count = 20) {
  return Array.from({ length: count }, (v, k) => {
    const r = Math.random() + 0.5
    const t = Date.now()
    return {
      id: `${t}-${k}-${r}`,
      aspectRatio: r,
      color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`,
    }
  })
}

export async function asyncGetItems(count = 20, delay = 1000) {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, delay)
  })

  return getItems(count)
}

interface MasonryItemProps {
  item: Item
  index: number
}

const MasonryItem: React.FC<MasonryItemProps> = ({ item, index }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: item.color,
        aspectRatio: item.aspectRatio,
        ...styles.item,
      }}
      onPress={() => Alert.alert(item.id)}
    >
      <Text>
        {index} - {item.aspectRatio}
      </Text>
    </TouchableOpacity>
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const ListEmptyComponent = () => {
  const { top, height } = Tabs.useHeaderMeasurements()
  const translateY = useDerivedValue(() => {
    return interpolate(
      -top.value,
      [0, height.value || 0],
      [-(height.value || 0) / 2, 0]
    )
  }, [height])

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    }
  })

  return (
    <Animated.View style={[styles.listEmpty, stylez]}>
      <Text>Centered Empty List!</Text>
    </Animated.View>
  )
}

const ExampleMasonry: React.FC<{
  emptyList?: boolean
  nestedScrollEnabled?: boolean
  limit?: number
}> = ({ emptyList, nestedScrollEnabled, limit }) => {
  const [isRefreshing, startRefreshing] = useRefresh()
  const [loading, setLoading] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)
  const [data, setData] = React.useState<Item[]>([])

  const loadmore = React.useCallback(async () => {
    if (loading) {
      return
    }
    setLoading(true)
    const res = await asyncGetItems()
    setLoading(false)
    setData([...data, ...res])
  }, [loading, data])

  const refresh = React.useCallback(async () => {
    if (refreshing) {
      return
    }
    setRefreshing(true)
    const res = await asyncGetItems()
    setData(res)
    setRefreshing(false)
  }, [refreshing])

  React.useEffect(() => {
    refresh()
  }, [])

  return (
    <Tabs.MasonryFlashList
      data={emptyList ? [] : limit ? data.slice(0, limit) : data}
      numColumns={2}
      estimatedItemSize={60}
      keyExtractor={(_, i) => String(i)}
      renderItem={MasonryItem}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={ListEmptyComponent}
      // see https://github.com/software-mansion/react-native-reanimated/issues/1703
      onRefresh={Platform.OS === 'ios' ? startRefreshing : undefined}
      refreshing={Platform.OS === 'ios' ? isRefreshing : undefined}
      nestedScrollEnabled={nestedScrollEnabled}
      onEndReached={loadmore}
    />
  )
}

export default ExampleMasonry

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
  },
  listEmpty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
})
