import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
  useDerivedValue,
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
  const { focusedTab, refMap, scrollY, tabNames } = useTabsContext()
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
        // we need to wait for the children rendering to complete so that we can scroll properly
        setTimeout(() => {
          if (isSelfMounted.current) setAfterMount(true)
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

  const scrollTo = useScroller()

  const ref = name ? refMap[name] : null

  useDerivedValue(() => {
    if (afterMount) {
      const tabIndex = tabNames.value.findIndex((n) => n === name)
      if (ref && tabIndex >= 0) {
        scrollTo(ref, 0, scrollY.value[tabIndex], false, `[${name}] lazy sync`)
      }
      if (!cancelLazyFadeIn && opacity.value !== 1)
        opacity.value = withTiming(1)
    }
  }, [ref, cancelLazyFadeIn, opacity, name, afterMount, tabNames, scrollTo])

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
