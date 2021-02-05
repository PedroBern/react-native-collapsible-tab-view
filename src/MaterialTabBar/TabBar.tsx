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

import { TabName } from '../types'
import Indicator from './Indicator'
import TabItem from './TabItem'
import { MaterialTabBarProps, ItemLayout } from './types'

export const TABBAR_HEIGHT = 48

/**
 * Basic usage looks like this:
 * ```tsx
 * import {
 *  RefComponent,
 *  ContainerRef,
 *  TabBarProps,
 * } from 'react-native-collapsible-tab-view'
 * import { useAnimatedRef } from 'react-native-reanimated'
 * type MyTabs = 'article' | 'contacts' | 'albums'
 * const MyHeader: React.FC<TabBarProps<MyTabs>> = (props) => {...}
 * const Example: React.FC<Props> = () => {
 *  const containerRef = useAnimatedRef<ContainerRef>();
 *  const tab0Ref = useAnimatedRef<RefComponent>();
 *  const tab1Ref = useAnimatedRef<RefComponent>();
 *  const [refMap] = React.useState({
 *    tab0: tab0Ref,
 *    tab1: tab1Ref,
 *  });
 *  return (
 *    <Tabs.Container
 *      containerRef={containerRef}
 *      HeaderComponent={MyHeader}
 *      headerHeight={HEADER_HEIGHT} // optional
 *      refMap={refMap}
 *      TabBarComponent={(props) => (
 *        <MaterialTabBar
 *          {...props}
 *          activeColor="red"
 *          inactiveColor="yellow"
 *          labelStyle={{ fontSize: 14 }}
 *        />
 *      )}
 *    >
 *      {components returning Tabs.ScrollView || Tabs.FlatList}
 *    </Tabs.Container>
 *  );
 * };
 * ```
 */
const TabBar = <T extends TabName = any>({
  tabNames,
  indexDecimal,
  scrollEnabled = false,
  indicatorStyle,
  index,
  TabItemComponent = TabItem,
  getLabelText = (name) => String(name).toUpperCase(),
  onTabPress,
  style,
  tabProps,
  contentContainerStyle,
  labelStyle,
  inactiveColor,
  activeColor,
  tabStyle,
}: MaterialTabBarProps<T>): React.ReactElement => {
  const tabBarRef = useAnimatedRef<Animated.ScrollView>()
  const windowWidth = useWindowDimensions().width
  const isFirstRender = React.useRef(true)
  const [itemsLayoutGathering, setItemsLayoutGathering] = React.useState(
    new Map<T, ItemLayout>()
  )
  const tabsOffset = useSharedValue(0)
  const isScrolling = useSharedValue(false)

  const nTabs = tabNames.length

  const [itemsLayout, setItemsLayout] = React.useState<ItemLayout[]>(
    scrollEnabled
      ? []
      : tabNames.map((_, i) => {
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
        tabNames.map((_, i) => {
          return { width: tabWidth, x: i * tabWidth }
        })
      )
    }
  }, [scrollEnabled, nTabs, tabNames, windowWidth])

  const onTabItemLayout = React.useCallback(
    (event: LayoutChangeEvent, name: T) => {
      if (scrollEnabled) {
        if (!event.nativeEvent?.layout) return
        const { width, x } = event.nativeEvent.layout
        setItemsLayoutGathering((itemsLayoutGathering) => {
          const update = new Map(itemsLayoutGathering)
          return update.set(name, {
            width,
            x,
          })
        })
      }
    },
    [scrollEnabled]
  )

  React.useEffect(() => {
    // pick out the layouts for the tabs we know about (in case they changed dynamically)
    const layout = [...itemsLayoutGathering.entries()]
      .filter(([tabName]) => tabNames.includes(tabName))
      .map(([, layout]) => layout)
      .sort((a, b) => a.x - b.x)

    if (layout.length === tabNames.length) {
      setItemsLayout(layout)
    }
  }, [itemsLayoutGathering, tabNames])

  const cancelNextScrollSync = useSharedValue(index.value)

  const onScroll = useAnimatedScrollHandler(
    {
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
    },
    []
  )

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
    },
    [scrollEnabled]
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
        contentContainerStyle,
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
      scrollEventThrottle={16}
    >
      {tabNames.map((name, i) => {
        return (
          <TabItemComponent
            key={name}
            index={i}
            name={name}
            label={tabProps.get(name)?.label || getLabelText(name)}
            onPress={onTabPress}
            onLayout={
              scrollEnabled
                ? (event) => onTabItemLayout(event, name)
                : undefined
            }
            scrollEnabled={scrollEnabled}
            indexDecimal={indexDecimal}
            labelStyle={labelStyle}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            style={tabStyle}
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
