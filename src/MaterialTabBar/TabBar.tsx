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
  focusedTab,
  refMap,
  indexDecimal,
  containerRef,
  scrollEnabled = false,
  indicatorStyle,
  index,
  TabItemComponent = TabItem,
  tabItemProps = {},
  getLabelText = (name) => name.toUpperCase(),
}) => {
  const tabBarRef = useAnimatedRef<Animated.ScrollView>()
  const windowWidth = useWindowDimensions().width
  const isFirstRender = React.useRef(true)
  const [nTabs] = React.useState(Object.keys(refMap).length)
  const itemsLayoutGathering = React.useRef<ItemLayout[]>([])
  const tabsOffset = useSharedValue(0)
  const isScrolling = useSharedValue(false)

  const [itemsLayout, setItemsLayout] = React.useState<ItemLayout[]>(
    scrollEnabled
      ? []
      : Object.keys(refMap).map((_, i) => {
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
        Object.keys(refMap).map((_, i) => {
          return { width: tabWidth, x: i * tabWidth }
        })
      )
    }
  }, [scrollEnabled, nTabs, refMap, windowWidth])

  const onTabPress = React.useCallback(
    (i: number, name: keyof typeof refMap) => {
      if (name === focusedTab.value) {
        // @ts-ignore
        if (refMap[name].current?.scrollTo) {
          // @ts-ignore
          refMap[name].current?.scrollTo({
            x: 0,
            y: 0,
            animated: true,
          })
          // @ts-ignore
        } else if (refMap[name].current?.scrollToOffset) {
          // @ts-ignore
          refMap[name].current?.scrollToOffset({
            offset: 0,
            animated: true,
          })
        }
      } else {
        containerRef.current?.scrollToIndex({ animated: true, index: i })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [containerRef, refMap]
  )

  const onTabItemLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      if (scrollEnabled && itemsLayout.length < nTabs) {
        const { width, x } = event.nativeEvent.layout
        itemsLayoutGathering.current.push({
          width,
          x,
        })
        if (itemsLayoutGathering.current.length === nTabs) {
          setItemsLayout(itemsLayoutGathering.current)
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
      style={[styles.root]}
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
      {Object.keys(refMap).map((name, i) => {
        return (
          <TabItemComponent
            key={name}
            index={i}
            name={name}
            label={getLabelText(name)}
            onPress={onTabPress}
            onLayout={scrollEnabled ? onTabItemLayout : undefined}
            scrollEnabled={scrollEnabled}
            indexDecimal={indexDecimal}
            {...tabItemProps}
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
  root: {
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
})

export default TabBar
