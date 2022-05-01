import React from 'react'
import { LayoutChangeEvent, StyleSheet } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  withDecay,
} from 'react-native-reanimated'

import { useTabsContext } from './hooks'
import { CollapsibleProps, TabBarProps, TabName } from './types'

type HeaderContainerProps<T extends TabName = TabName> = Pick<
  CollapsibleProps,
  'renderHeader'
> &
  Pick<TabBarProps<T>, 'containerRef' | 'onTabPress' | 'tabProps'> & {
    tabNamesArray: TabName[]
  }

export const HeaderContainer: React.FC<HeaderContainerProps> = ({
  renderHeader,
  containerRef,
  tabNamesArray,
  onTabPress,
  tabProps,
}) => {
  const {
    isSlidingHeader,
    scrollYCurrent,
    headerHeight,
    focusedTab,
    index,
    indexDecimal,
  } = useTabsContext()

  const getHeaderHeight = React.useCallback(
    (event: LayoutChangeEvent) => {
      const height = event.nativeEvent.layout.height
      if (headerHeight.value !== height) {
        headerHeight.value = height
      }
    },
    [headerHeight]
  )

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startY: number }
  >({
    onActive: (event, ctx) => {
      if (!isSlidingHeader.value) {
        ctx.startY = scrollYCurrent.value
        isSlidingHeader.value = true

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
      if (!isSlidingHeader.value) return

      ctx.startY = 0
      scrollYCurrent.value = withDecay(
        {
          velocity: -evt.velocityY,
          clamp: [0, headerHeight.value!],
        },
        () => {
          isSlidingHeader.value = false
        }
      )
    },
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[styles.container]}
        onLayout={getHeaderHeight}
        pointerEvents="box-none"
      >
        {renderHeader &&
          renderHeader({
            containerRef,
            index,
            tabNames: tabNamesArray,
            focusedTab,
            indexDecimal,
            onTabPress,
            tabProps,
          })}
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    flex: 1,
  },
})
