import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { useHeaderMeasurements } from 'react-native-collapsible-tab-view'
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

import ExampleComponent from './Shared/ExampleComponent'
import { ExampleComponentType } from './types'

const title = 'Animated Header'

const MIN_HEADER_HEIGHT = 48

export const Header = () => {
  const { top, height } = useHeaderMeasurements()

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            top.value,
            [0, -(height - MIN_HEADER_HEIGHT)],
            [0, (height - MIN_HEADER_HEIGHT) / 2]
          ),
        },
      ],
    }
  })

  return (
    <View style={[styles.root]}>
      <Animated.View style={[styles.container, stylez]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  )
}

const Example: ExampleComponentType = () => {
  return (
    <ExampleComponent
      renderHeaderComponent={Header}
      minHeaderHeight={MIN_HEADER_HEIGHT}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    height: 250,
  },
  container: {
    height: MIN_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    position: 'absolute',
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
})

Example.title = title

export default Example
