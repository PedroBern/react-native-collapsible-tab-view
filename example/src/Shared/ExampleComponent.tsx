import React from 'react'
import {
  CollapsibleProps,
  CollapsibleRef,
} from 'react-native-collapsible-tab-view'

import Albums from './Albums'
import Article from './Article'
import Contacts from './Contacts'
import { HEADER_HEIGHT } from './Header'
import Tabs, { TabNamesType } from './Tabs'

type Props = {
  emptyContacts?: boolean
} & Partial<CollapsibleProps<TabNamesType>>

const Example = React.forwardRef<CollapsibleRef<TabNamesType>, Props>(
  ({ emptyContacts, ...props }, ref) => {
    return (
      <Tabs.Container ref={ref} headerHeight={HEADER_HEIGHT} {...props}>
        <Tabs.Tab name="article" options={{ label: 'Article' }}>
          <Article />
        </Tabs.Tab>
        <Tabs.Tab name="albums" options={{ label: 'Albums' }}>
          <Albums />
        </Tabs.Tab>
        <Tabs.Tab name="contacts" options={{ label: 'Contacts' }}>
          <Contacts emptyContacts={emptyContacts} />
        </Tabs.Tab>
      </Tabs.Container>
    )
  }
)

export default Example
