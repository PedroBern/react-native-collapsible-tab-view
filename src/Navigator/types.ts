import {
  DefaultNavigatorOptions,
  TabRouterOptions,
} from '@react-navigation/native'

import { CollapsibleProps, ParamList } from '../types'

export type TabOptionsContext<T extends ParamList> = Record<
  T,
  TabNavigationOptions
>

// Supported screen options
export type TabNavigationOptions = {
  tabBarLabel?: string
}

// Map of event name and the type of data (in event.data)
export type TabNavigationEventMap = {
  tabPress: {
    data: { index: number; prevIndex: number }
  }
}

// The props accepted by the component is a combination of 3 things
export type NavigatorProps<
  T extends ParamList
> = DefaultNavigatorOptions<TabNavigationOptions> &
  TabRouterOptions &
  // Omit<TabRouterOptions, 'backBehavior'> &
  Omit<CollapsibleProps<T>, 'initialTabName' | 'children'> // Props accepted by the view
