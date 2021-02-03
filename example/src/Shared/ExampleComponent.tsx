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
        <Article />
        <Albums />
        <Contacts emptyContacts={emptyContacts} />
      </Tabs.Container>
    )
  }
)

export default Example
