import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

import {
  CollapsibleTabView,
  useCollapsibleScene,
} from 'react-native-collapsible-tab-view';

import { AnimatedAlbums } from './Shared/Albums';
import { ExampleComponentType } from './types';

type Route = {
  key: string;
  title: string;
};

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

const renderHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>COLLAPSIBLE</Text>
  </View>
);

const renderScene = SceneMap({
  'albums-small': AlbumsSmallScene,
  'albums-large': AlbumsLargeScene,
});

const CollapsibleTabViewExample: ExampleComponentType = (props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'albums-small', title: 'Small' },
    { key: 'albums-large', title: 'Large' },
  ]);

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  return (
    <CollapsibleTabView<Route>
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      renderHeader={renderHeader}
      headerHeight={HEADER_HEIGHT}
      {...props}
    />
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

CollapsibleTabViewExample.title = 'Small content demo';
CollapsibleTabViewExample.backgroundColor = '#2196f3';
CollapsibleTabViewExample.appbarElevation = 0;

export default CollapsibleTabViewExample;
