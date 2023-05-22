import { Container } from './Container'
import { FlashList } from './FlashList'
import { FlatList } from './FlatList'
import { Lazy } from './Lazy'
import {
  MaterialTabBarProps,
  MaterialTabItemProps,
  IndicatorProps,
} from './MaterialTabBar'
import { ScrollView } from './ScrollView'
import { SectionList } from './SectionList'
import { Tab } from './Tab'
import {
  TabBarProps,
  CollapsibleProps,
  RefComponent,
  ContainerRef,
  CollapsibleRef,
  OnTabChangeCallback,
  TabItemProps,
  TabProps,
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
  TabProps,
  IndicatorProps,
}

export const Tabs = {
  Container,
  Tab,
  Lazy,
  FlatList,
  ScrollView,
  SectionList,
  FlashList,
}

export { Container, Tab, Lazy, FlatList, ScrollView, SectionList, FlashList }
export {
  useCurrentTabScrollY,
  useHeaderMeasurements,
  useFocusedTab,
  useAnimatedTabIndex,
  useCollapsibleStyle,
} from './hooks'
export type { HeaderMeasurements } from './hooks'

export { MaterialTabBar } from './MaterialTabBar/TabBar'
export { MaterialTabItem } from './MaterialTabBar/TabItem'
