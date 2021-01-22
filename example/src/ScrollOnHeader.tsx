import React from 'react'
import { View } from 'react-native'

import ExampleComponent from './shared/ExampleComponent'
import Header from './shared/Header'
import { HeaderProps } from './shared/Tabs'
import { ExampleComponentType } from './types'

const title = 'Scroll On Header'

const HEADER_HEIGHT = 400

const NewHeader: React.FC<HeaderProps> = () => {
  return (
    <View pointerEvents="none">
      <Header height={HEADER_HEIGHT} title={title} />
    </View>
  )
}

const DefaultExample: ExampleComponentType = () => {
  return (
    <ExampleComponent
      HeaderComponent={NewHeader}
      headerHeight={HEADER_HEIGHT}
    />
  )
}

DefaultExample.title = title

export default DefaultExample
