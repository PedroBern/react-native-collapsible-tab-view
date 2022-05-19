import { Container } from './Container'
import { FlatList } from './FlatList'
import { Lazy } from './Lazy'
import { MaterialTabBarProps, MaterialTabItemProps } from './MaterialTabBar'
import { ScrollView } from './ScrollView'
import { SectionList } from './SectionList'
import { Tab, TabItemProps, TabProps } from './Tab'
import {
  TabBarProps,
  CollapsibleProps,
  RefComponent,
  ContainerRef,
  CollapsibleRef,
  OnTabChangeCallback,
} from './types'

export type {
  TabBarProps,
  CollapsibleProps,
  RefComponent,
  ContainerRef,
  MaterialTabBarProps,
  MaterialTabItemProps,
  CollapsibleRef,
  OnTabChangeCallback,
  TabItemProps,
  TabProps
}

export const Tabs = {
  Container,
  Tab,
  Lazy,
  FlatList,
  ScrollView,
  SectionList,
}

export { Container, Tab, Lazy, FlatList, ScrollView, SectionList }
export {
  useHeaderMeasurements,
  useFocusedTab,
  useAnimatedTabIndex,
  useCollapsibleStyle,
} from './hooks'
export { MaterialTabBar } from './MaterialTabBar/TabBar'
export { MaterialTabItem } from './MaterialTabBar/TabItem'
