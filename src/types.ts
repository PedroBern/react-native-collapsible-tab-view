import React, { ComponentProps } from 'react'
import {
  FlatList,
  FlatListProps as RNFlatListProps,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Animated from 'react-native-reanimated'

import { TabProps } from './Tab'

export type ContainerRef = FlatList<any>

export type RefComponent = FlatList<any> | ScrollView | Animated.ScrollView

export type Ref<T extends RefComponent> = React.RefObject<T>

export type TabName = string | number

export type RefHandler<T extends TabName = TabName> = {
  jumpToTab: (name: T) => boolean
  setIndex: (index: number) => boolean
  getFocusedTab: () => T
  getCurrentIndex: () => number
}

export type CollapsibleRef<T extends TabName = TabName> =
  | RefHandler<T>
  | undefined

export type TabBarProps<T extends TabName = TabName> = {
  indexDecimal: Animated.SharedValue<number>
  focusedTab: Animated.SharedValue<T>
  tabNames: T[]
  index: Animated.SharedValue<number>
  containerRef: React.RefObject<ContainerRef>
  onTabPress: (name: T) => void
  tabProps: TabsWithProps<T>
}

export type IndexChangeEventData<T extends TabName = TabName> = {
  prevIndex: number
  index: number
  prevTabName: T
  tabName: T
}

export type OnTabChangeCallback<T extends TabName = TabName> = (
  data: IndexChangeEventData<T>
) => void

export type TabReactElement<T extends TabName = TabName> = React.ReactElement<
  TabProps<T>
>

export type CollapsibleProps = {
  initialTabName?: TabName
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

  headerStickyness?: 'disabled' | 'reveal-on-scroll'
  /**
   * Percentage of header height to define as the snap point. A number between 0 and 1, or `null` to disable snapping.
   * @default null
   */
  snapThreshold?: number | null
  children: TabReactElement<TabName>[] | TabReactElement<TabName>
  HeaderComponent?: (props: TabBarProps<TabName>) => React.ReactElement | null
  TabBarComponent?: (props: TabBarProps<TabName>) => React.ReactElement | null
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
   * Callback fired when the index changes. It receives the current index.
   */
  onIndexChange?: (index: number) => void

  /**
   * Callback fired when the tab changes. It receives the previous and current index and tabnames.
   */
  onTabChange?: OnTabChangeCallback<TabName>
}

export type ContextType<T extends TabName = TabName> = {
  headerHeight: number
  tabBarHeight: number
  diffClampEnabled: boolean
  snapThreshold: number | null | undefined
  /**
   * Index value, including decimal points. Use this to interpolate tab indicators.
   */
  indexDecimal: Animated.SharedValue<number>
  /**
   * Tab names, same as the keys of `refMap`.
   */
  tabNames: Animated.SharedValue<T[]>
  /**
   * Current index of the pager.
   */
  index: Animated.SharedValue<number>
  /**
   * Name of the current focused tab.
   */
  focusedTab: Animated.SharedValue<T>
  /**
   * DiffClamp value. It's the current visible header height if `diffClampEnabled={true}`.
   */
  accDiffClamp: Animated.SharedValue<number>
  /**
   * Scroll position of current tab.
   */
  scrollYCurrent: Animated.SharedValue<number>
  /**
   * Array of the scroll y position of each tab.
   */
  scrollY: Animated.SharedValue<number[]>
  containerHeight?: number
  /**
   * Object containing the ref of each scrollable component.
   */
  refMap: Record<TabName, Ref<RefComponent>>
  _setRef: <TComponent extends RefComponent>(
    key: T,
    ref: React.RefObject<TComponent>
  ) => Ref<TComponent>
  _headerScrollDistance: Animated.SharedValue<number>
  _oldAccScrollY: Animated.SharedValue<number>
  _accScrollY: Animated.SharedValue<number>
  _offset: Animated.SharedValue<number>
  _isScrolling: Animated.SharedValue<number>
  /**
   * Scroll x position of the tabs container.
   */
  _scrollX: Animated.SharedValue<number>
  _isGliding: Animated.SharedValue<boolean>
  _isSnapping: Animated.SharedValue<boolean>
  _snappingTo: Animated.SharedValue<number>
  _endDrag: Animated.SharedValue<number>
  _contentHeights: Record<string, number>
  _setContentHeights: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >
}

export type ScrollViewProps = ComponentProps<typeof Animated.ScrollView>

export type CollapsibleStyle = {
  style: { width: number }
  contentContainerStyle: {
    minHeight: number
    paddingTop: number
  }
  progressViewOffset: number
}

export type TabsWithProps<T extends TabName = TabName> = Map<
  T,
  Omit<TabProps<T>, 'children'> & { index: number }
>
