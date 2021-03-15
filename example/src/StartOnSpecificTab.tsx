import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Start On Specific Tab'

const Header = buildHeader(title)

const DefaultExample: ExampleComponentType = () => {
  return <ExampleComponent initialTabName="contacts" renderHeader={Header} />
}

DefaultExample.title = title

export default DefaultExample
