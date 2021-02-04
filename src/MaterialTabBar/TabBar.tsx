import React from 'react'
import {
  StyleSheet,
  useWindowDimensions,
  LayoutChangeEvent,
} from 'react-native'
import Animated, {
  cancelAnimation,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import Indicator from './Indicator'
import TabItem from './TabItem'
import { MaterialTabBarProps, ItemLayout } from './types'

export const TABBAR_HEIGHT = 48

const TabBar: React.FC<MaterialTabBarProps<any>> = ({
  refMap,
  indexDecimal,
  scrollEnabled = false,
  indicatorStyle,
  index,
  TabItemComponent = TabItem,
  getLabelText = (name) => name.toUpperCase(),
  onTabPress,
  style,
  tabProps,
}) => {
  const tabBarRef = useAnimatedRef<Animated.ScrollView>()
  const windowWidth = useWindowDimensions().width
  const isFirstRender = React.useRef(true)
  const tabKeys = React.useMemo(() => Object.keys(refMap), [refMap])
  const [nTabs] = React.useState(tabKeys.length)
  const itemsLayoutGathering = React.useRef<ItemLayout[]>([])
  const tabsOffset = useSharedValue(0)
  const isScrolling = useSharedValue(false)

  const [itemsLayout, setItemsLayout] = React.useState<ItemLayout[]>(
    scrollEnabled
      ? []
      : tabKeys.map((_, i) => {
          const tabWidth = windowWidth / nTabs
          return { width: tabWidth, x: i * tabWidth }
        })
  )

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else if (!scrollEnabled) {
      // update items width on window resizing
      const tabWidth = windowWidth / nTabs
      setItemsLayout(
        tabKeys.map((_, i) => {
          return { width: tabWidth, x: i * tabWidth }
        })
      )
    }
  }, [scrollEnabled, nTabs, tabKeys, windowWidth])

  const onTabItemLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      if (scrollEnabled && itemsLayout.length < nTabs) {
        const { width, x } = event.nativeEvent.layout
        itemsLayoutGathering.current.push({
          width,
          x,
        })
        if (itemsLayoutGathering.current.length === nTabs) {
          setItemsLayout(itemsLayoutGathering.current.sort((a, b) => a.x - b.x))
        }
      }
    },
    [scrollEnabled, itemsLayout.length, nTabs]
  )

  const cancelNextScrollSync = useSharedValue(index.value)

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      tabsOffset.value = event.contentOffset.x
    },
    onBeginDrag: () => {
      isScrolling.value = true
      cancelNextScrollSync.value = index.value
    },
    onMomentumEnd: () => {
      isScrolling.value = false
    },
  })

  const currentIndexToSync = useSharedValue(index.value)
  const targetIndexToSync = useSharedValue(index.value)

  useAnimatedReaction(
    () => {
      return index.value
    },
    (nextIndex) => {
      if (scrollEnabled) {
        cancelAnimation(currentIndexToSync)
        targetIndexToSync.value = nextIndex
        currentIndexToSync.value = withTiming(nextIndex)
      }
    }
  )

  useAnimatedReaction(
    () => {
      return currentIndexToSync.value === targetIndexToSync.value
    },
    (canSync) => {
      if (canSync && scrollEnabled && itemsLayout.length === nTabs) {
        const halfTab = itemsLayout[index.value].width / 2
        const offset = itemsLayout[index.value].x
        if (
          offset < tabsOffset.value ||
          offset > tabsOffset.value + windowWidth - 2 * halfTab
        ) {
          scrollTo(tabBarRef, offset - windowWidth / 2 + halfTab, 0, true)
        }
      }
    },
    [scrollEnabled, itemsLayout, nTabs]
  )

  return (
    <Animated.ScrollView
      ref={tabBarRef}
      horizontal
      style={style}
      contentContainerStyle={[
        styles.contentContainer,
        !scrollEnabled && { width: windowWidth },
      ]}
      keyboardShouldPersistTaps="handled"
      bounces={false}
      alwaysBounceHorizontal={false}
      scrollsToTop={false}
      showsHorizontalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      overScrollMode="never"
      scrollEnabled={scrollEnabled}
      onScroll={scrollEnabled ? onScroll : undefined}
    >
      {tabKeys.map((name, i) => {
        return (
          <TabItemComponent
            key={name}
            index={i}
            name={name}
            label={tabProps.get(name)?.label || getLabelText(name)}
            onPress={onTabPress}
            onLayout={scrollEnabled ? onTabItemLayout : undefined}
            scrollEnabled={scrollEnabled}
            indexDecimal={indexDecimal}
          />
        )
      })}
      {itemsLayout.length === nTabs && (
        <Indicator
          indexDecimal={indexDecimal}
          itemsLayout={itemsLayout}
          fadeIn={scrollEnabled}
          style={indicatorStyle}
        />
      )}
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
})

export { TabBar as MaterialTabBar }

export default TabBar
