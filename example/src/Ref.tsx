import React from 'react'
import { CollapsibleRef } from 'react-native-collapsible-tab-view'

import ExampleComponent from './Shared/ExampleComponent'
import { buildHeader } from './Shared/Header'
import { TabNames } from './Shared/Tabs'
import { ExampleComponentType } from './types'

const title = 'Ref example "jumpToTab" after 1 second'

const Header = buildHeader(title)

const RefExample: ExampleComponentType = () => {
  const ref = React.useRef<CollapsibleRef<TabNames>>()

  React.useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.jumpToTab('contacts')
      // ref.current?.setIndex(2)
      // ref.current?.getCurrentIndex()
      // ref.current?.getFocusedTab()
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return <ExampleComponent ref={ref} HeaderComponent={Header} />
}

RefExample.title = title

export default RefExample
