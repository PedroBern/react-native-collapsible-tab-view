import React, { useContext } from 'react'
import {
  OnTabChangeCallback,
  TabBarProps,
} from 'react-native-collapsible-tab-view'

import ExampleComponent from './Shared/ExampleComponent'
import { Header } from './Shared/Header'
import { ExampleComponentType } from './types'

const exampleTitle = 'On index change example'

const TitleContext = React.createContext<string>(exampleTitle)

const HeaderComponent = (props: TabBarProps) => {
  const title = useContext(TitleContext)
  return <Header title={title} {...props} />
}

const OnIndexChange: ExampleComponentType = () => {
  const [title, setTitle] = React.useState(exampleTitle)

  const onIndexChange = React.useCallback<OnTabChangeCallback>(
    ({ prevIndex, index, prevTabName, tabName }) => {
      const title = `prev: ${prevTabName}\ncurr: ${tabName}`
      setTitle(title)
    },
    []
  )

  return (
    <TitleContext.Provider value={title}>
      <ExampleComponent
        HeaderComponent={HeaderComponent}
        onIndexChange={onIndexChange}
      />
    </TitleContext.Provider>
  )
}

OnIndexChange.title = exampleTitle

export default OnIndexChange
