import React from 'react'
import {
  Tabs,
  CollapsibleRef,
  CollapsibleProps,
} from 'react-native-collapsible-tab-view'

import Albums from './Albums'
import Article from './Article'
import ContactsFlashList from './ContactsFlashList'
import ExampleMasonry from './ExampleMasonry'
import { HEADER_HEIGHT } from './Header'

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
        <Tabs.Tab name="contacts" label="MasonryFlashList">
          {/* 
            TODO: masonry has the same issue unfortunatelly when not having a lot of elements
            // see: https://github.com/PedroBern/react-native-collapsible-tab-view/issues/335
            <ExampleMasonry emptyList={emptyContacts} limit={5} />
          */}
          <ExampleMasonry emptyList={emptyContacts} />
        </Tabs.Tab>
        <Tabs.Tab name="ordered" label="FlashList">
          <ContactsFlashList emptyContacts={emptyContacts} />
        </Tabs.Tab>
      </Tabs.Container>
    )
  }
)

export default Example
