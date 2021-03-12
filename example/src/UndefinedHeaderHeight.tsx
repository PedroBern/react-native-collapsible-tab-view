import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Undefined Header Height'

const Header = buildHeader(title)

const UndefinedHeaderHeight: ExampleComponentType = () => {
  return (
    <ExampleComponent renderHeaderComponent={Header} headerHeight={undefined} />
  )
}

UndefinedHeaderHeight.title = title

export default UndefinedHeaderHeight
