import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Reveal Header On Scroll'

const Header = buildHeader(title)

const DefaultExample: ExampleComponentType = () => {
  return (
    <ExampleComponent revealHeaderOnScroll renderHeader={Header} />
  )
}

DefaultExample.title = title

export default DefaultExample
