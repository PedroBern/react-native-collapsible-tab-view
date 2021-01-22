import {
  createCollapsibleTabs,
  TabBarProps as TabProps,
} from 'react-native-collapsible-tab-view'

export type TabNames = 'albums' | 'contacts' | 'article'

export type HeaderProps = TabProps<TabNames>

export type TabBarProps = TabProps<TabNames>

const { useTabsContext, ...Tabs } = createCollapsibleTabs<TabNames>()

export default Tabs

export { useTabsContext }
