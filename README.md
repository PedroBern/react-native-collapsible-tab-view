# react-native-collapsible-tab-view

[![Build Status][build-badge]][build]
[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

A simple wrapper for [react-native-tab-view](https://github.com/satya164/react-native-tab-view) that helps to build a collapsible tab view.

- [View it with Expo](https://expo.io/@pedrobern/react-native-collapsible-tab-view-demos).
- Checkout the [examples](https://github.com/PedroBern/react-native-collapsible-tab-view/tree/main/example) for the source code of the Expo app.

<a href="https://expo.io/@pedrobern/react-native-collapsible-tab-view-demos"><img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=exp://exp.host/@pedrobern/react-native-collapsible-tab-view-demos" height="200px" width="200px"></a>

## Demo

<img src="https://github.com/PedroBern/react-native-collapsible-tab-view/raw/main/demo/demo2.gif" width="360">

## Installation

Open a Terminal in the project root and run:

```sh
yarn add react-native-collapsible-tab-view
```

Now add `react-native-tab-view` and all it's peer dependencies:

```sh
yarn add react-native-tab-view
```

For the peer dependencies, if using expo:

```sh
expo install react-native-gesture-handler react-native-reanimated
```

If not using expo, [follow these instructions](https://github.com/satya164/react-native-tab-view#installation).

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

## API reference

The package has two exports:

- `CollapsibleTabView` component which is the one you'd use to render the collapsible tab view.
- `useCollapsibleScene` hook which you use to get props and ref for `ScrollView` or `FlatList`.

### `CollapsibleTabView`

Simple wrapper of the original [TabView](https://github.com/satya164/react-native-tab-view#tabview).

Basic usage looks like this:

```jsx
<CollapsibleTabView
  navigationState={{ index, routes }}
  onIndexChange={setIndex}
  renderScene={SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  })}
  renderHeader={() => <MyHeader />} // optional
  headerHeight={HEADER_HEIGHT} // optional
/>
```

#### Props

All props are optional, but if you are not rendering a header, you'd be probably better with the original [TabView](https://github.com/satya164/react-native-tab-view#tabview).

#### animatedValue `optional`

Optionally controlled animated value. Default is `new Animated.Value(0)`.

#### headerHeight `optional`

Header component height, default is 0. It is computed on layout. Providing it is just an optimization.

#### tabBarHeight `optional`

Tab bar height, default is 49.

#### tabBarProps `optional`

Props passed to the tab bar component.

#### renderHeader `optional`

Header rendered on top of the tab bar. Defaul is `() => null`.

#### headerContainerStyle `optional`

Styles applied to header and tabbar container.

#### preventTabPressOnGliding `optional`

Prevent tab press if screen is gliding. Default is `true`. It is ignores if a `renderTabBar` is provided.

#### disableSnap `optional`

Disable the snap animation. Default is `false`.

#### renderTabBar `optional`

Same as [renderTabBar](https://github.com/satya164/react-native-tab-view#rendertabbar) of the original [TabView](https://github.com/satya164/react-native-tab-view#tabview), but with the additional `isGliding` property.

#### onHeaderHeightChange `optional`

Callback fired when the `headerHeight` state value inside
`CollapsibleTabView` will be updated in the `onLayout` event
from the tab/header container. Useful to call layout animations.

Example:

```js
const onHeaderHeightChange = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};
```

#### snapThreshold `optional`

Percentage of header height to make the snap effect. A number between 0 and 1. Default is 0.5.

### `useCollapsibleScene`

A hook to get all props and ref for the animated component in order to make the collapsible tabs work.

Works with:

- Animated.ScrollView
- Animated.FlatList

```tsx
const FirstScene: React.FC<object> = ({ children }) => {
  const scrollPropsAndRef = useCollapsibleScene('firstScene');

  return (
    <Animated.ScrollView {...scrollPropsAndRef}>{children}</Animated.ScrollView>
  );
};
```

It includes de following values:

#### ref

Function to get ref from scrollable components inside the scene, and track in the Collapsible Tab View.

#### onScroll

Scroll event, enabled only for the focused route.

#### scrollEnabled

Disable scroll for unfocused routes is optional, but prevents weird/delayed animations if the user changes tabs and quickly start scrolling the new tab, before the animated value starting to track the new focused route.

#### contentContainerStyle

Content container style with top padding with the same height
as the tab bar + header height, and a minHeight to prevent blanck space
if the scroll content is smaller than the screen.

in#### progressViewOffset

Needed for the loading indicator to show correctly on android.

#### onMomentumScrollBegin

Callback to set `isGliding` to `true`.

#### onScrollEndDrag

Callback to sync the scroll of unfocused routes.

#### onMomentumScrollEnd

Callback to sync the scroll of unfocused routes.

## Contributing

While developing, you can run the [example app](/example/README.md) to test your changes.

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typescript
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint -- --fix
```

Remember to add tests for your change if possible.

<!-- badges -->

[build-badge]: https://img.shields.io/circleci/build/github/PedroBern/react-native-collapsible-tab-view/main.svg?style=flat-square
[build]: https://app.circleci.com/pipelines/github/PedroBern/react-native-collapsible-tab-view
[version-badge]: https://img.shields.io/npm/v/react-native-collapsible-tab-view.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-native-collapsible-tab-view
[license-badge]: https://img.shields.io/npm/l/react-native-collapsible-tab-view.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
