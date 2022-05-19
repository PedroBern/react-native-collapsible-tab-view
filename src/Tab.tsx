import React from 'react'
import Animated from 'react-native-reanimated'

import { TabName } from './types'

export type TabItemProps<T extends TabName> = {
  name: T
  index: number
  indexDecimal: Animated.SharedValue<number>

  label: string | ((props: TabItemProps<T>) => React.ReactNode)
}

export type TabProps<T extends TabName> = {
  readonly name: T
  label?: TabItemProps<T>['label']
  children: React.ReactNode
}

/**
 * Wrap your screens with `Tabs.Tab`. Basic usage looks like this:
 *
 * ```tsx
 * <Tabs.Container ...>
 *  <Tabs.Tab name="A" label="First Tab">
 *   <ScreenA />
 *  </Tabs.Tab>
 *  <Tabs.Tab name="B">
 *   <ScreenA />
 *  </Tabs.Tab>
 * </Tabs.Container>
 * ```
 */
export function Tab<T extends TabName>({ children }: TabProps<T>) {
  return <>{children}</>
}
