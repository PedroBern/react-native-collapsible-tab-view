import React from 'react'
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import { TabBarProps } from 'react-native-collapsible-tab-view'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

type TabItemProps = {
  name: string
  onPress: () => void
}

const windowWidth = Dimensions.get('window').width

export const TABBAR_HEIGHT = 48

const TabItem: React.FC<TabItemProps> = ({ name, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        },
        styles.item,
      ]}
      onPress={onPress}
    >
      <Text>{name.toUpperCase()}</Text>
    </Pressable>
  )
}

const TabBar: React.FC<TabBarProps<any>> = ({
  focusedTab,
  refMap,
  scrollX,
  index,
  containerRef,
}) => {
  const [nTabs] = React.useState(Object.keys(refMap).length)
  const [indicatorWidth] = React.useState(windowWidth / nTabs)

  const scrollTo = React.useCallback(
    (i: number) => {
      containerRef.current?.scrollToIndex({ animated: true, index: i })
    },
    [containerRef]
  )

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: scrollX.value / nTabs,
        },
      ],
    }
  }, [scrollX])

  return (
    <View style={styles.root}>
      {Object.keys(refMap).map((name, i) => {
        return <TabItem key={name} name={name} onPress={() => scrollTo(i)} />
      })}
      <Animated.View
        style={[stylez, styles.indicator, { width: indicatorWidth }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
      width: 0,
    },
    zIndex: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: TABBAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  indicator: {
    height: 2,
    backgroundColor: '#2196f3',
    width: 100,
    position: 'absolute',
    bottom: 0,
  },
})

export default TabBar
