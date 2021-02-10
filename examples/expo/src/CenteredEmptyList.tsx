import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Centered Empty List'

const Header = buildHeader(title)

const DefaultExample: ExampleComponentType = () => {
  return <ExampleComponent HeaderComponent={Header} emptyContacts />
}

DefaultExample.title = title

export default DefaultExample
