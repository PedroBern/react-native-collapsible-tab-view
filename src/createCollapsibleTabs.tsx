import React from 'react'
import {
  FlatList as RNFlatList,
  View,
  StyleSheet,
  LayoutChangeEvent,
  useWindowDimensions,
  Platform,
  FlatList,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useDerivedValue,
  useAnimatedReaction,
  scrollTo,
  withTiming,
  runOnJS,
  withDelay,
  cancelAnimation,
  useAnimatedRef,
} from 'react-native-reanimated'

import MaterialTabBar, { TABBAR_HEIGHT } from './MaterialTabBar'
import { Tab as TabComponent, TabProps } from './Tab'
import { useAnimatedDynamicRefs, useContainerRef, useTabProps } from './hooks'
import {
  CollapsibleProps,
  ContextType,
  ScrollViewProps,
  FlatListProps,
  CollapsibleRef,
  CollapsibleStyle,
  TabName,
  Ref,
  RefComponent,
} from './types'

const AnimatedFlatList = Animated.createAnimatedComponent(RNFlatList)

/** The time one frame takes at 60 fps (16 ms) */
const ONE_FRAME_MS = 16

const init = (children: any) => {
  if (React.Children.count(children) === 0) {
    throw new Error('CollapsibleTabs must have at least one child.')
  }
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      throw new Error(
        'CollapsibleTabs children must be array of React Elements.'
      )
    }
  })
  return true
}

function scrollToImpl<T extends RefComponent>(
  ref: Ref<T> | undefined,
  x: number,
  y: number,
  animated: boolean
): void {
  'worklet'
  if (!ref) return
  //@ts-expect-error: reanimated typescript types do not accept FlatList for `scrollTo`, but it does work
  scrollTo(ref, x, y, animated)
}

/**
 * Basic usage looks like this:
 *
 * ```tsx
 * import { createCollapsibleTabs } from 'react-native-collapsible-tab-view'
 *
 * type MyTabs = 'tab0' | 'tab1'
 *
 * const {
 *  Container,
 *  FlatList,
 *  ScrollView,
 *  useTabsContext
 *  useTabNameContext,
 *  useCollapsibleStyle,
 * } = createCollapsibleTabs<MyTabs>()
 * ```
 *
 * or
 * ```tsx
 * const { useTabsContext, , ...Tabs } = createCollapsibleTabs<MyTabs>()
 * ```
 *
 * use like this:
 * ```tsx
 * <Tabs.Container {...props} />
 * <Tabs.FlatList {...props} />
 * <Tabs.ScrollView {...props} />
 * ```
 */
const createCollapsibleTabs = <T extends TabName>() => {
  const Context = React.createContext<ContextType<T> | undefined>(undefined)

  /**
   * Hook exposing some useful variables.
   *
   * ```tsx
   * const { focusedTab, ...rest } = useTabsContext()
   * ```
   */
  function useTabsContext(): ContextType<T> {
    const c = React.useContext(Context)
    if (!c) throw new Error('useTabsContext must be inside a Tabs.Container')
    return c
  }

  const TabNameContext = React.createContext<T | undefined>(undefined)

  /**
   * Access the parent tab screen fron any deep component.
   *
   * ```tsx
   * const tabName = useTabNameContext()
   * ```
   */
  function useTabNameContext(): T {
    const c = React.useContext(TabNameContext)
    if (!c) throw new Error('useTabNameContext must be inside a TabNameContext')
    return c
  }

  /**
   * Basic usage looks like this:
   *
   * ```tsx
   * import {
   *   RefComponent,
   *   ContainerRef,
   *   TabBarProps,
   * } from 'react-native-collapsible-tab-view'
   * import { useAnimatedRef } from 'react-native-reanimated'
   *
   * type MyTabs = 'article' | 'contacts' | 'albums'
   *
   * const MyHeader: React.FC<TabBarProps<MyTabs>> = (props) => {...}
   *
   * const Example: React.FC<Props> = () => {
   *   const containerRef = useAnimatedRef<ContainerRef>()
   *   const tab0Ref = useAnimatedRef<RefComponent>()
   *   const tab1Ref = useAnimatedRef<RefComponent>()
   *
   *   const [refMap] = React.useState({
   *     tab0: tab0Ref,
   *     tab1: tab1Ref,
   *   })
   *
   *   return (
   *     <Tabs.Container
   *       containerRef={containerRef}
   *       HeaderComponent={MyHeader}
   *       headerHeight={HEADER_HEIGHT} // optional
   *       refMap={refMap}
   *     >
   *       { components returning Tabs.ScrollView || Tabs.FlatList }
   *     </Tabs.Container>
   *   )
   * }
   * ```
   */
  const Container = React.forwardRef<CollapsibleRef<T>, CollapsibleProps<T>>(
    (
      {
        initialTabName,
        //containerRef,
        headerHeight: initialHeaderHeight,
        minHeaderHeight = 0,
        tabBarHeight: initialTabBarHeight = TABBAR_HEIGHT,
        snapEnabled = false,
        diffClampEnabled = false,
        snapThreshold = 0.5,
        children,
        HeaderComponent,
        TabBarComponent = MaterialTabBar,
        //refMap,
        headerContainerStyle,
        cancelTranslation,
        containerStyle,
        lazy,
        cancelLazyFadeIn,
        pagerProps,
        onIndexChange,
      },
      ref
    ) => {
      const containerRef = useContainerRef()

      const tabProps = useTabProps(children, Tab)
      const tabNamesArray = React.useMemo(() => [...tabProps.keys()], [
        tabProps,
      ])

      const [getRef, setRef] = useAnimatedDynamicRefs()

      const windowWidth = useWindowDimensions().width
      const firstRender = React.useRef(init(children))

      const [containerHeight, setContainerHeight] = React.useState<
        number | undefined
      >(undefined)
      const [tabBarHeight, setTabBarHeight] = React.useState<
        number | undefined
      >(initialTabBarHeight)
      const [headerHeight, setHeaderHeight] = React.useState<
        number | undefined
      >(initialHeaderHeight)
      const isScrolling = useSharedValue(0)
      const scrollYCurrent = useSharedValue(0)
      const scrollY = useSharedValue(
        tabNamesArray.map(() => 0),
        false
      )
      const offset = useSharedValue(0)
      const accScrollY = useSharedValue(0)
      const oldAccScrollY = useSharedValue(0)
      const accDiffClamp = useSharedValue(0)
      const tabNames = useSharedValue<T[]>(tabNamesArray)
      const index = useSharedValue(
        initialTabName
          ? tabNames.value.findIndex((n) => n === initialTabName)
          : 0
      )
      const scrollX = useSharedValue(index.value * windowWidth)
      const pagerOpacity = useSharedValue(
        initialHeaderHeight === undefined || index.value !== 0 ? 0 : 1,
        false
      )
      const isSwiping = useSharedValue(false)
      const isSnapping = useSharedValue(false)
      const snappingTo = useSharedValue(0)
      const [data, setData] = React.useState(tabNamesArray)

      React.useEffect(() => {
        setData(tabNamesArray)
      }, [tabNamesArray])

      const focusedTab = useDerivedValue<T>(() => {
        return tabNames.value[index.value]
      }, [tabNames])
      const isGliding = useSharedValue(false)
      const endDrag = useSharedValue(0)
      const calculateNextOffset = useSharedValue(index.value)
      const headerScrollDistance = useDerivedValue(() => {
        return headerHeight !== undefined ? headerHeight - minHeaderHeight : 0
      }, [headerHeight, minHeaderHeight])

      const getItemLayout = React.useCallback(
        (_: unknown, index: number) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        }),
        [windowWidth]
      )

      const indexDecimal = useDerivedValue(() => {
        return scrollX.value / windowWidth
      }, [windowWidth])

      // handle window resize
      React.useEffect(() => {
        if (!firstRender.current) {
          containerRef.current?.scrollToIndex({
            index: index.value,
            animated: false,
          })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [windowWidth])

      React.useEffect(() => {
        if (firstRender.current) {
          if (initialTabName !== undefined && index.value !== 0) {
            containerRef.current?.scrollToIndex({
              index: index.value,
              animated: false,
            })
          }
          firstRender.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [containerRef, initialTabName, windowWidth])

      // derived from scrollX
      // calculate the next offset and index if swiping
      // if scrollX changes from tab press,
      // the same logic must be done, but knowing
      // the next index in advance
      useAnimatedReaction(
        () => {
          const nextIndex = isSwiping.value
            ? Math.round(indexDecimal.value)
            : null
          return nextIndex
        },
        (nextIndex) => {
          if (nextIndex !== null && nextIndex !== index.value) {
            calculateNextOffset.value = nextIndex
          }
        },
        []
      )

      useAnimatedReaction(
        () => {
          return calculateNextOffset.value
        },
        (i) => {
          if (i !== index.value) {
            offset.value =
              scrollY.value[index.value] - scrollY.value[i] + offset.value
            if (onIndexChange) {
              runOnJS(onIndexChange)({
                prevIndex: index.value,
                index: i,
                prevTabName: tabNames.value[index.value],
                tabName: tabNames.value[i],
              })
            }
            index.value = i
          }
        },
        []
      )

      const scrollHandlerX = useAnimatedScrollHandler(
        {
          onScroll: (event) => {
            const { x } = event.contentOffset
            scrollX.value = x
          },
          onBeginDrag: () => {
            isSwiping.value = true
          },
          onMomentumEnd: () => {
            isSwiping.value = false
          },
        },
        []
      )

      // derived from accScrollY, to calculate the accDiffClamp value
      useAnimatedReaction(
        () => {
          return diffClampEnabled ? accScrollY.value - oldAccScrollY.value : 0
        },
        (delta) => {
          if (delta) {
            if (accScrollY.value <= 0) {
              // handle overscroll on ios, when being dragged beyond the top border
              accDiffClamp.value = 0
            } else {
              const nextValue = accDiffClamp.value + delta

              if (delta > 0) {
                // scrolling down
                accDiffClamp.value = Math.min(
                  headerScrollDistance.value,
                  nextValue
                )
              } else if (delta < 0) {
                // scrolling up
                accDiffClamp.value = Math.max(0, nextValue)
              }
            }
          }
        },
        []
      )

      const renderItem = React.useCallback(
        ({ index: i }) => {
          return (
            <TabNameContext.Provider value={tabNames.value[i]}>
              {lazy ? (
                <Lazy
                  startMounted={i === index.value}
                  cancelLazyFadeIn={cancelLazyFadeIn}
                >
                  {React.Children.toArray(children)[i] as React.ReactElement}
                </Lazy>
              ) : (
                React.Children.toArray(children)[i]
              )}
            </TabNameContext.Provider>
          )
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [children, lazy, tabNames.value, cancelLazyFadeIn]
      )

      const stylez = useAnimatedStyle(() => {
        return {
          transform: [
            {
              translateY: diffClampEnabled
                ? -accDiffClamp.value
                : -Math.min(scrollYCurrent.value, headerScrollDistance.value),
            },
          ],
        }
      }, [diffClampEnabled])

      const getHeaderHeight = React.useCallback(
        (event: LayoutChangeEvent) => {
          const height = event.nativeEvent.layout.height
          if (headerHeight !== height) {
            setHeaderHeight(height)
          }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

      // fade in the pager if the headerHeight is not defined
      useAnimatedReaction(
        () => {
          return (
            (initialHeaderHeight === undefined ||
              initialTabName !== undefined) &&
            headerHeight !== undefined &&
            pagerOpacity.value === 0
          )
        },
        (update) => {
          if (update) {
            pagerOpacity.value = withTiming(1)
          }
        },
        [headerHeight]
      )

      const pagerStylez = useAnimatedStyle(() => {
        return {
          opacity: pagerOpacity.value,
        }
      }, [])

      const onTabPress = React.useCallback(
        (name: T) => {
          // simplify logic by preventing index change
          // when is scrolling or gliding.
          if (!isScrolling.value && !isGliding.value) {
            const i = tabNames.value.findIndex((n) => n === name)
            calculateNextOffset.value = i
            if (name === focusedTab.value) {
              const ref = getRef(name)
              if (ref?.current && 'scrollTo' in ref.current) {
                ref.current?.scrollTo({
                  x: 0,
                  y: 0,
                  animated: true,
                })
              } else if (ref?.current && 'scrollToOffset' in ref.current) {
                ref.current.scrollToOffset({
                  offset: 0,
                  animated: true,
                })
              }
            } else {
              containerRef.current?.scrollToIndex({ animated: true, index: i })
            }
          }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [containerRef, getRef]
      )

      React.useEffect(() => {
        if (index.value >= tabNamesArray.length) {
          onTabPress(tabNamesArray[tabNamesArray.length - 1])
        }
      }, [index.value, onTabPress, tabNamesArray])

      const keyExtractor = React.useCallback((name) => name, [])

      React.useImperativeHandle(
        ref,
        () => ({
          setIndex: (index) => {
            if (isScrolling.value || isGliding.value) return false
            const name = tabNames.value[index]
            onTabPress(name)
            return true
          },
          jumpToTab: (name) => {
            if (isScrolling.value || isGliding.value) return false
            onTabPress(name)
            return true
          },
          getFocusedTab: () => {
            return tabNames.value[index.value]
          },
          getCurrentIndex: () => {
            return index.value
          },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onTabPress]
      )

      return (
        <Context.Provider
          value={{
            snapEnabled,
            tabBarHeight: tabBarHeight || 0,
            headerHeight: headerHeight || 0,
            getRef,
            setRef,
            headerScrollDistance,
            scrollYCurrent,
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
            scrollX,
            indexDecimal,
            isGliding,
            isSnapping,
            snappingTo,
            endDrag,
          }}
        >
          <Animated.View
            style={[styles.container, containerStyle]}
            onLayout={onLayout}
            pointerEvents="box-none"
          >
            <Animated.View
              pointerEvents="box-none"
              style={[
                styles.topContainer,
                headerContainerStyle,
                !cancelTranslation && stylez,
              ]}
            >
              <View
                style={[styles.container, styles.headerContainer]}
                onLayout={getHeaderHeight}
                pointerEvents="box-none"
              >
                {HeaderComponent && (
                  <HeaderComponent
                    containerRef={containerRef}
                    index={index}
                    tabNames={tabNamesArray}
                    focusedTab={focusedTab}
                    indexDecimal={indexDecimal}
                    onTabPress={onTabPress}
                    tabProps={tabProps}
                  />
                )}
              </View>
              <View
                style={[styles.container, styles.tabBarContainer]}
                onLayout={getTabBarHeight}
                pointerEvents="box-none"
              >
                {TabBarComponent && (
                  <TabBarComponent
                    containerRef={containerRef}
                    index={index}
                    tabNames={tabNamesArray}
                    focusedTab={focusedTab}
                    indexDecimal={indexDecimal}
                    onTabPress={onTabPress}
                    tabProps={tabProps}
                  />
                )}
              </View>
            </Animated.View>
            <AnimatedFlatList
              // @ts-expect-error problem with reanimated types, they're missing `ref`
              ref={containerRef}
              initialScrollIndex={index.value}
              data={data}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              onScroll={scrollHandlerX}
              showsHorizontalScrollIndicator={false}
              getItemLayout={getItemLayout}
              scrollEventThrottle={16}
              {...pagerProps}
              style={[pagerStylez, pagerProps?.style]}
            />
          </Animated.View>
        </Context.Provider>
      )
    }
  )

  /**
   * Typically used internally, but if you want to mix lazy and regular screens you can wrap the lazy ones with this component.
   */
  const Lazy: React.FC<{
    startMounted?: boolean
    cancelLazyFadeIn?: boolean
    children: React.ReactElement
  }> = ({ children, startMounted, cancelLazyFadeIn }) => {
    // we don't use `useTabNameContext()` here because the context can disappear from underneath us
    // when the tab page is being unmounted (with dynamic tabs)
    const name = React.useContext(TabNameContext)
    const { focusedTab, getRef, scrollY, tabNames } = useTabsContext()
    const [canMount, setCanMount] = React.useState(!!startMounted)
    const [afterMount, setAfterMount] = React.useState(!!startMounted)

    const opacity = useSharedValue(cancelLazyFadeIn ? 1 : 0)

    const allowToMount = React.useCallback(() => {
      // wait the scene to be at least 50 ms focused, before mounting
      setTimeout(() => {
        if (focusedTab.value === name) {
          setCanMount(true)
          // we need to wait for the children rendering to complete so that we can scroll properly
          setTimeout(() => {
            setAfterMount(true)
          }, 10)
        }
      }, 50)
    }, [focusedTab.value, name])

    useAnimatedReaction(
      () => {
        return focusedTab.value === name
      },
      (focused) => {
        if (focused && !canMount) {
          runOnJS(allowToMount)()
        }
      },
      [canMount, focusedTab]
    )

    const ref = name ? getRef(name) : null

    useDerivedValue(() => {
      if (afterMount) {
        const tabIndex = tabNames.value.findIndex((n) => n === name)
        if (ref && tabIndex >= 0) {
          scrollToImpl(ref, 0, scrollY.value[tabIndex], false)
        }
        if (!cancelLazyFadeIn && opacity.value !== 1)
          opacity.value = withTiming(1)
      }
    }, [ref, cancelLazyFadeIn, opacity, name, afterMount])

    const stylez = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      }
    }, [])

    return canMount ? (
      cancelLazyFadeIn ? (
        children
      ) : (
        <Animated.View
          pointerEvents="box-none"
          style={[styles.container, !cancelLazyFadeIn && stylez]}
        >
          {children}
        </Animated.View>
      )
    ) : (
      <ScrollView />
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
      getRef,
      oldAccScrollY,
      accScrollY,
      offset,
      scrollY,
      tabNames,
      index,
      scrollYCurrent,
      headerHeight,
      headerScrollDistance,
      isGliding,
      isSnapping,
      snappingTo,
      endDrag,
    } = useTabsContext()

    const [tabIndex] = React.useState(
      tabNames.value.findIndex((n) => n === name)
    )
    const ref = getRef(name)

    const onMomentumEnd = () => {
      'worklet'
      if (snapEnabled) {
        if (diffClampEnabled && accDiffClamp.value > 0) {
          if (scrollYCurrent.value > headerScrollDistance.value) {
            if (
              accDiffClamp.value <=
              headerScrollDistance.value * snapThreshold
            ) {
              // snap down
              isSnapping.value = true
              accDiffClamp.value = withTiming(0, undefined, () => {
                isSnapping.value = false
              })
            } else if (accDiffClamp.value < headerScrollDistance.value) {
              // snap up
              isSnapping.value = true
              accDiffClamp.value = withTiming(
                headerScrollDistance.value,
                undefined,
                () => {
                  isSnapping.value = false
                }
              )
            }
          } else {
            isSnapping.value = true
            accDiffClamp.value = withTiming(0, undefined, () => {
              isSnapping.value = false
            })
          }
        } else {
          if (
            scrollYCurrent.value <=
            headerScrollDistance.value * snapThreshold
          ) {
            // snap down
            snappingTo.value = 0
            scrollToImpl(ref, 0, 0, true)
          } else if (scrollYCurrent.value <= headerScrollDistance.value) {
            // snap up
            snappingTo.value = headerScrollDistance.value
            scrollToImpl(ref, 0, headerScrollDistance.value, true)
          }
          isSnapping.value = false
        }
      }
      isGliding.value = false
    }

    const scrollHandler = useAnimatedScrollHandler(
      {
        onScroll: (event) => {
          if (focusedTab.value === name) {
            const { y } = event.contentOffset
            scrollYCurrent.value = y
            scrollY.value[index.value] = y
            oldAccScrollY.value = accScrollY.value
            accScrollY.value = scrollY.value[index.value] + offset.value

            isScrolling.value = 1

            // cancel the animation that is setting this back to 0 if we're still scrolling
            cancelAnimation(isScrolling)

            // set it back to 0 after a few frames without active scrolling
            isScrolling.value = withDelay(
              ONE_FRAME_MS * 3,
              withTiming(0, { duration: 0 })
            )
          }
        },
        onBeginDrag: () => {
          endDrag.value = 0
        },
        onEndDrag: () => {
          isGliding.value = true
          if (Platform.OS === 'ios') {
            endDrag.value = 1
            endDrag.value = withDelay(
              ONE_FRAME_MS,
              withTiming(0, { duration: 0 }, (isFinished) => {
                // if the animation is finished, the onMomentumBegin has
                // never started, so we need to manually trigger the onMomentumEnd
                // to make sure we snap
                if (isFinished) {
                  isGliding.value = false
                  onMomentumEnd()
                }
              })
            )
          }
        },
        onMomentumBegin: () => {
          if (Platform.OS === 'ios') {
            cancelAnimation(endDrag)
          }
        },
        onMomentumEnd,
      },
      [ref, name, diffClampEnabled, snapEnabled]
    )

    // sync unfocused scenes
    useAnimatedReaction(
      () => {
        return !isSnapping.value && !isScrolling.value && !isGliding.value
      },
      (sync) => {
        if (sync && focusedTab.value !== name) {
          let nextPosition = null
          const focusedScrollY = scrollY.value[index.value]
          const tabScrollY = scrollY.value[tabIndex]
          const areEqual = focusedScrollY === tabScrollY

          if (!areEqual) {
            const currIsOnTop = tabScrollY <= headerScrollDistance.value + 1
            const focusedIsOnTop =
              focusedScrollY <= headerScrollDistance.value + 1

            if (diffClampEnabled) {
              const hasGap = accDiffClamp.value > tabScrollY
              if (hasGap || currIsOnTop) {
                nextPosition = accDiffClamp.value
              }
            } else if (snapEnabled) {
              if (focusedIsOnTop) {
                nextPosition = snappingTo.value
              } else if (currIsOnTop) {
                nextPosition = headerHeight
              }
            } else if (currIsOnTop || focusedIsOnTop) {
              nextPosition = Math.min(
                focusedScrollY,
                headerScrollDistance.value
              )
            }
          }

          if (nextPosition !== null) {
            scrollY.value[tabIndex] = nextPosition
            scrollToImpl(ref, 0, nextPosition, false)
          }
        }
      },
      [diffClampEnabled, ref, snapEnabled]
    )

    return scrollHandler
  }

  /**
   * Hook to access some key styles that make the whole think work.
   *
   * You can use this to get the progessViewOffset and pass to the refresh control of scroll view.
   */
  function useCollapsibleStyle(): CollapsibleStyle {
    const { headerHeight, tabBarHeight, containerHeight } = useTabsContext()
    const windowWidth = useWindowDimensions().width

    return {
      style: { width: windowWidth },
      contentContainerStyle: {
        minHeight: (containerHeight || 0) + headerHeight,
        paddingTop: headerHeight + tabBarHeight,
      },
      progressViewOffset: headerHeight + tabBarHeight,
    }
  }

  /**
   * Use like a regular flatlist.
   */
  function FlatList<R>({
    contentContainerStyle,
    style,
    ...rest
  }: FlatListProps<R>): React.ReactElement {
    const name = useTabNameContext()
    const { setRef } = useTabsContext()
    const ref = useAnimatedRef<FlatList<any>>()
    const scrollHandler = useScrollHandlerY(name)
    const {
      style: _style,
      contentContainerStyle: _contentContainerStyle,
      progressViewOffset,
    } = useCollapsibleStyle()

    React.useEffect(() => {
      setRef(name, ref)
    }, [name, ref, setRef])

    return (
      <AnimatedFlatList
        // @ts-expect-error problem with reanimated types, they're missing `ref`
        ref={ref}
        bouncesZoom={false}
        style={[_style, style]}
        contentContainerStyle={[_contentContainerStyle, contentContainerStyle]}
        progressViewOffset={progressViewOffset}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        {...rest}
      />
    )
  }

  /**
   * Use like a regular scrollview.
   */
  const ScrollView: React.FC<ScrollViewProps> = ({
    contentContainerStyle,
    style,
    children,
    ...rest
  }) => {
    const name = useTabNameContext()
    const ref = useAnimatedRef<Animated.ScrollView>()
    const { setRef } = useTabsContext()
    const scrollHandler = useScrollHandlerY(name)
    const {
      style: _style,
      contentContainerStyle: _contentContainerStyle,
    } = useCollapsibleStyle()

    React.useEffect(() => {
      setRef(name, ref)
    }, [name, ref, setRef])

    return (
      <Animated.ScrollView
        ref={ref}
        bouncesZoom={false}
        style={[_style, style]}
        contentContainerStyle={[
          _contentContainerStyle,
          // TODO: investigate types
          contentContainerStyle as any,
        ]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        {...rest}
      >
        {children}
      </Animated.ScrollView>
    )
  }

  /**
   * TODO: write docs
   */
  function Tab(props: TabProps<T>) {
    return <TabComponent {...props} />
  }

  return {
    Tab,
    Container,
    Lazy,
    FlatList,
    ScrollView,
    useTabsContext,
    useTabNameContext,
    useCollapsibleStyle,
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
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
  tabBarContainer: {
    zIndex: 1,
  },
  headerContainer: {
    zIndex: 2,
  },
})

export default createCollapsibleTabs
