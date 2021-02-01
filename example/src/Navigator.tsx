import React from 'react'

import ExampleComponent from './Shared/ExampleComponentNavigator'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'React navigation integration'

const Header = buildHeader(title)

const NavigatorExample: ExampleComponentType = () => {
  return <ExampleComponent HeaderComponent={Header} />
}

NavigatorExample.title = title

export default NavigatorExample
