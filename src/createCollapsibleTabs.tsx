import React from 'react'
import {
  FlatList as RNFlatList,
  Dimensions,
  View,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useDerivedValue,
  useAnimatedReaction,
  scrollTo,
  withTiming,
} from 'react-native-reanimated'

import { Props, ContextType, ScrollViewProps, FlatListProps } from './types'

const windowWidth = Dimensions.get('window').width

const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList)

const createCollapsibleTabs = <T extends string>() => {
  const Context = React.createContext<ContextType<T> | undefined>(undefined)

  function useTabsContext(): ContextType<T> {
    const c = React.useContext(Context)
    if (!c) throw new Error('useTabsContext must be inside a Tabs.Container')
    return c
  }

  const Container: React.FC<Props<T>> = ({
    containerRef,
    headerHeight: initialHeaderHeight,
    tabBarHeight: initialTabBarHeight,
    snapEnabled = false,
    diffClampEnabled = false,
    snapThreshold = 0.5,
    children,
    HeaderComponent,
    TabBarComponent,
    refMap,
    headerContainerStyle,
    cancelTranslation,
    containerStyle,
  }) => {
    const [containerHeight, setContainerHeight] = React.useState<
      number | undefined
    >(undefined)
    const [tabBarHeight, setTabBarHeight] = React.useState(
      initialTabBarHeight || 0
    )
    const [headerHeight, setHeaderHeight] = React.useState(
      initialHeaderHeight || 0
    )
    const isScrolling = useSharedValue(-1)
    const scrollX = useSharedValue(0)
    const scrollYCurrent = useSharedValue(0)
    const scrollY = useSharedValue([...new Array(children.length)].map(() => 0))
    const offset = useSharedValue(0)
    const accScrollY = useSharedValue(0)
    const oldAccScrollY = useSharedValue(0)
    const accDiffClamp = useSharedValue(0)
    const index = useSharedValue(0)
    const tabNames = useSharedValue(Object.keys(refMap))
    // @ts-ignore
    const focusedTab = useSharedValue<T>(tabNames.value[index.value])

    // derived from scrollX, to calculate the next offset and index
    useAnimatedReaction(
      () => {
        const nextIndex = Math.round(scrollX.value / windowWidth)
        return nextIndex
      },
      (nextIndex) => {
        if (nextIndex !== index.value) {
          offset.value =
            scrollY.value[index.value] - scrollY.value[nextIndex] + offset.value
          index.value = nextIndex
          // @ts-ignore
          focusedTab.value = tabNames.value[nextIndex]
        }
      }
    )

    const scrollHandlerX = useAnimatedScrollHandler(
      {
        onScroll: (event) => {
          const { x } = event.contentOffset
          scrollX.value = x
        },
      },
      [refMap]
    )

    // derived from accScrollY, to calculate the accDiffClamp value
    useAnimatedReaction(
      () => {
        return diffClampEnabled ? accScrollY.value - oldAccScrollY.value : 0
      },
      (delta) => {
        if (delta) {
          const nextValue = accDiffClamp.value + delta
          if (delta > 0) {
            // scrolling down
            accDiffClamp.value = Math.min(headerHeight, nextValue)
          } else if (delta < 0) {
            // scrolling up
            accDiffClamp.value = Math.max(0, nextValue)
          }
        }
      }
    )

    const renderItem = React.useCallback(
      ({ index }) => {
        return children[index]
      },
      [children]
    )

    const stylez = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: diffClampEnabled
              ? -accDiffClamp.value
              : -Math.min(scrollYCurrent.value, headerHeight),
          },
        ],
      }
    }, [diffClampEnabled])

    const getHeaderHeight = React.useCallback(
      (event: LayoutChangeEvent) => {
        const height = event.nativeEvent.layout.height
        if (headerHeight !== height) setHeaderHeight(height)
      },
      [headerHeight]
    )

    const getTabBarHeight = React.useCallback(
      (event: LayoutChangeEvent) => {
        const height = event.nativeEvent.layout.height
        if (tabBarHeight !== height) setTabBarHeight(height)
      },
      [tabBarHeight]
    )

    const onLayout = React.useCallback(
      (event: LayoutChangeEvent) => {
        const height = event.nativeEvent.layout.height
        if (containerHeight !== height) setContainerHeight(height)
      },
      [containerHeight]
    )

    return (
      <Context.Provider
        value={{
          snapEnabled,
          tabBarHeight,
          headerHeight,
          refMap,
          scrollYCurrent,
          // @ts-ignore
          tabNames,
          index,
          scrollY,
          accScrollY,
          oldAccScrollY,
          offset,
          isScrolling,
          snapThreshold,
          diffClampEnabled,
          focusedTab,
          accDiffClamp,
          containerHeight,
        }}
      >
        <View
          style={[styles.container, containerStyle]}
          onLayout={onLayout}
          pointerEvents="box-none"
        >
          <Animated.View
            pointerEvents="box-none"
            style={[
              styles.headerContainer,
              headerContainerStyle,
              !cancelTranslation && stylez,
            ]}
          >
            <View
              style={styles.container}
              onLayout={getHeaderHeight}
              pointerEvents="box-none"
            >
              {HeaderComponent && (
                <HeaderComponent
                  containerRef={containerRef}
                  index={index}
                  refMap={refMap}
                  focusedTab={focusedTab}
                  scrollX={scrollX}
                />
              )}
            </View>
            <View
              style={styles.container}
              onLayout={getTabBarHeight}
              pointerEvents="box-none"
            >
              {TabBarComponent && (
                <TabBarComponent
                  containerRef={containerRef}
                  index={index}
                  refMap={refMap}
                  focusedTab={focusedTab}
                  scrollX={scrollX}
                />
              )}
            </View>
          </Animated.View>
          <AnimatedFlatList
            // @ts-ignore
            ref={containerRef}
            data={[...new Array(children.length)].map((_, i) => i)}
            keyExtractor={(item) => item + ''}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            onScroll={scrollHandlerX}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </Context.Provider>
    )
  }

  const useScrollHandlerY = (name: T) => {
    const {
      accDiffClamp,
      isScrolling,
      focusedTab,
      snapEnabled,
      snapThreshold,
      diffClampEnabled,
      refMap,
      oldAccScrollY,
      accScrollY,
      offset,
      scrollY,
      tabNames,
      index,
      scrollYCurrent,
      headerHeight,
    } = useTabsContext()

    const scrollHandler = useAnimatedScrollHandler(
      {
        onScroll: (event) => {
          if (focusedTab.value === name) {
            const { y } = event.contentOffset
            scrollYCurrent.value = y
            scrollY.value[index.value] = y
            oldAccScrollY.value = accScrollY.value
            accScrollY.value = scrollY.value[index.value] + offset.value
          }
        },
        onBeginDrag: () => {
          isScrolling.value = true
        },
        onMomentumEnd: () => {
          if (snapEnabled) {
            if (diffClampEnabled) {
              if (accDiffClamp.value > 0) {
                if (scrollYCurrent.value > headerHeight) {
                  if (accDiffClamp.value <= headerHeight * snapThreshold) {
                    // snap down
                    accDiffClamp.value = withTiming(0)
                  } else if (accDiffClamp.value < headerHeight) {
                    // snap up
                    accDiffClamp.value = withTiming(headerHeight)
                  }
                } else {
                  // todo scroll snap
                }
              }
            } else {
              if (scrollYCurrent.value <= headerHeight * snapThreshold) {
                // snap down
                // @ts-ignore
                scrollTo(refMap[name], 0, 0, true)
              } else if (scrollYCurrent.value <= headerHeight) {
                // snap up
                // @ts-ignore
                scrollTo(refMap[name], 0, headerHeight, true)
              }
            }
          }
          isScrolling.value = false
        },
      },
      [headerHeight, name, diffClampEnabled, snapEnabled]
    )

    // sync unfocused tabs
    useDerivedValue(() => {
      if (isScrolling.value === false) {
        const tabIndex = tabNames.value.findIndex((n) => n === name)
        const tabScrollY = scrollY.value[tabIndex]
        if (focusedTab.value !== name) {
          let nextPosition = null
          if (
            !diffClampEnabled &&
            scrollYCurrent.value <= headerHeight &&
            tabScrollY > headerHeight
          ) {
            // sync up
            nextPosition = scrollYCurrent.value
          } else if (
            tabScrollY < scrollYCurrent.value &&
            tabScrollY < headerHeight
          ) {
            // sync down
            nextPosition = Math.min(headerHeight, scrollYCurrent.value)
          } else if (
            tabScrollY <= headerHeight &&
            tabScrollY > scrollYCurrent.value &&
            scrollYCurrent.value < headerHeight
          ) {
            // sync up
            nextPosition = scrollYCurrent.value
          }
          if (nextPosition !== null) {
            scrollY.value[tabIndex] = nextPosition
            // @ts-ignore
            scrollTo(refMap[name], 0, nextPosition, false)
          }
        }
      }
      return 0
    })

    return scrollHandler
  }

  function FlatList<R>({
    contentContainerStyle,
    style,
    name,
    ...rest
  }: FlatListProps<R, T>): React.ReactElement {
    const {
      refMap,
      headerHeight,
      tabBarHeight,
      containerHeight,
    } = useTabsContext()

    const scrollHandler = useScrollHandlerY(name)

    return (
      <AnimatedFlatList
        // @ts-ignore
        ref={refMap[name]}
        bounces={false}
        bouncesZoom={false}
        style={[{ width: windowWidth }, style]}
        contentContainerStyle={[
          {
            minHeight: (containerHeight || 0) + headerHeight,
            paddingTop: headerHeight + tabBarHeight,
          },
          // @ts-ignore
          contentContainerStyle,
        ]}
        progressViewOffset={headerHeight + tabBarHeight}
        onScroll={scrollHandler}
        {...rest}
      />
    )
  }

  const ScrollView: React.FC<ScrollViewProps<T>> = ({
    contentContainerStyle,
    style,
    children,
    name,
    ...rest
  }) => {
    const {
      refMap,
      headerHeight,
      tabBarHeight,
      containerHeight,
    } = useTabsContext()

    const scrollHandler = useScrollHandlerY(name)

    return (
      <Animated.ScrollView
        ref={refMap[name] as any}
        bounces={false}
        bouncesZoom={false}
        style={[{ width: windowWidth }, style]}
        contentContainerStyle={[
          {
            minHeight: (containerHeight || 0) + headerHeight,
            paddingTop: headerHeight + tabBarHeight,
          },
          // @ts-ignore
          contentContainerStyle,
        ]}
        progressViewOffset={headerHeight + tabBarHeight}
        onScroll={scrollHandler}
        {...rest}
      >
        {children}
      </Animated.ScrollView>
    )
  }

  return { FlatList, ScrollView, Container, useTabsContext }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
  },
})

export default createCollapsibleTabs
