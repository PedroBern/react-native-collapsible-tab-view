import React from 'react'
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

  //@ts-expect-error: reanimated typescript types do not accept FlatList for `scrollTo`, but it does work
  scrollTo(ref, x, y, animated)
}

export function makeRenderFunction<T>(
  ComponentOrMemo:
    | ((props: T) => React.ReactElement)
    | React.MemoExoticComponent<(props: T) => React.ReactElement>
    | undefined
    | null
) {
  return typeof ComponentOrMemo === 'function'
    ? ComponentOrMemo
    : ComponentOrMemo && typeof ComponentOrMemo === 'object'
    ? (props: any) => <ComponentOrMemo {...props} />
    : undefined
}
