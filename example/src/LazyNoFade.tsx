import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Lazy without Fade In Example'

const Header = buildHeader(title)

const DefaultExample: ExampleComponentType = () => {
  return <ExampleComponent renderHeader={Header} lazy cancelLazyFadeIn />
}

DefaultExample.title = title

export default DefaultExample
