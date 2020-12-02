import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
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
const APP_HEADER_HEIGHT = 56; // from "./App"

const RN_DEVICE_HEIGHT = Dimensions.get('window').height;

// Fix for android devices with noch
const DEVICE_HEIGHT =
  Platform.select({
    ios: RN_DEVICE_HEIGHT,
    android:
      !StatusBar.currentHeight || StatusBar.currentHeight > 24
        ? RN_DEVICE_HEIGHT
        : RN_DEVICE_HEIGHT - StatusBar.currentHeight,
  }) || RN_DEVICE_HEIGHT;

export const AlbumsSmallScene = () => {
  const { contentContainerStyle, ...rest } = useCollapsibleScene(
    'albums-small'
  );

  return (
    <AnimatedAlbums
      nCovers={2} // only two covers
      {...rest}
      contentContainerStyle={{
        ...contentContainerStyle,
        minHeight: DEVICE_HEIGHT + HEADER_HEIGHT - APP_HEADER_HEIGHT,
      }}
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
  static title = 'Collapsible Tab View Small Content';
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
