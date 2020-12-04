import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SceneMap, NavigationState } from 'react-native-tab-view';

import {
  CollapsibleTabView,
  useCollapsibleScene,
  CollapsibleTabViewProps,
} from 'react-native-collapsible-tab-view';

import { AnimatedAlbums } from './Shared/Albums';

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

const HEADER_HEIGHT = 250;

export const AlbumsSmallScene = () => {
  const propsAndRef = useCollapsibleScene('albums-small');

  return (
    <AnimatedAlbums
      nCovers={2} // only two covers
      {...propsAndRef}
    />
  );
};

export const AlbumsLargeScene = () => {
  const scenePropsAndRef = useCollapsibleScene('albums-large');
  return <AnimatedAlbums {...scenePropsAndRef} />;
};

export default class CollapsibleTabViewSmallContentExample extends React.Component<
  Partial<CollapsibleTabViewProps<Route>>,
  State
> {
  // eslint-disable-next-line react/sort-comp
  static title = 'Small content demo';
  static backgroundColor = '#2196f3';
  static appbarElevation = 0;

  state = {
    index: 0,
    routes: [
      { key: 'albums-small', title: 'Small' },
      { key: 'albums-large', title: 'Large' },
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
    'albums-small': AlbumsSmallScene,
    'albums-large': AlbumsLargeScene,
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
