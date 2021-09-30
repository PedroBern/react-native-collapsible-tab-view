import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader, HEADER_HEIGHT } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Min Header Height'

const Header = buildHeader(title)
const minHeaderHeight = Math.round(HEADER_HEIGHT / 3)

const DefaultExample: ExampleComponentType = () => {
  return (
    <ExampleComponent renderHeader={Header} minHeaderHeight={minHeaderHeight} />
  )
}

DefaultExample.title = title

export default DefaultExample
