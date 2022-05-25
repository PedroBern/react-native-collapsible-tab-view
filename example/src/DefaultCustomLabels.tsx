import React from 'react'

import ExampleComponent from './Shared/ExampleComponentCustomLabels'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Default w/ Custom Labels'

const Header = buildHeader(title)

const DefaultExampleCustomLabels: ExampleComponentType = () => {
  return <ExampleComponent renderHeader={Header} />
}

DefaultExampleCustomLabels.title = title

export default DefaultExampleCustomLabels
