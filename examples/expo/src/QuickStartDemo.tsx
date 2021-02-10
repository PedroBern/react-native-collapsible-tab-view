import React from 'react'

import ExampleComponent from './Shared/QuickStartDemo'
import { ExampleComponentType } from './types'

const title = 'Quick Start Demo'

const DefaultExample: ExampleComponentType = () => {
  return <ExampleComponent />
}

DefaultExample.title = title

export default DefaultExample
