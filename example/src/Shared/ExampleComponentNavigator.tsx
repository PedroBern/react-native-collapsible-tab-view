import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {
  CollapsibleProps,
  ContainerRef,
  RefComponent,
} from 'react-native-collapsible-tab-view'
import { useAnimatedRef } from 'react-native-reanimated'

import { AlbumsScreen } from './Albums'
import { ArticleScreen } from './Article'
import { ContactsScreen } from './Contacts'
import Tabs, { Params } from './TabsNavigator'

type Props = Partial<CollapsibleProps<keyof Params>>

const ExampleComponent: React.FC<Props> = (props) => {
  const containerRef = useAnimatedRef<ContainerRef>()
  const albumsRef = useAnimatedRef<RefComponent>()
  const articleRef = useAnimatedRef<RefComponent>()
  const contactsRef = useAnimatedRef<RefComponent>()

  const [refMap] = React.useState({
    article: articleRef,
    albums: albumsRef,
    contacts: contactsRef,
  })

  return (
    <NavigationContainer>
      <Tabs.Navigator containerRef={containerRef} refMap={refMap} {...props}>
        <Tabs.Screen
          name="article"
          component={ArticleScreen}
          options={{ tabBarLabel: 'Article' }}
        />
        <Tabs.Screen
          name="albums"
          component={AlbumsScreen}
          options={{ tabBarLabel: 'Albums' }}
        />
        <Tabs.Screen
          name="contacts"
          component={ContactsScreen}
          options={{ tabBarLabel: 'Contacts' }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  )
}

export default ExampleComponent
