import React, { useContext } from 'react'
import { TabBarProps } from 'react-native-collapsible-tab-view'

import ExampleComponent from './Shared/ExampleComponent'
import { Header } from './Shared/Header'
import { ExampleComponentType } from './types'

const exampleTitle = 'On tab change example'

const TitleContext = React.createContext<string>(exampleTitle)

const HeaderComponent = (props: TabBarProps) => {
  const title = useContext(TitleContext)
  return <Header title={title} {...props} />
}

const OnIndexChange: ExampleComponentType = () => {
  const [title, setTitle] = React.useState(exampleTitle)

  return (
    <TitleContext.Provider value={title}>
      <ExampleComponent
        HeaderComponent={HeaderComponent}
        onTabChange={({ prevIndex, index, prevTabName, tabName }) => {
          const title = `prev: ${prevTabName}\ncurr: ${tabName}`
          setTitle(title)
        }}
      />
    </TitleContext.Provider>
  )
}

OnIndexChange.title = exampleTitle

export default OnIndexChange
