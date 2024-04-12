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

  const stylez = useAnimatedStyle(() => {
    const transform = [
      {
        translateX:
          itemsLayout.length > 1
            ? interpolate(
                indexDecimal.value,
                itemsLayout.map((_, i) => i),
                // when in RTL mode, the X value should be inverted
                itemsLayout.map((v) => (isRTL ? -1 * v.x : v.x))
              )
            : isRTL
              ? -1 * itemsLayout[0]?.x
              : itemsLayout[0]?.x,
      },
    ]

    const width =
      itemsLayout.length > 1
        ? interpolate(
            indexDecimal.value,
            itemsLayout.map((_, i) => i),
            itemsLayout.map((v) => v.width)
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
  },
})

export { Indicator }
