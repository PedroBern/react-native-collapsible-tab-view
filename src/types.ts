import React, { ComponentProps } from 'react'
import {
  FlatList,
  ScrollView,
  ListRenderItem,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Animated from 'react-native-reanimated'

export type ContainerRef = FlatList<any>

export type RefComponent = FlatList<any> | ScrollView

export type Ref = React.RefObject<RefComponent>

export type TabBarProps<T extends string> = {
  scrollX: Animated.SharedValue<number>
  focusedTab: Animated.SharedValue<T>
  refMap: Record<T, Ref>
  index: Animated.SharedValue<number>
  containerRef: React.RefObject<ContainerRef>
}

export type Props<T extends string> = {
  containerRef: React.RefObject<ContainerRef>
  headerHeight?: number
  tabBarHeight?: number
  snapEnabled?: boolean
  diffClampEnabled?: boolean
  snapThreshold?: number
  children: React.ReactElement[]
  HeaderComponent?: React.JSXElementConstructor<TabBarProps<T>>
  TabBarComponent?: React.JSXElementConstructor<TabBarProps<T>>
  refMap: Record<T, Ref>
  headerContainerStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>
  containerStyle?: ViewStyle
  cancelTranslation?: boolean
}

export type ContextType<T extends string> = {
  headerHeight: number
  tabBarHeight: number
  snapEnabled: boolean
  diffClampEnabled: boolean
  snapThreshold: number
  refMap: Record<T, Ref>
  scrollYCurrent: Animated.SharedValue<number>
  tabNames: Animated.SharedValue<T[]>
  index: Animated.SharedValue<number>
  scrollY: Animated.SharedValue<number[]>
  oldAccScrollY: Animated.SharedValue<number>
  accScrollY: Animated.SharedValue<number>
  offset: Animated.SharedValue<number>
  isScrolling: Animated.SharedValue<boolean | number>
  focusedTab: Animated.SharedValue<T>
  accDiffClamp: Animated.SharedValue<number>
  containerHeight?: number
  scrollX: Animated.SharedValue<number>
}

export type TabProps<T extends string> = {
  name: T
}

export type ScrollViewProps<T extends string> = ComponentProps<
  typeof Animated.ScrollView
> &
  TabProps<T>

export type FlatListProps<R extends any, T extends string> = Omit<
  ComponentProps<typeof FlatList>,
  'renderItem'
> &
  TabProps<T> & {
    renderItem: ListRenderItem<R>
  }
