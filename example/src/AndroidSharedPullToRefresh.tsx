import React from 'react'

import ExampleComponent from './Shared/ExampleComponentSharedPullToRefresh'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Android Shared Pull To Refresh'

const Header = buildHeader(title)

const Example: ExampleComponentType = () => {
  return <ExampleComponent HeaderComponent={Header} />
}

Example.title = title
Example.platform = 'android'

export default Example
