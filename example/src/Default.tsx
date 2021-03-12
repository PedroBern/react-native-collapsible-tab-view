import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Default'

const Header = buildHeader(title)

const DefaultExample: ExampleComponentType = () => {
  return <ExampleComponent renderHeaderComponent={Header} />
}

DefaultExample.title = title

export default DefaultExample
