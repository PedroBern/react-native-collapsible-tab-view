import {
  LayoutChangeEvent,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import Animated from 'react-native-reanimated'

import { TabBarProps, TabName } from '../types'

type AnimatedStyle = StyleProp<Animated.AnimateStyle<ViewStyle>>
type AnimatedTextStyle = StyleProp<Animated.AnimateStyle<TextStyle>>

export type MaterialTabItemProps<T extends TabName> = {
  name: T
  index: number
  indexDecimal: Animated.SharedValue<number>
  onPress: (name: T) => void
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

export type MaterialTabBarProps<N extends TabName> = TabBarProps<N> & {
  scrollEnabled?: boolean
  indicatorStyle?: AnimatedStyle
  TabItemComponent?: (props: MaterialTabItemProps<N>) => React.ReactElement
  getLabelText?: (name: N) => string
  style?: StyleProp<ViewStyle>
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
