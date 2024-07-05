import React, { ComponentProps } from 'react'
import {
  FlatList,
  ScrollView,
  SectionList,
  StyleProp,
  ViewStyle,
} from 'react-native'
import PagerView, { PagerViewProps } from 'react-native-pager-view'
import Animated, {
  AnimatedRef,
  SharedValue,
  AnimatedStyle,
} from 'react-native-reanimated'

export type ContainerRef = PagerView

export type RefComponent =
  | FlatList<any>
  | ScrollView
  | Animated.ScrollView
  | SectionList<any>

export type Ref<T extends RefComponent> = React.RefObject<T>

export type TabName = string

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
  indexDecimal: SharedValue<number>
  focusedTab: SharedValue<T>
  tabNames: T[]
  index: SharedValue<number>
  containerRef: React.RefObject<ContainerRef>
  onTabPress: (name: T) => void
  tabProps: TabsWithProps<T>

  /**
   * Custom width of the tabbar. Defaults to the window width.
   */
  width?: number
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
> | null

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

  renderHeader?: (props: TabBarProps<TabName>) => React.ReactElement | null

  renderTabBar?: (props: TabBarProps<TabName>) => React.ReactElement | null

  headerContainerStyle?: StyleProp<AnimatedStyle<ViewStyle>>
  containerStyle?: StyleProp<ViewStyle>
  cancelTranslation?: boolean
  /**
   * If lazy, will mount the screens only when the tab is visited. There is a
   * default fade in transition.
   */
  lazy?: boolean
  cancelLazyFadeIn?: boolean
  /**
   * Props passed to the pager. If you want for example to
   * disable swiping, you can pass `{ scrollEnabled: false }`
   */
  pagerProps?: Omit<PagerViewProps, 'onPageScroll' | 'initialPage'>
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
  headerHeight: number
  tabBarHeight: number
  containerHeight: number
  revealHeaderOnScroll: boolean
  snapThreshold: number | null | undefined
  /**
   * Index value, including decimal points. Use this to interpolate tab
   * indicators.
   */
  indexDecimal: SharedValue<number>
  /**
   * Tab names, same as the keys of `refMap`.
   */
  tabNames: SharedValue<T[]>
  /**
   * Current index of the pager.
   */
  index: SharedValue<number>
  /**
   * Name of the current focused tab.
   */
  focusedTab: SharedValue<T>
  /**
   * DiffClamp value. It's the current visible header height if
   * `diffClampEnabled={true}`.
   */
  accDiffClamp: SharedValue<number>
  /**
   * Scroll position of current tab.
   */
  scrollYCurrent: SharedValue<number>
  /**
   * Array of the scroll y position of each tab.
   */
  scrollY: SharedValue<Record<string, number>>
  /**
   * Object containing the ref of each scrollable component.
   */
  refMap: Record<TabName, AnimatedRef<RefComponent>>
  /**
   * Set the ref of the scrollable component.
   */
  setRef: <T extends RefComponent>(
    key: TabName,
    ref: AnimatedRef<T>
  ) => AnimatedRef<T>
  /**
   * Max distance allowed to collapse the header.
   */
  headerScrollDistance: SharedValue<number>
  /**
   * Previous addScrollY value.
   */
  oldAccScrollY: SharedValue<number>
  /**
   * Accumulated scroll Y distance. Used to calculate the accDiffClamp value.
   */
  accScrollY: SharedValue<number>
  /**
   * Offset to take the next scrollY as if it were at the same position of the
   * previous tab.
   */
  offset: SharedValue<number>

  /**
   * The next snapping value.
   */
  snappingTo: SharedValue<number>

  /**
   * Height of the scrollable content of each tab. Helps to allow iOS bouncing.
   */
  contentHeights: SharedValue<number[]>

  contentInset: number

  headerTranslateY: SharedValue<number>

  width: number

  /**
   * Whether the header moves down during overscrolling (for example on pull-to-refresh on iOS) or sticks to the top
   *
   * @default false
   */
  allowHeaderOverscroll?: boolean

  minHeaderHeight: number
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

export type TabItemProps<T extends TabName> = {
  name: T
  index: number
  indexDecimal: SharedValue<number>

  label: string | ((props: TabItemProps<T>) => React.ReactNode)
}

export type TabProps<T extends TabName> = {
  readonly name: T
  label?: TabItemProps<T>['label']
  children: React.ReactNode
}
