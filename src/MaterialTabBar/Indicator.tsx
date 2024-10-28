import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated'

import { IndicatorProps } from './types'
import { isRTL } from '../helpers'

const Indicator: React.FC<IndicatorProps> = ({
  indexDecimal,
  itemsLayout,
  style,
  fadeIn = false,
}) => {
  const opacity = useSharedValue(fadeIn ? 0 : 1)

  const layoutForDirection = isRTL ? itemsLayout.slice().reverse() : itemsLayout

  const stylez = useAnimatedStyle(() => {
    const firstItemX = itemsLayout[0]?.x ?? 0

    const transform = [
      {
        translateX:
          itemsLayout.length > 1
            ? interpolate(
                indexDecimal.value,
                itemsLayout.map((_, i) => i),
                layoutForDirection.map((v) => v.x)
              )
            : firstItemX,
      },
    ]

    const width =
      itemsLayout.length > 1
        ? interpolate(
            indexDecimal.value,
            layoutForDirection.map((_, i) => i),
            layoutForDirection.map((v) => v.width)
          )
        : itemsLayout[0]?.width

    return {
      transform,
      width,
      opacity: withTiming(opacity.value),
    }
  }, [indexDecimal, itemsLayout])

  React.useEffect(() => {
    if (fadeIn) {
      opacity.value = 1
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fadeIn])

  return <Animated.View style={[stylez, styles.indicator, style]} />
}

const styles = StyleSheet.create({
  indicator: {
    height: 2,
    backgroundColor: '#2196f3',
    position: 'absolute',
    bottom: 0,
    left: isRTL ? undefined : 0,
    right: isRTL ? 0 : undefined,
  },
})

export { Indicator }
