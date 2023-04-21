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
  startMounted?: boolean
  cancelLazyFadeIn?: boolean
  children: React.ReactElement
}> = ({ children, startMounted, cancelLazyFadeIn }) => {
  const name = useTabNameContext()
  const {
    focusedTab,
    refMap,
    scrollY,
    scrollYCurrent,
    tabNames,
  } = useTabsContext()
  const [canMount, setCanMount] = React.useState(!!startMounted)
  const [afterMount, setAfterMount] = React.useState(!!startMounted)
  const isSelfMounted = React.useRef(true)

  const opacity = useSharedValue(cancelLazyFadeIn || startMounted ? 1 : 0)

  React.useEffect(() => {
    return () => {
      isSelfMounted.current = false
    }
  }, [])

  const allowToMount = React.useCallback(() => {
    // wait the scene to be at least 50 ms focused, before mounting
    setTimeout(() => {
      if (focusedTab.value === name) {
        if (isSelfMounted.current) setCanMount(true)
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

  const scrollTo = useScroller()

  const ref = name ? refMap[name] : null

  useAnimatedReaction(
    () => {
      return afterMount
    },
    (isMounted, wasMounted) => {
      if (isMounted && !wasMounted) {
        const tabIndex = tabNames.value.findIndex((n) => n === name)
        if (ref && tabIndex >= 0) {
          scrollTo(
            ref,
            0,
            typeof scrollY.value[tabIndex] === 'number'
              ? scrollY.value[tabIndex]
              : scrollYCurrent.value,
            false,
            `[${name}] lazy sync`
          )
        }
        if (!cancelLazyFadeIn && opacity.value !== 1)
          opacity.value = withTiming(1)
      }
    },
    [ref, cancelLazyFadeIn, name, afterMount, scrollTo]
  )

  const stylez = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  }, [])

  const onLayout = useCallback(() => {
    setTimeout(() => {
      setAfterMount(true)
    }, 100)
  }, [])

  return canMount ? (
    cancelLazyFadeIn ? (
      children
    ) : (
      <Animated.View
        pointerEvents="box-none"
        style={[styles.container, !cancelLazyFadeIn && stylez]}
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
