import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated'

import { ScrollView } from './ScrollView'
import { useScroller, useTabNameContext, useTabsContext } from './hooks'

/**
 * Typically used internally, but if you want to mix lazy and regular screens you can wrap the lazy ones with this component.
 */
export const Lazy: React.FC<{
  /**
   * Whether to cancel the lazy fade in animation. Defaults to false.
   */
  cancelLazyFadeIn?: boolean
  /**
   * How long to wait before mounting the children.
   */
  mountDelayMs?: number
  /**
   * Whether to start mounted. Defaults to true if we are the focused tab.
   */
  startMounted?: boolean
  children: React.ReactElement
}> = ({
  children,
  cancelLazyFadeIn,
  startMounted: _startMounted,
  mountDelayMs = 50,
}) => {
  const name = useTabNameContext()
  const { focusedTab, refMap } = useTabsContext()

  /**
   * We keep track of whether a layout has been triggered
   */
  const didTriggerLayout = useSharedValue(false)

  /**
   * This is used to control when children are mounted
   */
  const [canMount, setCanMount] = React.useState(false)
  /**
   * Ensure we don't mount after the component has been unmounted
   */
  const isSelfMounted = React.useRef(true)

  /**
   * We start mounted if we are the focused tab, or if props.startMounted is true.
   */
  const shouldStartMounted =
    typeof _startMounted === 'boolean'
      ? _startMounted
      : focusedTab.value === name
  let initialOpacity = 1
  if (!cancelLazyFadeIn && !shouldStartMounted) {
    initialOpacity = 0
  }
  const opacity = useSharedValue(initialOpacity)

  React.useEffect(() => {
    return () => {
      isSelfMounted.current = false
    }
  }, [])

  const startMountTimer = React.useCallback(
    (focusedTab: string) => {
      // wait the scene to be at least mountDelay ms focused, before mounting
      setTimeout(() => {
        if (focusedTab === name) {
          if (isSelfMounted.current) setCanMount(true)
        }
      }, mountDelayMs)
    },
    [mountDelayMs, name]
  )

  useAnimatedReaction(
    () => {
      return focusedTab.value === name
    },
    (focused, wasFocused) => {
      if (focused && !wasFocused && !canMount) {
        if (cancelLazyFadeIn) {
          opacity.value = 1
          runOnJS(setCanMount)(true)
        } else {
          runOnJS(startMountTimer)(focusedTab.value)
        }
      }
    },
    [canMount, focusedTab]
  )

  const scrollTo = useScroller()

  const ref = name ? refMap[name] : null

  useAnimatedReaction(
    () => {
      return didTriggerLayout.value
    },
    (isMounted, wasMounted) => {
      if (isMounted && !wasMounted) {
        if (!cancelLazyFadeIn && opacity.value !== 1) {
          opacity.value = withTiming(1)
        }
      }
    },
    [ref, cancelLazyFadeIn, name, didTriggerLayout, scrollTo]
  )

  const stylez = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  }, [opacity])

  const onLayout = useCallback(() => {
    didTriggerLayout.value = true
  }, [didTriggerLayout])

  return canMount ? (
    cancelLazyFadeIn ? (
      children
    ) : (
      <Animated.View
        pointerEvents="box-none"
        style={[styles.container, !cancelLazyFadeIn ? stylez : undefined]}
        onLayout={onLayout}
      >
        {children}
      </Animated.View>
    )
  ) : (
    <ScrollView />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
