import React from 'react'
import {
  CollapsibleProps,
  CollapsibleRef,
  useContainerRef,
  useRefMap,
} from 'react-native-collapsible-tab-view'

import Albums from './Albums'
import Article from './Article'
import Contacts from './Contacts'
import { HEADER_HEIGHT } from './Header'
import Tabs, { TabNames } from './Tabs'

type Props = {
  emptyContacts?: boolean
} & Partial<CollapsibleProps<TabNames>>

const Example = React.forwardRef<CollapsibleRef<TabNames>, Props>(
  ({ emptyContacts, ...props }, ref) => {
    const containerRef = useContainerRef()
    const refMap = useRefMap(['article', 'albums', 'contacts'])

    return (
      <Tabs.Container
        ref={ref}
        containerRef={containerRef}
        headerHeight={HEADER_HEIGHT}
        refMap={refMap}
        {...props}
      >
        <Article />
        <Albums />
        <Contacts emptyContacts={emptyContacts} />
      </Tabs.Container>
    )
  }
)

export default Example
