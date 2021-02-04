import React, { useContext } from 'react'

import { OnTabChangeCallback, TabBarProps } from '../../src/types'
import ExampleComponent from './Shared/ExampleComponent'
import { Header } from './Shared/Header'
import { TabNamesType } from './Shared/Tabs'
import { ExampleComponentType } from './types'

const exampleTitle = 'On index change example'

const TitleContext = React.createContext<string>(exampleTitle)

const HeaderComponent = (props: TabBarProps<TabNamesType>) => {
  const title = useContext(TitleContext)
  return <Header title={title} {...props} />
}

const OnIndexChange: ExampleComponentType = () => {
  const [title, setTitle] = React.useState(exampleTitle)

  const onIndexChange = React.useCallback<OnTabChangeCallback<TabNamesType>>(
    ({ prevIndex, index, prevTabName, tabName }) => {
      const title = `prev: ${prevTabName}\ncurr: ${tabName}`
      setTitle(title)
    },
    []
  )

  const MemoizedTabs = React.useMemo(() => {
    return (
      <ExampleComponent
        HeaderComponent={HeaderComponent}
        onIndexChange={onIndexChange}
      />
    )
  }, [onIndexChange])

  return (
    <TitleContext.Provider value={title}>{MemoizedTabs}</TitleContext.Provider>
  )
}

OnIndexChange.title = exampleTitle

export default OnIndexChange
