import React from 'react'

import ExampleComponent from './Shared/ExampleComponent'
import { Header } from './Shared/Header'
import { ExampleComponentType } from './types'

const exampleTitle = 'On tab change example'

const TitleContext = React.createContext<string>(exampleTitle)

const OnIndexChange: ExampleComponentType = () => {
  const [title, setTitle] = React.useState(exampleTitle)

  return (
    <TitleContext.Provider value={title}>
      <ExampleComponent
        renderHeader={(props) => <Header title={title} {...props} />}
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
