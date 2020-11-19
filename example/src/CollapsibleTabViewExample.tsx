import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SceneMap, NavigationState } from 'react-native-tab-view';

import {
  CollapsibleTabView,
  useCollapsibleScene,
  CollapsibleTabViewProps,
} from 'react-native-collapsible-tab-view';

import { AnimatedAlbums } from './Shared/Albums';
import { AnimatedArticle } from './Shared/Article';
import { AnimatedContacts } from './Shared/Contacts';

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

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

export default class CollapsibleTabViewExample extends React.Component<
  Partial<CollapsibleTabViewProps<Route>>,
  State
> {
  // eslint-disable-next-line react/sort-comp
  static title = 'Collapsible Tab View';
  static backgroundColor = '#2196f3';
  static appbarElevation = 0;

  state = {
    index: 0,
    routes: [
      { key: 'article', title: 'Article' },
      { key: 'contacts', title: 'Contacts' },
      { key: 'albums', title: 'Albums' },
    ],
  };

  private handleIndexChange = (index: number) =>
    this.setState({
      index,
    });

  private renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>COLLAPSIBLE</Text>
    </View>
  );

  private renderScene = SceneMap({
    albums: AlbumsScene,
    contacts: ContactsScene,
    article: ArticleScene,
  });

  render() {
    return (
      <CollapsibleTabView<Route>
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onIndexChange={this.handleIndexChange}
        headerHeight={HEADER_HEIGHT}
        {...this.props}
      />
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
