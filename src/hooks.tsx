import {
  useMemo,
  Children,
  useState,
  useCallback,
  useContext,
  MutableRefObject,
  useEffect,
} from 'react'
import { useWindowDimensions } from 'react-native'
import { ContainerRef, RefComponent } from 'react-native-collapsible-tab-view'
import {
  cancelAnimation,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  withDelay,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import { useDeepCompareMemo } from 'use-deep-compare'

import { Context, TabNameContext } from './Context'
import {
  IS_IOS,
  ONE_FRAME_MS,
  PADDING_WORKAROUND_IOS,
  scrollToImpl,
} from './helpers'
import {
  CollapsibleStyle,
  ContextType,
  TabName,
  TabReactElement,
  TabsWithProps,
  Ref,
} from './types'

export function useContainerRef() {
  return useAnimatedRef<ContainerRef>()
}

export function useAnimatedDynamicRefs(): [
  ContextType['refMap'],
  ContextType['setRef']
] {
  const [map, setMap] = useState<ContextType['refMap']>({})
  const setRef = useCallback(function <T extends RefComponent>(
    key: TabName,
    ref: React.RefObject<T>
  ) {
    setMap((map) => ({ ...map, [key]: ref }))
    return ref
  },
  [])

  return [map, setRef]
}

export function useTabProps<T extends TabName>(
  children: TabReactElement<T>[] | TabReactElement<T>,
  tabType: Function
): [TabsWithProps<T>, T[]] {
  const options = useMemo(() => {
    const tabOptions: TabsWithProps<T> = new Map()
    Children.forEach(children, (element, index) => {
      if (element.type !== tabType)
        throw new Error(
          'Container children must be wrapped in a <Tabs.Tab ... /> component'
        )

      // make sure children is excluded otherwise our props will mutate too much
      const { name, children, ...options } = element.props
      if (tabOptions.has(name))
        throw new Error(`Tab names must be unique, ${name} already exists`)

      tabOptions.set(name, {
        index,
        name,
        ...options,
      })
    })
    return tabOptions
  }, [children, tabType])
  const optionEntries = [...options.entries()]
  const optionKeys = [...options.keys()]

  const memoizedOptions = useDeepCompareMemo(() => options, [optionEntries])

  const memoizedTabNames = useDeepCompareMemo(() => [...options.keys()], [
    optionKeys,
  ])

  return [memoizedOptions, memoizedTabNames]
}

/**
 * Hook exposing some useful variables.
 *
 * ```tsx
 * const { focusedTab, ...rest } = useTabsContext()
 * ```
 */
export function useTabsContext(): ContextType<TabName> {
  const c = useContext(Context)
  if (!c) throw new Error('useTabsContext must be inside a Tabs.Container')
  return c
}

/**
 * Access the parent tab screen from any deep component.
 *
 * ```tsx
 * const tabName = useTabNameContext()
 * ```
 */
export function useTabNameContext(): TabName {
  const c = useContext(TabNameContext)
  if (!c) throw new Error('useTabNameContext must be inside a TabNameContext')
  return c
}

/**
 * Hook to access some key styles that make the whole think work.
 *
 * You can use this to get the progessViewOffset and pass to the refresh control of scroll view.
 */
export function useCollapsibleStyle(): CollapsibleStyle {
  const { headerHeight, tabBarHeight, containerHeight } = useTabsContext()
  const windowWidth = useWindowDimensions().width

  return {
    style: { width: windowWidth },
    contentContainerStyle: {
      minHeight: IS_IOS
        ? // on IOS we use contentInset so the padding calculation differs
          (containerHeight || 0) - headerHeight - tabBarHeight
        : (containerHeight || 0) + headerHeight,
      paddingTop: IS_IOS ? PADDING_WORKAROUND_IOS : headerHeight + tabBarHeight,
    },
    progressViewOffset: headerHeight + tabBarHeight,
  }
}

export function useUpdateScrollViewContentSize({
  setContentHeights,
  name,
}: {
  name: TabName
  setContentHeights: ContextType['setContentHeights']
}) {
  const scrollContentSizeChange = useCallback(
    (_: number, h: number) => {
      setContentHeights((contentHeights) => ({
        ...contentHeights,
        [name]: h,
      }))
    },
    [name, setContentHeights]
  )

  return scrollContentSizeChange
}

/**
 * Allows specifying multiple functions to be called in a sequence with the same parameters
 * Useful because we handle some events and need to pass them forward so that the caller can handle them as well
 * @param fns array of functions to call
 * @returns a function that once called will call all passed functions
 */
export function useChainCallback(...fns: (Function | undefined)[]) {
  const callAll = useCallback(
    (...args: unknown[]) => {
      fns.forEach((fn) => {
        if (typeof fn === 'function') {
          fn(...args)
        }
      })
    },
    [fns]
  )
  return callAll
}

export function useScroller<T extends RefComponent>() {
  const { contentInset } = useTabsContext()

  const scroller = useCallback(
    (
      ref: Ref<T> | undefined,
      x: number,
      y: number,
      animated: boolean,
      _debugKey: string
    ) => {
      'worklet'
      if (!ref) return
      // console.log(`${_debugKey}, y: ${y}, y adjusted: ${y - contentInset}`)
      scrollToImpl(ref, x, y - contentInset, animated)
    },
    [contentInset]
  )

  return scroller
}

export const useScrollHandlerY = (name: TabName) => {
  const {
    accDiffClamp,
    focusedTab,
    snapThreshold,
    revealHeaderOnScroll,
    refMap,
    tabNames,
    index,
    headerHeight,
    contentInset,
    containerHeight,
    scrollYCurrent,
    scrollY,
    isScrolling,
    isGliding,
    oldAccScrollY,
    accScrollY,
    offset,
    headerScrollDistance,
    isSnapping,
    snappingTo,
    contentHeights,
  } = useTabsContext()

  const isDragging = useSharedValue(false)

  /**
   * Helper value to track if user is dragging on iOS, because iOS calls
   * onMomentumEnd only after a vigorous swipe. If the user has finished the
   * drag, but the onMomentumEnd has never triggered, we need to manually
   * call it to sync the scenes.
   */
  const afterDrag = useSharedValue(0)

  const tabIndex = useMemo(() => tabNames.value.findIndex((n) => n === name), [
    tabNames,
    name,
  ])

  const scrollTo = useScroller()

  const clampMax = useMemo(() => {
    const contentHeight = contentHeights[name] || Number.MAX_VALUE
    return contentHeight - (containerHeight || 0) + contentInset
  }, [contentHeights, name, contentInset, containerHeight])

  const onMomentumEnd = () => {
    'worklet'
    if (isDragging.value) return

    if (typeof snapThreshold === 'number') {
      if (revealHeaderOnScroll) {
        if (accDiffClamp.value > 0) {
          if (
            scrollYCurrent.value >
            headerScrollDistance.value * snapThreshold
          ) {
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

              if (scrollYCurrent.value < headerScrollDistance.value) {
                scrollTo(
                  refMap[name],
                  0,
                  headerScrollDistance.value,
                  true,
                  `[${name}] sticky snap up`
                )
              }
            }
          } else {
            isSnapping.value = true
            accDiffClamp.value = withTiming(0, undefined, () => {
              isSnapping.value = false
            })
          }
        }
      } else {
        if (
          scrollYCurrent.value <=
          headerScrollDistance.value * snapThreshold
        ) {
          // snap down
          snappingTo.value = 0
          scrollTo(refMap[name], 0, 0, true, `[${name}] snap down`)
        } else if (scrollYCurrent.value <= headerScrollDistance.value) {
          // snap up
          snappingTo.value = headerScrollDistance.value
          scrollTo(
            refMap[name],
            0,
            headerScrollDistance.value,
            true,
            `[${name}] snap up`
          )
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
          if (IS_IOS) {
            let { y } = event.contentOffset
            // normalize the value so it starts at 0
            y = y + contentInset
            // ios workaround, make sure we don't rest on 0 otherwise we can't pull to refresh
            if (y === 0) {
              scrollTo(refMap[name], 0, 0, false, `[${name}]: ios reset`)
            }
            // handle iOS bouncing
            scrollYCurrent.value = interpolate(
              y,
              [0, clampMax],
              [0, clampMax],
              Extrapolate.CLAMP
            )
          } else {
            const { y } = event.contentOffset
            scrollYCurrent.value = y
          }

          scrollY.value[index.value] = scrollYCurrent.value
          oldAccScrollY.value = accScrollY.value
          accScrollY.value = scrollY.value[index.value] + offset.value

          if (!isSnapping.value && revealHeaderOnScroll) {
            const delta = accScrollY.value - oldAccScrollY.value
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
        // workaround to stop animated scrolls
        scrollTo(
          refMap[name],
          0,
          scrollY.value[tabIndex] + 0.1,
          false,
          `[${name}] stop scroll`
        )

        // ensure the header stops snapping
        cancelAnimation(accDiffClamp)

        isSnapping.value = false
        isDragging.value = true

        if (IS_IOS) cancelAnimation(afterDrag)
      },
      onEndDrag: () => {
        isGliding.value = true
        isDragging.value = false

        if (IS_IOS) {
          // we delay this by one frame so that onMomentumBegin may fire on iOS
          afterDrag.value = withDelay(
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
        if (IS_IOS) {
          cancelAnimation(afterDrag)
        }
      },
      onMomentumEnd,
    },
    [
      refMap,
      name,
      revealHeaderOnScroll,
      containerHeight,
      contentHeights,
      snapThreshold,
      clampMax,
    ]
  )

  // sync unfocused scenes
  useAnimatedReaction(
    () => {
      return (
        !isSnapping.value &&
        !isScrolling.value &&
        !isDragging.value &&
        !isGliding.value
      )
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

          if (revealHeaderOnScroll) {
            const hasGap = accDiffClamp.value > tabScrollY
            if (hasGap || currIsOnTop) {
              nextPosition = accDiffClamp.value
            }
          } else if (typeof snapThreshold === 'number') {
            if (focusedIsOnTop) {
              nextPosition = snappingTo.value
            } else if (currIsOnTop) {
              nextPosition = headerHeight
            }
          } else if (currIsOnTop || focusedIsOnTop) {
            nextPosition = Math.min(focusedScrollY, headerScrollDistance.value)
          }
        }

        if (nextPosition !== null) {
          scrollY.value[tabIndex] = nextPosition
          scrollTo(refMap[name], 0, nextPosition, false, `[${name}] sync pane`)
        }
      }
    },
    [revealHeaderOnScroll, refMap, snapThreshold, tabIndex]
  )

  return scrollHandler
}

type ForwardRefType<T> =
  | ((instance: T | null) => void)
  | MutableRefObject<T | null>
  | null

/**
 * Magic hook that creates a multicast ref. Useful so that we can both capture the ref, and forward it to callers.
 * Accepts a parameter for an outer ref that will also be updated to the same ref
 * @param outerRef the outer ref that needs to be updated
 * @returns an animated ref
 */
export function useSharedAnimatedRef<T extends RefComponent>(
  outerRef: ForwardRefType<T>
) {
  const ref = useAnimatedRef<T>()

  // this executes on every render
  useEffect(() => {
    if (!outerRef) {
      return
    }
    if (typeof outerRef === 'function') {
      outerRef(ref.current)
    } else {
      outerRef.current = ref.current
    }
  })

  return ref
}
