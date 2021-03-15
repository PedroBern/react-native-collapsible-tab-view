import React from 'react'
import { View } from 'react-native'

import { TabBarProps } from '../../src/types'
import ExampleComponent from './Shared/ExampleComponent'
import Header from './Shared/Header'
import { ExampleComponentType } from './types'

const title = 'Scroll On Header'

const HEADER_HEIGHT = 400

const NewHeader: React.FC<TabBarProps> = (props) => {
  return (
    <View pointerEvents="none">
      <Header
        height={HEADER_HEIGHT}
        title={`${title}\n\nTry dragging up/down from within this header`}
        {...props}
      />
    </View>
  )
}

const DefaultExample: ExampleComponentType = () => {
  return (
    <ExampleComponent
      renderHeader={NewHeader}
      headerHeight={HEADER_HEIGHT}
    />
  )
}

DefaultExample.title = title

export default DefaultExample
