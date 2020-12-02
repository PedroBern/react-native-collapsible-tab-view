import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationState } from 'react-native-tab-view';

import {
  useCollapsibleScene,
  CollapsibleTabViewProps,
  createMaterialCollapsibleTopTabNavigator,
} from 'react-native-collapsible-tab-view';

import { AnimatedAlbums } from './Shared/Albums';
import { AnimatedArticle } from './Shared/Article';
import { AnimatedContacts } from './Shared/Contacts';
import { NavigationContainer } from '@react-navigation/native';

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

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

export default class MaterialTopTabsCollapsibleTabViewExample extends React.Component<
  Partial<CollapsibleTabViewProps<Route>>,
  State
> {
  static title = 'React Navigation Material Top Tabs';
  static backgroundColor = '#2196f3';
  static appbarElevation = 0;

  private renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>COLLAPSIBLE</Text>
    </View>
  );

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          collapsibleOptions={{
            headerHeight: HEADER_HEIGHT,
            renderHeader: this.renderHeader,
          }}
        >
          <Tab.Screen
            name="article"
            options={{
              tabBarLabel: 'Article',
            }}
          >
            {() => <ArticleScene />}
          </Tab.Screen>
          <Tab.Screen
            name="contacts"
            options={{
              tabBarLabel: 'Contacts',
            }}
          >
            {() => <ContactsScene />}
          </Tab.Screen>
          <Tab.Screen
            name="albums"
            options={{
              tabBarLabel: 'Albums',
            }}
          >
            {() => <AlbumsScene />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

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
