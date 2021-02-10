import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Snap'

const Header = buildHeader(title)

const DefaultExample: ExampleComponentType = () => {
  return <ExampleComponent snapThreshold={0.5} HeaderComponent={Header} />
}

DefaultExample.title = title

export default DefaultExample
