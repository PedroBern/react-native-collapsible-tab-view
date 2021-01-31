import React from 'react'
import {
  createCollapsibleTabs,
  CollapsibleProps,
  RefComponent,
  ContainerRef,
  MaterialTabBar,
} from 'react-native-collapsible-tab-view'
import { useAnimatedRef } from 'react-native-reanimated'

import { ArticleContent } from './Article'
import { HEADER_HEIGHT } from './Header'

type TabNames =
  | 'screenA'
  | 'screenB'
  | 'screenC'
  | 'screenD'
  | 'screenE'
  | 'screenF'
  | 'screenG'
  | 'screenH'
  | 'screenI'

const { useTabsContext, ...Tabs } = createCollapsibleTabs<TabNames>()

type Props = Partial<CollapsibleProps<TabNames>>

const Example: React.FC<Props> = (props) => {
  const containerRef = useAnimatedRef<ContainerRef>()
  const screenARef = useAnimatedRef<RefComponent>()
  const screenBRef = useAnimatedRef<RefComponent>()
  const screenCRef = useAnimatedRef<RefComponent>()
  const screenDRef = useAnimatedRef<RefComponent>()
  const screenERef = useAnimatedRef<RefComponent>()
  const screenFRef = useAnimatedRef<RefComponent>()
  const screenGRef = useAnimatedRef<RefComponent>()
  const screenHRef = useAnimatedRef<RefComponent>()
  const screenIRef = useAnimatedRef<RefComponent>()

  const [refMap] = React.useState({
    screenA: screenARef,
    screenB: screenBRef,
    screenC: screenCRef,
    screenD: screenDRef,
    screenE: screenERef,
    screenF: screenFRef,
    screenG: screenGRef,
    screenH: screenHRef,
    screenI: screenIRef,
  })

  return (
    <Tabs.Container
      containerRef={containerRef}
      headerHeight={HEADER_HEIGHT}
      refMap={refMap}
      lazy
      TabBarComponent={(props) => <MaterialTabBar {...props} scrollEnabled />}
      {...props}
    >
      {Object.keys(refMap).map((name) => {
        return (
          <Tabs.ScrollView key={name}>
            <ArticleContent />
          </Tabs.ScrollView>
        )
      })}
    </Tabs.Container>
  )
}

export default Example
