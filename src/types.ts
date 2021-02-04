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
  /**
   * Is optional, but will optimize the first render.
   */
  headerHeight?: number
  /**
   * Is optional, but will optimize the first render.
   */
  tabBarHeight?: number
  /**
   * Header minimum height when collapsed
   */
  minHeaderHeight?: number
  snapEnabled?: boolean
  diffClampEnabled?: boolean
  /**
   * Percentage of header height to make the snap effect. A number between 0 and 1.
   */
  snapThreshold?: number
  children: React.ReactElement[] | React.ReactElement
  HeaderComponent?: (props: TabBarProps<T>) => React.ReactElement
  TabBarComponent?: (props: TabBarProps<T>) => React.ReactElement
  refMap: Record<T, Ref>
  headerContainerStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>
  containerStyle?: StyleProp<ViewStyle>
  cancelTranslation?: boolean
  /**
   * If lazy, will mount the screens only when the tab is visited. There is a default fade in transition.
   */
  lazy?: boolean
  cancelLazyFadeIn?: boolean
  /**
   * Props passed to the horiztontal flatlist. If you want for example to disable swiping, you can pass `{ scrollEnabled: false }`
   */
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
  /**
   * Callback fired when the index changes. It receives the previous and current index and tabnames.
   */
  onIndexChange?: OnTabChangeCallback<T>
}

export type ContextType<T extends ParamList> = {
  headerHeight: number
  headerScrollDistance: Animated.SharedValue<number>
  tabBarHeight: number
  snapEnabled: boolean
  diffClampEnabled: boolean
  snapThreshold: number
  refMap: Record<T, Ref>
  /**
   * Scroll position of current tab.
   */
  scrollYCurrent: Animated.SharedValue<number>
  /**
   * Tab names, same as the keys of `refMap`.
   */
  tabNames: Animated.SharedValue<T[]>
  index: Animated.SharedValue<number>
  scrollY: Animated.SharedValue<number[]>
  oldAccScrollY: Animated.SharedValue<number>
  accScrollY: Animated.SharedValue<number>
  offset: Animated.SharedValue<number>
  isScrolling: Animated.SharedValue<number>
  /**
   * Name of the current focused tab.
   */
  focusedTab: Animated.SharedValue<T>
  accDiffClamp: Animated.SharedValue<number>
  containerHeight?: number
  /**
   * Scroll x position of the tabs container.
   */
  scrollX: Animated.SharedValue<number>
  indexDecimal: Animated.SharedValue<number>
  isGliding: Animated.SharedValue<boolean>
  isSnapping: Animated.SharedValue<boolean>
  /**
   * Used internally.
   */
  snappingTo: Animated.SharedValue<number>
  /**
   * Used internally.
   */
  endDrag: Animated.SharedValue<number>
}

export type ScrollViewProps = ComponentProps<typeof Animated.ScrollView>

export type FlatListProps<R extends any> = Omit<
  ComponentProps<typeof FlatList>,
  'renderItem'
> & {
  renderItem: ListRenderItem<R>
}

export type CollapsibleStyle = {
  style: { width: number }
  contentContainerStyle: {
    minHeight: number
    paddingTop: number
  }
  progressViewOffset: number
}
