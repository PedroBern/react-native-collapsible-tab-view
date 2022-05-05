import { FlatList, Platform, SectionList, I18nManager } from 'react-native'
import Animated, { scrollTo } from 'react-native-reanimated'

import { Ref, RefComponent } from './types'

/** The time one frame takes at 60 fps (16 ms) */
export const ONE_FRAME_MS = 16

/** check if app is in RTL mode or not */
export const { isRTL } = I18nManager

export const IS_IOS = Platform.OS === 'ios'

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

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

  scrollTo(ref, x, y, animated)
}
