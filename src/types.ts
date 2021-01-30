import React, { ComponentProps } from 'react'
import {
  FlatList,
  ScrollView,
  ListRenderItem,
  StyleProp,
  ViewStyle,
  FlatListProps as RNFlatListProps,
} from 'react-native'
import Animated from 'react-native-reanimated'

export type ContainerRef = FlatList<any>

export type RefComponent = FlatList<any> | ScrollView

export type Ref = React.RefObject<RefComponent>

export type ParamList = string | number | symbol

export type RefHandler<T extends ParamList> = {
  jumpToTab: (name: T) => boolean
  setIndex: (index: number) => boolean
  getFocusedTab: () => T
  getCurrentIndex: () => number
}

export type CollapsibleRef<T extends ParamList> = RefHandler<T> | undefined

export type TabBarProps<T extends ParamList> = {
  indexDecimal: Animated.SharedValue<number>
  focusedTab: Animated.SharedValue<T>
  refMap: Record<T, Ref>
  index: Animated.SharedValue<number>
  containerRef: React.RefObject<ContainerRef>
  onTabPress: (name: T) => void
}

export type OnTabChangeCallback<T extends ParamList> = (data: {
  prevIndex: number
  index: number
  prevTabName: T
  tabName: T
}) => void

export type CollapsibleProps<T extends ParamList> = {
  initialTabName?: T
  containerRef: React.RefObject<ContainerRef>
  headerHeight?: number
  tabBarHeight?: number
  snapEnabled?: boolean
  diffClampEnabled?: boolean
  snapThreshold?: number
  children: React.ReactElement[] | React.ReactElement
  HeaderComponent?: (props: TabBarProps<T>) => React.ReactElement
  TabBarComponent?: (props: TabBarProps<T>) => React.ReactElement
  refMap: Record<T, Ref>
  headerContainerStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>
  containerStyle?: StyleProp<ViewStyle>
  cancelTranslation?: boolean
  lazy?: boolean
  cancelLazyFadeIn?: boolean
  pagerProps?: Omit<
    RNFlatListProps<number>,
    | 'data'
    | 'keyExtractor'
    | 'renderItem'
    | 'horizontal'
    | 'pagingEnabled'
    | 'onScroll'
    | 'showsHorizontalScrollIndicator'
    | 'getItemLayout'
  >
  onIndexChange?: OnTabChangeCallback<T>
}

export type ContextType<T extends ParamList> = {
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
  isScrolling: Animated.SharedValue<boolean>
  focusedTab: Animated.SharedValue<T>
  accDiffClamp: Animated.SharedValue<number>
  containerHeight?: number
  scrollX: Animated.SharedValue<number>
  indexDecimal: Animated.SharedValue<number>
  isGliding: Animated.SharedValue<boolean>
  isSnapping: Animated.SharedValue<boolean>
  snappingTo: Animated.SharedValue<number>
  endDrag: Animated.SharedValue<number>
}

export type ScrollViewProps = ComponentProps<typeof Animated.ScrollView>

export type FlatListProps<R extends any> = Omit<
  ComponentProps<typeof FlatList>,
  'renderItem'
> & {
  renderItem: ListRenderItem<R>
}
