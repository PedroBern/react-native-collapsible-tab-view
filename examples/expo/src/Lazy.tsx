import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Lazy Example'

const Header = buildHeader(title)

const DefaultExample: ExampleComponentType = () => {
  return <ExampleComponent HeaderComponent={Header} lazy />
}

DefaultExample.title = title

export default DefaultExample
