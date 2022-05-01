import React from 'react'
import { StyleSheet } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  withDecay,
  useAnimatedReaction,
} from 'react-native-reanimated'

import { scrollToImpl } from './helpers'
import { useTabsContext } from './hooks'
import { CollapsibleProps } from './types'

type TabBarContainerProps = Pick<
  CollapsibleProps,
  'headerContainerStyle' | 'cancelTranslation'
>

export const TopContainer: React.FC<TabBarContainerProps> = ({
  children,
  headerContainerStyle,
  cancelTranslation,
}) => {
  const {
    headerTranslateY,
    revealHeaderOnScroll,
    isSlidingTopContainer,
    scrollYCurrent,
    headerHeight,
    contentInset,
    refMap,
    tabNames,
    index,
  } = useTabsContext()

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: headerTranslateY.value,
        },
      ],
    }
  }, [revealHeaderOnScroll])

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startY: number }
  >({
    onActive: (event, ctx) => {
      if (!isSlidingTopContainer.value) {
        ctx.startY = scrollYCurrent.value
        isSlidingTopContainer.value = true

        return
      }

      scrollYCurrent.value = interpolate(
        -event.translationY + ctx.startY,
        [0, headerHeight.value!],
        [0, headerHeight.value!],
        Extrapolate.CLAMP
      )
    },
    onEnd: (evt, ctx) => {
      if (!isSlidingTopContainer.value) return

      ctx.startY = 0
      scrollYCurrent.value = withDecay(
        {
          velocity: -evt.velocityY,
          clamp: [0, headerHeight.value!],
        },
        () => {
          isSlidingTopContainer.value = false
        }
      )
    },
  })

  useAnimatedReaction(
    () => scrollYCurrent.value - contentInset.value,
    (nextPosition, previousPosition) => {
      if (nextPosition !== previousPosition && isSlidingTopContainer.value) {
        scrollToImpl(
          refMap[tabNames.value[index.value]],
          0,
          scrollYCurrent.value - contentInset.value,
          false
        )
      }
    }
  )

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.container,
          headerContainerStyle,
          !cancelTranslation && animatedStyles,
        ]}
      >
        {children}
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
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
})
