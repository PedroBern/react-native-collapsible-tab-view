import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useHeaderMeasurements } from 'react-native-collapsible-tab-view'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'

import { useCurrentTabScrollY } from '../../src/hooks'
import ExampleComponent from './Shared/ExampleComponentFlashList'
import ReText from './Shared/ReText'
import { ExampleComponentType } from './types'

const title = 'FlashList (contacts tab)'

const MIN_HEADER_HEIGHT = 48

export const Header = () => {
  const { top, height } = useHeaderMeasurements()
  const scrollY = useCurrentTabScrollY()

  const scrollYText = useDerivedValue(
    () => `Scroll Y is: ${scrollY.value.toFixed(2)}`
  )

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            top.value,
            [0, -(height.value || 0 - MIN_HEADER_HEIGHT)],
            [0, (height.value || 0 - MIN_HEADER_HEIGHT) / 2]
          ),
        },
      ],
    }
  })

  return (
    <View style={[styles.root]}>
      <Animated.View style={[styles.container, stylez]}>
        <ReText style={styles.text} text={scrollYText} />
      </Animated.View>
    </View>
  )
}

const Example: ExampleComponentType = () => {
  return (
    <ExampleComponent
      allowHeaderOverscroll
      renderHeader={() => <Header />}
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
