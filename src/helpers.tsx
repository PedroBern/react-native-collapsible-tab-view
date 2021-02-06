import { FlatList } from 'react-native'
import Animated, { scrollTo } from 'react-native-reanimated'

import { Ref, RefComponent } from './types'

/** The time one frame takes at 60 fps (16 ms) */
export const ONE_FRAME_MS = 16

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export function scrollToImpl<T extends RefComponent>(
  ref: Ref<T> | undefined,
  x: number,
  y: number,
  animated: boolean
): void {
  'worklet'
  if (!ref) return
  //@ts-expect-error: reanimated typescript types do not accept FlatList for `scrollTo`, but it does work
  scrollTo(ref, x, y, animated)
}
