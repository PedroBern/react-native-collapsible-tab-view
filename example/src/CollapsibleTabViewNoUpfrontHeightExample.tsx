import * as React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import {
  CollapsibleTabView,
  useCollapsibleScene,
} from 'react-native-collapsible-tab-view';
import { SceneMap } from 'react-native-tab-view';
import { ExampleComponentType } from './types';

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

const CollapsibleTabViewExample: ExampleComponentType = () => {
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
      renderHeader={renderHeader}
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
  content: {
    height: 1500,
  },
});

CollapsibleTabViewExample.title = 'No upfront height example';
CollapsibleTabViewExample.backgroundColor = '#2196f3';
CollapsibleTabViewExample.appbarElevation = 0;

export default CollapsibleTabViewExample;
