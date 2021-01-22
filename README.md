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
  - [createCollapsibleTabs](#createcollapsibletabs)
  - [Tabs.Container](#tabscontainer)
  - [Tabs.ScrollView and Tabs.FlatList](#tabsscrollview-and-tabsflatlist)
  - [useTabsContext](#usetabscontext)
- [Contributing](#contributing)

## Expo app

> If you are looking for the integration with [react-native-tab-view](https://github.com/satya164/react-native-tab-view) and/or [react-navigation](https://github.com/react-navigation/react-navigation), you need to use the [v2](https://github.com/PedroBern/react-native-collapsible-tab-view/tree/v2), we are currenlty on v3.

Collapsible Tab View for React Native, with [Reanimated](https://github.com/software-mansion/react-native-reanimated).

- [View it with Expo](https://expo.io/@pedrobern/react-native-collapsible-tab-view-demos).
- Checkout the [examples](https://github.com/PedroBern/react-native-collapsible-tab-view/tree/main/example) for the source code of the Expo app.

<a href="https://expo.io/@pedrobern/react-native-collapsible-tab-view-demos"><img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=exp://exp.host/@pedrobern/react-native-collapsible-tab-view-demos" height="200px" width="200px"></a>

**Credits**

The [react-native-tab-view](https://github.com/satya164/react-native-tab-view) example app was used as template for the demos.

## Demo

|                                                     Default                                                      |                                                     Snap                                                      |                                                     DiffClamp                                                      |                                                    DiffClamp + Snap                                                     |
| :--------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/PedroBern/react-native-collapsible-tab-view/raw/main/demo/default.gif" width="360"> | <img src="https://github.com/PedroBern/react-native-collapsible-tab-view/raw/main/demo/snap.gif" width="360"> | <img src="https://github.com/PedroBern/react-native-collapsible-tab-view/raw/main/demo/diffClamp.gif" width="360"> | <img src="https://github.com/PedroBern/react-native-collapsible-tab-view/raw/main/demo/diffClamp_snap.gif" width="360"> |

<!-- todo -->

## Features

- Animations and interactions on the UI thread
- Highly customizable
- Fully typed with [TypeScript](https://typescriptlang.org)
- DiffClamp tabs
- Interpotated tabs
- Scroll snap (with interpotated tabs)
- Animated snap (with diffClamp tabs)

## Installation

Open a Terminal in the project root and run:

```sh
yarn add react-native-collapsible-tab-view
```

Then, add Reanimated v2, [follow the official installation guide](https://docs.swmansion.com/react-native-reanimated/docs/next/installation).

## Quick Start

```tsx
import React from 'react'
import { View, StyleSheet, ListRenderItem } from 'react-native'
import {
  RefComponent,
  ContainerRef,
  createCollapsibleTabs,
  TabBarProps as TabProps,
} from 'react-native-collapsible-tab-view'
import { useAnimatedRef } from 'react-native-reanimated'

// see the examples folder
import TabBar from './MaterialTabBar'

type TabNames = 'A' | 'B'
type HeaderProps = TabProps<TabNames>

const { useTabsContext, ...Tabs } = createCollapsibleTabs<TabNames>()

const HEADER_HEIGHT = 250
const TABBAR_HEIGHT = 48

const Example: React.FC = () => {
  const containerRef = useAnimatedRef<ContainerRef>()
  const tabARef = useAnimatedRef<RefComponent>()
  const tabBRef = useAnimatedRef<RefComponent>()

  const [refMap] = React.useState({
    A: tabARef,
    B: tabBRef,
  })

  return (
    <Tabs.Container
      containerRef={containerRef}
      TabBarComponent={TabBar}
      HeaderComponent={Header}
      headerHeight={HEADER_HEIGHT}
      tabBarHeight={TABBAR_HEIGHT}
      refMap={refMap}
    >
      <ScreenA />
      <ScreenB />
    </Tabs.Container>
  )
}

const ScreenB = () => {
  return (
    <Tabs.ScrollView name="B">
      <View style={[styles.box, styles.boxA]} />
      <View style={[styles.box, styles.boxB]} />
    </Tabs.ScrollView>
  )
}

const renderItem: ListRenderItem<number> = ({ index }) => {
  return (
    <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
  )
}

const ScreenA = () => {
  return (
    <Tabs.FlatList
      name="A"
      data={[0, 1, 2, 3, 4]}
      renderItem={renderItem}
      keyExtractor={(v) => v + ''}
    />
  )
}

const Header: React.FC<HeaderProps> = () => {
  return <View style={styles.header} />
}

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
})

export default Example
```

## Scroll on header

If you want to allow scrolling from the header:

- If the `HeaderComponent` **doesn't** contain touchables set `pointerEvents='none'`
- If `HeaderComponent` **does** contain touchables set `pointerEvents='box-none'` for them to work.
  _Note: With this setting any child component that should **not** respond to touches (e.g. `<Image />`) needs to have `pointerEvents` set to `'none'`. Otherwise it can become the target of a touch gesture on iOS devices and thereby preventing scrolling._

## API reference

### `createCollapsibleTabs`

Basic usage looks like this:

```tsx
type MyTabs = 'tab0' | 'tab1'

const {
  Container,
  FlatList,
  ScrollView,
  useTabsContext
} = createCollapsibleTabs<MyTabs>()

// or
const { useTabsContext, ...Tabs } = createCollapsibleTabs<MyTabs>()

// use like this:
<Tabs.Container {...props} />
<Tabs.FlatList name='tab0' {...props} />
<Tabs.ScrollView name='tab1' {...props} />

```

### `Tabs.Container`

Basic usage looks like this:

```tsx
import {
  CollapsibleProps,
  RefComponent,
  ContainerRef,
  TabBarProps,
} from 'react-native-collapsible-tab-view'
import { useAnimatedRef } from 'react-native-reanimated'

type MyTabs = 'article' | 'contacts' | 'albums'

// see the examples folder
const MyTabBar: React.FC<TabBarProps<MyTabs>> = (props) => {...}
const MyHeader: React.FC<TabBarProps<MyTabs>> = (props) => {...}

const Example: React.FC<Props> = () => {
  const containerRef = useAnimatedRef<ContainerRef>()
  const tab0Ref = useAnimatedRef<RefComponent>()
  const tab1Ref = useAnimatedRef<RefComponent>()

  const [refMap] = React.useState({
    tab0: tab0Ref,
    tab1: tab1Ref,
  })

  return (
    <Tabs.Container
      containerRef={containerRef}
      HeaderComponent={MyHeader}
      TabBarComponent={MyTabBar}
      headerHeight={HEADER_HEIGHT}
      tabBarHeight={TABBAR_HEIGHT}
      refMap={refMap}
    >
      { /* components returning Tabs.ScrollView || Tabs.FlatList */ }
    </Tabs.Container>
  )
}
```

#### Props

| prop                    | description                                                                                    | default |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ------- | --- | --- |
| `containerRef`          | Must be provided with `useAnimatedRef<ContainerRef>()` .                                       |         |
| `refMap`                | Map of tab names and refs, must be the same order as the container children.                   |         |
| `children`              | Array of react elements. Each child should have a `Tabs.ScrollView` or `Tabs.FlatList` inside. |         |     |     |
| `headerHeight?`         | -                                                                                              |         |
| `tabBarHeight?`         | -                                                                                              |         |
| `snapEnabled?`          | Enable snapping. Do scroll snapping if `!diffClampEnabled`, otherwise, do animated snapping.   | `false` |
| `diffClampEnabled?`     | Enable diff clamp.                                                                             | false   |
| `snapThreshold?`        | Percentage of header height to make the snap effect. A number between 0 and 1.                 | `0.5`   |
| `HeaderComponent?`      | React component to render above the tabbar.                                                    |         |
| `TabBarComponent?`      | React component to render above tab scenes.                                                    |         |
| `headerContainerStyle?` | Styles applied to the header and tabbar container                                              |         |
| `containerStyle?`       | Styles applied to the view container.                                                          |         |
| `cancelTranslation?`    | This will cancel the collapsible effect, and render a static tabbar / header.                  | `false` |

### `Tabs.ScrollView` and `Tabs.FlatList`

Basic usage looks like this:

```tsx
const ScrollViewScreen: React.FC<object> = () => {
  return (
    <Tabs.ScrollView name="myTabName0" {...scrollViewProps}>
      {children}
    </Tabs.ScrollView>
  )
}

const FlatListScreen: React.FC<object> = () => {
  return <Tabs.FlatList<ItemType> name="myTabName1" {...flatListProps} />
}
```

#### Props

| prop      | description                                                                           |
| --------- | ------------------------------------------------------------------------------------- |
| name      | Name of the tab. Must be key of the `refMap` object provided to the `Tabs.Container`. |
| {...rest} | `ScrollView` or `FlatList` props.                                                     |

### `useTabsContext`

A hook to access the context.

```tsx
// iside your component
const { focusedTab, ...rest } = useTabsContext()
```

#### Props

| prop             | description                               | type                             |
| ---------------- | ----------------------------------------- | -------------------------------- | -------- |
| headerHeight     |                                           | `number`                         |
| tabBarHeight     |                                           | `number`                         |
| snapEnabled      |                                           | `boolean`                        |
| diffClampEnabled |                                           | `boolean`                        |
| snapThreshold    |                                           | `number`                         |
| refMap           |                                           | `Record<T, Ref>`                 |
| scrollYCurrent   | Scroll position of current tab.           | `Animated.SharedValue<number>`   |
| tabNames         | Tab names, same as the keys of `refMap`   | `Animated.SharedValue<T[]>`      |
| index            | Current tab index.                        | `Animated.SharedValue<number>`   |
| scrollY          | Array of the scroll position of each tab. | `Animated.SharedValue<number[]>` |
| oldAccScrollY    | Previous accumulted scrollY.              | `Animated.SharedValue<number>`   |
| accScrollY       | Current accumulated scrollY               | `Animated.SharedValue<number>`   |
| offset           | Offset.                                   | `Animated.SharedValue<number>`   |
| isScrolling      | If is scrolling.                          | `Animated.SharedValue<boolean    | number>` |
| focusedTab       | Current focused tab name.                 | `Animated.SharedValue<T>`        |
| accDiffClamp     | Accumulated diffClamp value.              | `Animated.SharedValue<number>`   |
| containerHeight? |                                           | ` number`                        |

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
