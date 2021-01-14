# react-native-collapsible-tab-view

[![Build Status][build-badge]][build]
[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

- [Expo app](#expo-app)
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Scroll on header](#scroll-on-header)
- [API reference](#api-reference)
  - [CollapsibleTabView](#collapsibletabview)
  - [useCollapsibleScene](#usecollapsiblescene)
  - [createMaterialCollapsibleTopTabNavigator](#creatematerialcollapsibletoptabnavigator)
- [Contributing](#contributing)

## Expo app

A simple wrapper for [react-native-tab-view](https://github.com/satya164/react-native-tab-view) that helps to build a collapsible tab view.

- [View it with Expo](https://expo.io/@pedrobern/react-native-collapsible-tab-view-demos).
- Checkout the [examples](https://github.com/PedroBern/react-native-collapsible-tab-view/tree/main/example) for the source code of the Expo app.

<a href="https://expo.io/@pedrobern/react-native-collapsible-tab-view-demos"><img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=exp://exp.host/@pedrobern/react-native-collapsible-tab-view-demos" height="200px" width="200px"></a>

## Demo

<img src="https://github.com/PedroBern/react-native-collapsible-tab-view/raw/main/demo/demo2.gif" width="360">

## Features

#### From [react-native-tab-view](https://github.com/satya164/react-native-tab-view)

- Smooth animations and gestures
- Scrollable tabs
- Supports ~~both top and~~ bottom tab bars
- Follows Material Design spec
- Highly customizable
- Fully typed with [TypeScript](https://typescriptlang.org)

#### From this package

- Integration with [react-navigation](https://github.com/react-navigation/react-navigation)
- Collapsible Tabs

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

#### React Navigation Integration

To integrate with [react-navigation](https://github.com/react-navigation/react-navigation):

```sh
yarn add @react-navigation/native @react-navigation/material-top-tabs
```

## Quick Start

```tsx
import * as React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import {
  CollapsibleTabView,
  useCollapsibleScene,
  createMaterialCollapsibleTopTabNavigator,
} from 'react-native-collapsible-tab-view';
import { SceneMap } from 'react-native-tab-view';
import { NavigationContainer } from '@react-navigation/native';

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
      {new Array(20).fill(null).map((_, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={index} style={{ padding: 20, color: 'red' }}>
            {index}
          </Text>
        );
      })}
    </Animated.ScrollView>
  );
};

const FirstScene = () => <SomeRoute routeKey="first" color="white" />;
const SecondScene = () => <SomeRoute routeKey="second" color="black" />;

const HEADER_HEIGHT = 250;

// set pointerEvents="none" to allow scroll on header
// see the docs for more information
const renderHeader = () => (
  <View pointerEvents="none" style={styles.header}>
    <Text style={styles.headerText}>COLLAPSIBLE</Text>
  </View>
);

// example with react navigation

const Tab = createMaterialCollapsibleTopTabNavigator();

export const WithReactNavigation: React.FC<object> = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        collapsibleOptions={{
          headerHeight: HEADER_HEIGHT,
          renderHeader,
          disableSnap: true,
        }}
      >
        <Tab.Screen name="first" component={FirstScene} />
        <Tab.Screen name="second" component={SecondScene} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// example without react navigation

const renderScene = SceneMap({
  first: FirstScene,
  second: SecondScene,
});

export const WithoutReactNavigation: React.FC<object> = () => {
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
      disableSnap
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

export default WithReactNavigation;
```

## Scroll on header

If you want to allow scrolling from the header:

- If `renderHeader` **doesn't** contain touchables set `pointerEvents='none'`
- If `renderHeader` **does** contain touchables set `pointerEvents='box-none'` for them to work.
  _Note: With this setting any child component that should **not** respond to touches (e.g. `<Image />`) needs to have `pointerEvents` set to `'none'`. Otherwise it can become the target of a touch gesture on iOS devices and thereby preventing scrolling._

## API reference

The package has 3 main exports:

| export                                                                                | description                                                                                                                            |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [CollapsibleTabView](#collapsibletabview)                                             | Component which is the one you'd use to render the collapsible tab view.                                                               |
| [useCollapsibleScene](#usecollapsiblescene)                                           | Hook which you use to get props and ref for `ScrollView` or `FlatList`.                                                                |
| [createMaterialCollapsibleTopTabNavigator](#creatematerialcollapsibletoptabnavigator) | Function to create the Navigator, if you are integrating with [react-navigation](https://github.com/react-navigation/react-navigation) |

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

| prop                        | description                                                                                                                                                                                                                                                                             | default                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `animatedValue?`            | Optionally controlled animated value.                                                                                                                                                                                                                                                   | `new Animated.Value(0)` |
| `headerHeight?`             | Header component height. It is computed on layout. Providing it is just an optimization.                                                                                                                                                                                                | `0`                     |
| `tabBarHeight?`             | Tab bar height.                                                                                                                                                                                                                                                                         | `49`                    |
| `tabBarProps?`              | Props passed to the tab bar component.                                                                                                                                                                                                                                                  | `undefined`             |
| `renderHeader?`             | Header rendered on top of the tab bar.                                                                                                                                                                                                                                                  | `() => null`            |
| `headerContainerStyle?`     | Styles applied to header and tabbar container.                                                                                                                                                                                                                                          | `undefined`             |
| `preventTabPressOnGliding?` | Prevent tab press if screen is gliding. Ignored if `renderTabBar` is provided.                                                                                                                                                                                                          | `true`                  |
| `disableSnap?`              | Disable the snap animation.                                                                                                                                                                                                                                                             | `false`                 |
| `renderTabBar?`             | Same as [renderTabBar](https://github.com/satya164/react-native-tab-view#rendertabbar) of the original [TabView](https://github.com/satya164/react-native-tab-view#tabview), but with the additional `isGliding` and `preventTabPressOnGliding` properties.                             | `undefined`             |
| `snapThreshold?`            | Percentage of header height to make the snap effect. A number between 0 and 1.                                                                                                                                                                                                          | `0.5`                   |
| `snapTimeout?`              | How long to wait before initiating the snap effect, in milliseconds.                                                                                                                                                                                                                    | `250`                   |
| `onHeaderHeightChange?`     | Callback fired when the `headerHeight` state value inside `CollapsibleTabView` will be updated in the `onLayout` event from the tab/header container.<br/><br/> Useful to call layout animations. Example:<br/><br/><pre lang="js">() => {LayoutAnimation.configureNext(preset)};</pre> | `undefined`             |
| `routeKeyProp?`             | The property from the `routes` map to use for the active route key.                                                                                                                                                                                                                     | `key`                   |

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

| value                   | description                                                                                                                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ref`                   | Function to get ref from scrollable components inside the scene, and track in the Collapsible Tab View.                                                                                                                     |
| `onScroll`              | Scroll event, enabled only for the focused route.                                                                                                                                                                           |
| `scrollEnabled`         | Disable scroll for unfocused routes is optional, but prevents weird/delayed animations if the user changes tabs and quickly start scrolling the new tab, before the animated value starting to track the new focused route. |
| `contentContainerStyle` | Content container style with `paddingTop` and `minHeight`.                                                                                                                                                                  |
| `progressViewOffset`    | Needed for the loading indicator to show correctly on android.                                                                                                                                                              |
| `onMomentumScrollBegin` | Callback to set `isGliding` to `true`.                                                                                                                                                                                      |
| `onScrollEndDrag`       | Callback to sync the scroll of unfocused routes.                                                                                                                                                                            |
| `onMomentumScrollEnd`   | Callback to sync the scroll of unfocused routes.                                                                                                                                                                            |

### `createMaterialCollapsibleTopTabNavigator`

Same API as the [createMaterialTopTabNavigator (not-collapsible)](https://reactnavigation.org/docs/material-top-tab-navigator#props), with aditional `collapsibleOptions` prop, extending all props of [CollapsibleTabView](#collapsibletabview).

## Contributing

While developing, you can run the [example app](/example/README.md) to test your changes.

Please follow the [angular commit message format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).

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
