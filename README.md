# react-native-collapsible-tab-view

A simple wrapper for [react-native-tab-view](https://github.com/satya164/react-native-tab-view) that helps to build a collapsible tab view.

## Demo

<img src="https://github.com/PedroBern/react-native-collapsible-tab-view/raw/main/demo/demo-collapsible.gif" width="360">

## Installation

Open a Terminal in the project root and run:

```sh
yarn add react-native-tab-view react-native-collapsible-tab-view
```

## Quick Start

```tsx
import * as React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import {
  CollapsibleTabView,
  useCollapsibleScene,
} from 'react-native-collapsible-tab-view';
import { SceneMap } from 'react-native-tab-view';

type Route = {
  key: string;
  title: string;
};

const SomeRoute: React.FC<{ routeKey: string; color: string }> = ({
  routeKey,
  color,
}) => {
  const scrollPropsAndRef = useCollapsibleScene(routeKey);

  return (
    <Animated.ScrollView
      style={{ backgroundColor: color }}
      {...scrollPropsAndRef}
    >
      <View style={styles.content} />
    </Animated.ScrollView>
  );
};

const FirstScene = () => <SomeRoute routeKey="first" color="white" />;
const SecondScene = () => <SomeRoute routeKey="second" color="black" />;

const HEADER_HEIGHT = 250;

const renderHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>COLLAPSIBLE</Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstScene,
  second: SecondScene,
});

const App: React.FC<object> = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  return (
    <CollapsibleTabView<Route>
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      renderHeader={renderHeader} // optional
      headerHeight={HEADER_HEIGHT} // optional, will be computed.
    />
  );
};

export default App;

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
  content: {
    height: 1500,
  },
});
```
