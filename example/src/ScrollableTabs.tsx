import React from 'react'

import ExampleComponent from './Shared/ExampleComponentScrollableTabs'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Scrollable Tabs'

const Header = buildHeader(title)

const ScrollableTabs: ExampleComponentType = () => {
  return <ExampleComponent renderHeaderComponent={Header} />
}

ScrollableTabs.title = title

export default ScrollableTabs
