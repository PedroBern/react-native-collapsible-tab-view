import { FlatList, Platform } from 'react-native'
import Animated, { scrollTo } from 'react-native-reanimated'

import { Ref, RefComponent } from './types'

/** The time one frame takes at 60 fps (16 ms) */
export const ONE_FRAME_MS = 16

export const IS_IOS = Platform.OS === 'ios'

/**
 * It seems that if the vertical scroll views are at position 0 on ios
 * the horizontal pane switcher will catch the scroll event and not forward
 * this breaks pull to refresh, so we ensure we're 1 pixel scrolled at all times
 */
export const PADDING_WORKAROUND_IOS = IS_IOS ? 1 : 0

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export function scrollToImpl<T extends RefComponent>(
  ref: Ref<T> | undefined,
  x: number,
  y: number,
  animated: boolean
): void {
  'worklet'
  if (!ref) return
  // ensure we don't scroll on NaN
  if (!Number.isFinite(x) || !Number.isFinite(y)) return

  //@ts-expect-error: reanimated typescript types do not accept FlatList for `scrollTo`, but it does work
  scrollTo(ref, x, y + PADDING_WORKAROUND_IOS, animated)
}
