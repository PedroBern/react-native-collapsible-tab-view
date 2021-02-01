import { createCollapsibleNavigator } from 'react-native-collapsible-tab-view'

export type Params = {
  article: undefined
  albums: undefined
  contacts: undefined
}

const Tabs = createCollapsibleNavigator<Params>()

export default Tabs
