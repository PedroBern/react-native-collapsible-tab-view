import {
  LayoutChangeEvent,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import Animated from 'react-native-reanimated'

import { TabBarProps } from '../types'

type AnimatedStyle = StyleProp<Animated.AnimateStyle<ViewStyle>>
type AnimatedTextStyle = StyleProp<Animated.AnimateStyle<TextStyle>>

export type MaterialTabItemProps<T extends string> = {
  name: T
  index: number
  indexDecimal: Animated.SharedValue<number>
  onPress: (index: number, name: T) => void
  onLayout?: (event: LayoutChangeEvent) => void
  scrollEnabled?: boolean
  label: string
  ItemElement?: React.JSXElementConstructor<{
    name: T
    indexDecimal: Animated.SharedValue<number>
  }>
  style?: ViewStyle
  labelStyle?: AnimatedTextStyle
  inactiveOpacity?: number
  pressColor?: string
  pressOpacity?: number
} & Omit<PressableProps, 'onPress' | 'children'>

export type MaterialTabBarProps<N extends string> = TabBarProps<N> & {
  scrollEnabled?: boolean
  indicatorStyle?: AnimatedStyle
  TabItemComponent?: React.JSXElementConstructor<MaterialTabItemProps<N>>
  getLabelText?: (name: N) => string
  tabItemProps?: Omit<
    MaterialTabItemProps<N>,
    'name' | 'indexDecimal' | 'index' | 'label'
  >
}

export type ItemLayout = {
  width: number
  x: number
}

export type IndicatorProps = {
  indexDecimal: Animated.SharedValue<number>
  itemsLayout: ItemLayout[]
  style?: AnimatedStyle
  fadeIn?: boolean
}
