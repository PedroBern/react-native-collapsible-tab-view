import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader } from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Header Overscroll'
const description = 'Pull to Refresh appears above header (iOS)'

const Header = buildHeader(title, description)

const HeaderOverscrollExample: ExampleComponentType = () => {
  return <ExampleComponent renderHeader={Header} allowHeaderOverscroll />
}

HeaderOverscrollExample.title = title

export default HeaderOverscrollExample
