import React from 'react'
import {
  Tabs,
  CollapsibleRef,
  CollapsibleProps,
} from 'react-native-collapsible-tab-view'

import Albums from './Albums'
import Article from './Article'
import ContactsLegendList from './ContactsLegendList'
import { HEADER_HEIGHT } from './Header'

type Props = {
  emptyContacts?: boolean
  recycleItems?: boolean
} & Partial<CollapsibleProps>

const Example = React.forwardRef<CollapsibleRef, Props>(
  ({ emptyContacts, recycleItems, ...props }, ref) => {
    return (
      <Tabs.Container ref={ref} headerHeight={HEADER_HEIGHT} lazy {...props}>
        <Tabs.Tab name="article" label="Article">
          <Article />
        </Tabs.Tab>
        <Tabs.Tab name="albums" label="Albums">
          <Albums />
        </Tabs.Tab>
        <Tabs.Tab name="contacts" label="LegendList">
          <ContactsLegendList
            emptyContacts={emptyContacts}
            recycleItems={recycleItems}
          />
        </Tabs.Tab>
        <Tabs.Tab name="recycled" label="LegendList (Recycled)">
          <ContactsLegendList emptyContacts={emptyContacts} recycleItems />
        </Tabs.Tab>
      </Tabs.Container>
    )
  }
)

export default Example
