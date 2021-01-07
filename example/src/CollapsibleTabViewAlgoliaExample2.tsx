import * as React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

import { CollapsibleTabView } from 'react-native-collapsible-tab-view';

import { AnimatedValueContextProvider } from './Shared/AnimatedContext';

import { Algolia } from './Shared/Algoliav2';
import { ExampleComponentType } from './types';

type Route = {
  key: string;
  title: string;
};

export const AlgoliaScene = () => <Algolia routeKey="algolia" />;

export const AlgoliaEmptyScene = () => (
  <Algolia hitsPerPage={0} routeKey="algoliaEmpty" />
);

const renderScene = SceneMap({
  algolia: AlgoliaScene,
  algoliaEmpty: AlgoliaEmptyScene,
});

export const HEADER_HEIGHT = 250;

const renderHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>COLLAPSIBLE</Text>
  </View>
);

const CollapsibleTabViewExample: ExampleComponentType = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'algolia', title: 'Algolia' },
    { key: 'algoliaEmpty', title: 'Algolia Empty' },
  ]);

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  const [animatedValue] = React.useState(new Animated.Value(0));

  return (
    <AnimatedValueContextProvider value={animatedValue}>
      <CollapsibleTabView<Route>
        animatedValue={animatedValue}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        renderHeader={renderHeader}
        headerHeight={HEADER_HEIGHT}
      />
    </AnimatedValueContextProvider>
  );
};

CollapsibleTabViewExample.title = 'Algolia example2';
CollapsibleTabViewExample.backgroundColor = '#2196f3';
CollapsibleTabViewExample.appbarElevation = 0;

export default CollapsibleTabViewExample;

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
