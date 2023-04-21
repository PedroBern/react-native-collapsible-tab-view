import React from 'react'
import {
  Tabs,
  CollapsibleRef,
  CollapsibleProps,
} from 'react-native-collapsible-tab-view'

import Albums from './Albums'
import Article from './Article'
import Contacts from './ContactsFlashList'
import { HEADER_HEIGHT } from './Header'
import SectionContacts from './SectionContacts'

type Props = {
  emptyContacts?: boolean
  hideArticleTab?: boolean
} & Partial<CollapsibleProps>

const Example = React.forwardRef<CollapsibleRef, Props>(
  ({ emptyContacts, ...props }, ref) => {
    return (
      <Tabs.Container ref={ref} headerHeight={HEADER_HEIGHT} {...props}>
        {props.hideArticleTab ? (
          <Tabs.Tab name="article" label="Article">
            <Article />
          </Tabs.Tab>
        ) : null}
        <Tabs.Tab name="albums" label="Albums">
          <Albums />
        </Tabs.Tab>
        <Tabs.Tab name="contacts" label="Contacts">
          <Contacts emptyContacts={emptyContacts} />
        </Tabs.Tab>
        <Tabs.Tab name="ordered" label="Ordered">
          <SectionContacts emptyContacts={emptyContacts} />
        </Tabs.Tab>
      </Tabs.Container>
    )
  }
)

export default Example
