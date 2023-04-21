import React from 'react'
import { Tabs } from 'react-native-collapsible-tab-view'

import Albums from './Shared/Albums'
import Contacts from './Shared/Contacts'
import { buildHeader, HEADER_HEIGHT } from './Shared/Header'
import SectionContacts from './Shared/SectionContacts'
import { ExampleComponentType } from './types'

const title = 'Min Header Height'

const Header = buildHeader(title)
const minHeaderHeight = Math.round(HEADER_HEIGHT / 3)

const DefaultExample: ExampleComponentType = () => {
  return (
    <Tabs.Container
      headerHeight={HEADER_HEIGHT}
      renderHeader={Header}
      minHeaderHeight={minHeaderHeight}
    >
      <Tabs.Tab name="albums" label="Albums">
        <Albums numberOfAlbums={2} />
      </Tabs.Tab>
      <Tabs.Tab name="contacts" label="Contacts">
        <Contacts />
      </Tabs.Tab>
      <Tabs.Tab name="ordered" label="Ordered">
        <SectionContacts />
      </Tabs.Tab>
    </Tabs.Container>
  )
}

DefaultExample.title = title

export default DefaultExample
