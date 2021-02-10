import React from 'react'
import * as Tabs from 'react-native-collapsible-tab-view'

import Albums from './Albums'
import Article from './Article'
import Contacts from './Contacts'
import { HEADER_HEIGHT } from './Header'

type Props = {
  emptyContacts?: boolean
} & Partial<Tabs.CollapsibleProps>

const Example = React.forwardRef<Tabs.CollapsibleRef, Props>(
  ({ emptyContacts, ...props }, ref) => {
    return (
      <Tabs.Container ref={ref} headerHeight={HEADER_HEIGHT} {...props}>
        <Tabs.Tab name="article" label="Article">
          <Article />
        </Tabs.Tab>
        <Tabs.Tab name="albums" label="Albums">
          <Albums />
        </Tabs.Tab>
        <Tabs.Tab name="contacts" label="Contacts">
          <Contacts emptyContacts={emptyContacts} />
        </Tabs.Tab>
      </Tabs.Container>
    )
  }
)

export default Example
