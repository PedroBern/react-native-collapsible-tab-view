import React, { ComponentProps } from 'react'
import {
  FlatList,
  FlatListProps as RNFlatListProps,
  ScrollView,
  SectionList,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Animated from 'react-native-reanimated'

import { TabProps } from './Tab'

export type ContainerRef = FlatList<any>

export type RefComponent =
  | FlatList<any>
  | ScrollView
  | Animated.ScrollView
  | SectionList<any>

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
  /**
   * Reveal header when scrolling down. Implements diffClamp.
   */
  revealHeaderOnScroll?: boolean
  /**
   * Percentage of header height to define as the snap point. A number between
   * 0 and 1, or `null` to disable snapping.
   * @default null
   */
  snapThreshold?: number | null
  children: TabReactElement<TabName>[] | TabReactElement<TabName>
  /**
   * @obsolete use `renderHeader` instead. This property will be removed in 5.0.0
   */
  HeaderComponent?:
    | ((props: TabBarProps<TabName>) => React.ReactElement)
    | React.MemoExoticComponent<
        (props: TabBarProps<TabName>) => React.ReactElement
      >
    | null
  /**
   * @obsolete use `renderTabBar` instead. This property will be removed in 5.0.0
   */
  TabBarComponent?:
    | ((props: TabBarProps<TabName>) => React.ReactElement)
    | React.MemoExoticComponent<
        (props: TabBarProps<TabName>) => React.ReactElement
      >
    | null

  renderHeader?: (props: TabBarProps<TabName>) => React.ReactElement | null

  renderTabBar?: (props: TabBarProps<TabName>) => React.ReactElement | null

  headerContainerStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>
  containerStyle?: StyleProp<ViewStyle>
  cancelTranslation?: boolean
  /**
   * If lazy, will mount the screens only when the tab is visited. There is a
   * default fade in transition.
   */
  lazy?: boolean
  cancelLazyFadeIn?: boolean
  /**
   * Props passed to the horiztontal flatlist. If you want for example to
   * disable swiping, you can pass `{ scrollEnabled: false }`
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
   * Callback fired when the tab changes. It receives the previous and current
   *  index and tabnames.
   */
  onTabChange?: OnTabChangeCallback<TabName>

  /**
   * Custom width of the container. Defaults to the window width.
   */
  width?: number

  /**
   * Whether the header moves down during overscrolling (for example on pull-to-refresh on iOS) or sticks to the top
   *
   * @default false
   */
  allowHeaderOverscroll?: boolean
}

export type ContextType<T extends TabName = TabName> = {
  headerHeight: Animated.SharedValue<number | undefined>
  tabBarHeight: Animated.SharedValue<number | undefined>
  revealHeaderOnScroll: boolean
  snapThreshold: number | null | undefined
  /**
   * Index value, including decimal points. Use this to interpolate tab
   * indicators.
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
   * DiffClamp value. It's the current visible header height if
   * `diffClampEnabled={true}`.
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
  containerHeight: Animated.SharedValue<number | undefined>
  /**
   * Object containing the ref of each scrollable component.
   */
  refMap: Record<TabName, Ref<RefComponent>>
  /**
   * Set the ref of the scrollable component.
   */
  setRef: <TComponent extends RefComponent>(
    key: T,
    ref: React.RefObject<TComponent>
  ) => Ref<TComponent>
  /**
   * Max distance allowed to collapse the header.
   */
  headerScrollDistance: Animated.SharedValue<number>
  /**
   * Previous addScrollY value.
   */
  oldAccScrollY: Animated.SharedValue<number>
  /**
   * Accumulated scroll Y distance. Used to calculate the accDiffClamp value.
   */
  accScrollY: Animated.SharedValue<number>
  /**
   * Offset to take the next scrollY as if it were at the same position of the
   * previous tab.
   */
  offset: Animated.SharedValue<number>
  isScrolling: Animated.SharedValue<number>
  /**
   * Scroll x position of the tabs container.
   */
  scrollX: Animated.SharedValue<number>
  isGliding: Animated.SharedValue<boolean>
  isSnapping: Animated.SharedValue<boolean>
  /**
   * The next snapping value, used only with diffClamp.
   */
  snappingTo: Animated.SharedValue<number>

  /**
   * Height of the scrollable content of each tab. Helps to allow iOS bouncing.
   */
  contentHeights: Animated.SharedValue<number[]>

  contentInset: Animated.SharedValue<number>

  headerTranslateY: Animated.SharedValue<number>

  width: number

  /**
   * Whether the header moves down during overscrolling (for example on pull-to-refresh on iOS) or sticks to the top
   *
   * @default false
   */
  allowHeaderOverscroll?: boolean
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
