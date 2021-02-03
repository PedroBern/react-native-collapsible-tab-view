import {
  createCollapsibleTabs,
  TabBarProps as TabProps,
} from 'react-native-collapsible-tab-view'

export const TabNames = ['albums', 'contacts', 'article'] as const

export type TabNamesType = typeof TabNames[number]
export type HeaderProps = TabProps<TabNamesType>

export type TabBarProps = TabProps<TabNamesType>

const { useTabsContext, ...Tabs } = createCollapsibleTabs(TabNames)

export default Tabs

export { useTabsContext }
