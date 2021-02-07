import {
  useMemo,
  Children,
  useState,
  useCallback,
  useContext,
  MutableRefObject,
  useEffect,
} from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { ContainerRef, RefComponent } from 'react-native-collapsible-tab-view'
import {
  cancelAnimation,
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useDeepCompareMemo } from 'use-deep-compare'

import { Context, TabNameContext } from './Context'
import { ONE_FRAME_MS, scrollToImpl } from './helpers'
import {
  CollapsibleStyle,
  ContextType,
  Ref,
  TabName,
  TabReactElement,
  TabsWithProps,
} from './types'

export function useContainerRef() {
  return useAnimatedRef<ContainerRef>()
}

export function useAnimatedDynamicRefs(): [
  Record<TabName, Ref<RefComponent>>,
  <T extends RefComponent>(key: TabName, ref: React.RefObject<T>) => Ref<T>
] {
  const [map, setMap] = useState<Record<TabName, Ref<RefComponent>>>({})
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
 * Access the parent tab screen fron any deep component.
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
      minHeight: (containerHeight || 0) + headerHeight,
      paddingTop: headerHeight + tabBarHeight,
    },
    progressViewOffset: headerHeight + tabBarHeight,
  }
}

export function useUpdateScrollViewContentSize({
  setContentHeights,
  name,
}: {
  name: TabName
  setContentHeights: ContextType['_setContentHeights']
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

export const useScrollHandlerY = (name: TabName) => {
  const {
    accDiffClamp,
    focusedTab,
    snapEnabled,
    snapThreshold,
    diffClampEnabled,
    refMap,
    tabNames,
    index,
    headerHeight,
    containerHeight,
    scrollYCurrent,
    scrollY,
    _isScrolling: isScrolling,
    _oldAccScrollY: oldAccScrollY,
    _accScrollY: accScrollY,
    _offset: offset,
    _headerScrollDistance: headerScrollDistance,
    _isGliding: isGliding,
    _isSnapping: isSnapping,
    _snappingTo: snappingTo,
    _endDrag: endDrag,
    _contentHeights: contentHeights,
  } = useTabsContext()

  const [tabIndex] = useState(tabNames.value.findIndex((n) => n === name))

  const onMomentumEnd = () => {
    'worklet'
    if (snapEnabled) {
      if (diffClampEnabled && accDiffClamp.value > 0) {
        if (scrollYCurrent.value > headerScrollDistance.value * snapThreshold) {
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
              scrollToImpl(refMap[name], 0, headerScrollDistance.value, true)
            }
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
          scrollToImpl(refMap[name], 0, 0, true)
        } else if (scrollYCurrent.value <= headerScrollDistance.value) {
          // snap up
          snappingTo.value = headerScrollDistance.value
          scrollToImpl(refMap[name], 0, headerScrollDistance.value, true)
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
          let contentHeight = contentHeights[name]
          if (contentHeight == null) {
            console.log(
              `contentHeight for tab ${name} was undefined. This may be a bug with reanimated. Please open an issue if you see this error`
            )
            // try not to fail
            contentHeight = Number.MAX_VALUE
          }
          scrollYCurrent.value = interpolate(
            y,
            [0, contentHeight - (containerHeight || 0)],
            [0, contentHeight - (containerHeight || 0)],
            Extrapolate.CLAMP
          )

          scrollY.value[index.value] = scrollYCurrent.value
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
        cancelAnimation(accDiffClamp)
        isSnapping.value = false
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
    [
      refMap,
      name,
      diffClampEnabled,
      snapEnabled,
      containerHeight,
      contentHeights,
    ]
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
            nextPosition = Math.min(focusedScrollY, headerScrollDistance.value)
          }
        }

        if (nextPosition !== null) {
          scrollY.value[tabIndex] = nextPosition
          scrollToImpl(refMap[name], 0, nextPosition, false)
        }
      }
    },
    [diffClampEnabled, refMap, snapEnabled]
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
