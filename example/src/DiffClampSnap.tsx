import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'DiffClamp + Snap Example'

const Header = buildHeader(title)

const DefaultExample: ExampleComponentType = () => {
  return (
    <ExampleComponent diffClampEnabled snapEnabled HeaderComponent={Header} />
  )
}

DefaultExample.title = title

export default DefaultExample
