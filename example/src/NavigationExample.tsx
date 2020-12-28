import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
  useCollapsibleScene,
  createMaterialCollapsibleTopTabNavigator,
} from 'react-native-collapsible-tab-view';

import { AnimatedAlbums } from './Shared/Albums';
import { AnimatedArticle } from './Shared/Article';
import { AnimatedContacts } from './Shared/Contacts';
import { NavigationContainer } from '@react-navigation/native';
import { ExampleComponentType } from './types';

const Tab = createMaterialCollapsibleTopTabNavigator();

export const ContactsScene = () => {
  const scenePropsAndRef = useCollapsibleScene('contacts');
  return <AnimatedContacts {...scenePropsAndRef} />;
};

export const ArticleScene = () => {
  const scenePropsAndRef = useCollapsibleScene('article');
  return <AnimatedArticle {...scenePropsAndRef} />;
};

export const AlbumsScene = () => {
  const scenePropsAndRef = useCollapsibleScene('albums');
  return <AnimatedAlbums {...scenePropsAndRef} />;
};

export const HEADER_HEIGHT = 250;

const renderHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>COLLAPSIBLE</Text>
  </View>
);

const CollapsibleTabViewExample: ExampleComponentType = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        collapsibleOptions={{
          headerHeight: HEADER_HEIGHT,
          renderHeader,
        }}
      >
        <Tab.Screen
          name="article"
          options={{
            tabBarLabel: 'Article',
          }}
          component={ArticleScene}
        />
        <Tab.Screen
          name="contacts"
          options={{
            tabBarLabel: 'Contacts',
          }}
          component={ContactsScene}
        />
        <Tab.Screen
          name="albums"
          options={{
            tabBarLabel: 'Albums',
          }}
          component={AlbumsScene}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
});

CollapsibleTabViewExample.title = 'React Navigation Integration';
CollapsibleTabViewExample.backgroundColor = '#2196f3';
CollapsibleTabViewExample.appbarElevation = 0;

export default CollapsibleTabViewExample;
