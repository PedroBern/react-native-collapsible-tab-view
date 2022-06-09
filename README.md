# react-native-collapsible-tab-view

[![Build Status][build-badge]][build]
[![Version][version-badge]][package]
[![MIT License][license-badge]][license]
[![runs with expo][expo-badge]][expo]

- [Expo app](#expo-app)
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Guides](#guides)
  - [Scroll on header](#scroll-on-header)
- [API reference](#api-reference)
  - [Core](#core)
    - [Tabs.Container](#tabscontainer)
    - [Tabs.Lazy](#tabslazy)
    - [Tabs.FlatList](#tabsflatlist)
    - [Tabs.SectionList](#tabssectionlist)
    - [Tabs.ScrollView](#tabsscrollview)
    - [Ref](#ref)
  - [Hooks](#hooks)
    - [useCollapsibleStyle](#usecollapsiblestyle)
    - [useAnimatedTabIndex](#useanimatedtabindex)
    - [useFocusedTab](#usefocusedtab)
    - [useHeaderMeasurements](#useheadermeasurements)
  - [Default Tab Bar](#default-tab-bar)
    - [MaterialTabBar](#materialtabbar)
    - [MaterialTabItem](#materialtabitem)
- [Known issues](#known-issues)
  - [Android FlatList pull to refresh](#android-flatlist-pull-to-refresh)
  - [iOS FlatList/ SectionList stickyHeaders](#ios-flatlist-stickyheaderindices)
  - [ref.setIndex](#refsetIndex)
- [Alternative libraries](#alternative-libraries)
- [Contributing](#contributing)
  - [Documentation changes](#documentation-changes)

# Expo app

> If you are looking for the integration with [react-native-tab-view](https://github.com/satya164/react-native-tab-view) and/or [react-navigation](https://github.com/react-navigation/react-navigation), you need to use the [v2](https://github.com/PedroBern/react-native-collapsible-tab-view/tree/v2).

Collapsible Tab View for React Native, with [Reanimated](https://github.com/software-mansion/react-native-reanimated).

- [View it with Expo](https://expo.io/@pedrobern/react-native-collapsible-tab-view-demos).
- Checkout the [examples](https://github.com/PedroBern/react-native-collapsible-tab-view/tree/main/example) for the source code of the Expo app.

<a href="https://expo.io/@pedrobern/react-native-collapsible-tab-view-demos"><img src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=exp://exp.host/@pedrobern/react-native-collapsible-tab-view-demos" height="200px" width="200px"></a>

**Credits**

The [react-native-tab-view](https://github.com/satya164/react-native-tab-view) example app was used as template for the demos.

# Demo

|                                                     Default                                                      |                                                     Snap                                                      |                                                revealHeaderOnScroll                                                |                                               revealHeaderOnScroll + Snap                                               |
| :--------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/PedroBern/react-native-collapsible-tab-view/raw/main/demo/default.gif" width="360"> | <img src="https://github.com/PedroBern/react-native-collapsible-tab-view/raw/main/demo/snap.gif" width="360"> | <img src="https://github.com/PedroBern/react-native-collapsible-tab-view/raw/main/demo/diffClamp.gif" width="360"> | <img src="https://github.com/PedroBern/react-native-collapsible-tab-view/raw/main/demo/diffClamp_snap.gif" width="360"> |

<!-- todo -->

# Features

- Animations and interactions on the UI thread
- Highly customizable
- Fully typed with [TypeScript](https://typescriptlang.org)
- Lazy support with fade-in animation
- DiffClamp header
- Interpolated header
- Scroll snap (with interpolated header)
- Animated snap (with diffClamp header)
- Scrollable tabs, inspired by the [react-native-tab-view](https://github.com/satya164/react-native-tab-view) tab bar
- Support horizontal and vertical window

# Installation

Open a Terminal in the project root and run:

```sh
yarn add react-native-collapsible-tab-view@rc react-native-pager-view@5
```

Then, add Reanimated v2, [follow the official installation guide](https://docs.swmansion.com/react-native-reanimated/docs/next/installation).

# Quick Start

```tsx
import React from 'react'
import { View, StyleSheet, ListRenderItem } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'

const HEADER_HEIGHT = 250

const DATA = [0, 1, 2, 3, 4]
const identity = (v: unknown): string => v + ''

const Header = () => {
  return <View style={styles.header} />
}

const Example: React.FC = () => {
  const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    )
  }, [])

  return (
    <Tabs.Container
      renderHeader={Header}
      headerHeight={HEADER_HEIGHT} // optional
    >
      <Tabs.Tab name="A">
        <Tabs.FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={identity}
        />
      </Tabs.Tab>
      <Tabs.Tab name="B">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  )
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

# Guides

## Scroll on header

If you want to allow scrolling from the header:

- If the `HeaderComponent` **doesn't** contain touchables set `pointerEvents='none'`
- If `HeaderComponent` **does** contain touchables set `pointerEvents='box-none'` for them to work.

  _Note: With this setting any child component that should **not** respond to touches (e.g. `<Image />`) needs to have `pointerEvents` set to `'none'`. Otherwise it can become the target of a touch gesture on iOS devices and thereby preventing scrolling._

# API reference

## Core

### Tabs.Container

Basic usage looks like this:

```tsx
import { Tabs } from 'react-native-collapsible-tab-view'

const Example = () => {
   return (
     <Tabs.Container renderHeader={MyHeader}>
       <Tabs.Tab name="A">
         <ScreenA />
       </Tabs.Tab>
       <Tabs.Tab name="B">
         <ScreenB />
       </Tabs.Tab>
     </Tabs.Container>
   )
}
```

#### Props

|name|type|default|description|
|:----:|:----:|:----:|:----:|
|allowHeaderOverscroll|`boolean \| undefined`|`false`|Whether the header moves down during overscrolling (for example on pull-to-refresh on iOS) or sticks to the top|
|cancelLazyFadeIn|`boolean \| undefined`|||
|cancelTranslation|`boolean \| undefined`|||
|containerStyle|`StyleProp<ViewStyle>`|||
|headerContainerStyle|`StyleProp<AnimateStyle<ViewStyle>>`|||
|headerHeight|`number \| undefined`||Is optional, but will optimize the first render.|
|initialTabName|`string \| undefined`|||
|lazy|`boolean \| undefined`||If lazy, will mount the screens only when the tab is visited. There is a default fade in transition.|
|minHeaderHeight|`number \| undefined`||Header minimum height when collapsed|
|onIndexChange|`((index: number) => void) \| undefined`||Callback fired when the index changes. It receives the current index.|
|onTabChange|`(data: { prevIndex: number index: number prevTabName: T tabName: T }) => void`||Callback fired when the tab changes. It receives the previous and current index and tabnames.|
|pagerProps|`Omit<FlatListProps<number>, 'data' \| 'keyExtractor' \| 'renderItem' \| 'horizontal' \| 'pagingEnabled' \| 'onScroll' \| 'showsHorizontalScrollIndicator' \| 'getItemLayout'>`||Props passed to the pager. If you want for example to disable swiping, you can pass `{ scrollEnabled: false }`|
|renderHeader|`(props: TabBarProps<TabName>) => React.ReactElement \| null`|||
|renderTabBar|`(props: TabBarProps<TabName>) => React.ReactElement \| null`|`(props: TabBarProps<TabName>) => MaterialTabBar`||
|revealHeaderOnScroll|`boolean \| undefined`||Reveal header when scrolling down. Implements diffClamp.|
|snapThreshold|`number \| null \| undefined`|`null`|Percentage of header height to define as the snap point. A number between 0 and 1, or `null` to disable snapping.|
|tabBarHeight|`number \| undefined`||Is optional, but will optimize the first render.|
|width|`number \| undefined`||Custom width of the container. Defaults to the window width.|

### Tabs.Tab

Wrap your screens with `Tabs.Tab`. Basic usage looks like this:

```tsx
<Tabs.Container ...>
  <Tabs.Tab name="A" label="First Tab">
   <ScreenA />
  </Tabs.Tab>
  <Tabs.Tab name="B">
   <ScreenA />
  </Tabs.Tab>
</Tabs.Container>
```

#### Props

|name|type|
|:----:|:----:|
|label|`string \| ((props: TabItemProps<T>) => ReactNode) \| undefined`|
|name|`T`|

### Tabs.Lazy

Typically used internally, but if you want to mix lazy and regular screens you can wrap the lazy ones with this component.

#### Props

|name|type|
|:----:|:----:|
|cancelLazyFadeIn|`boolean \| undefined`|
|startMounted|`boolean \| undefined`|

### Tabs.FlatList

Use like a regular FlatList.

### Tabs.ScrollView

Use like a regular ScrollView.

### Tabs.SectionList

Use like a regular SectionList.



### Ref

You can pass a ref to `Tabs.Container`.

```tsx
const ref = React.useRef()
<Tabs.Container ref={ref}>
```

|     method      |             type             |
| :-------------: | :--------------------------: |
|    jumpToTab    |    `(name: T) => boolean`    |
|    setIndex     | `(index: number) => boolean` |
|  getFocusedTab  |          `() => T`           |
| getCurrentIndex |        `() => number`        |

## Hooks

### useCollapsibleStyle

Hook to access some key styles that make the whole think work. You can use this to get the progessViewOffset and pass to the refresh control of scroll view.

```tsx
const {
  contentContainerStyle,
  progressViewOffset,
  style,
} = useCollapsibleStyle()
```

#### Values

|         name          |                     type                     |
| :-------------------: | :------------------------------------------: |
| contentContainerStyle | `{ minHeight: number; paddingTop: number; }` |
|  progressViewOffset   |                   `number`                   |
|         style         |             `{ width: number; }`             |

### useAnimatedTabIndex

Returns an animated value representing the current tab index, as a floating point number.

```tsx
const tabIndex = useAnimatedTabIndex()
```

### useFocusedTab

Returns the currently focused tab name.

```tsx
const focusedTab = useFocusedTab()
```

### useHeaderMeasurements

Returns the top distance and the header height. See the animated header example in the example folder.

```tsx
const { top, height } = useHeaderMeasurements()
```

### useCurrentTabScrollY

Returns the vertical scroll position of the current tab as an Animated SharedValue.

Because this library requires handling `onScroll` for its functionality, this is the only way to react to changes to the scroll position of the underlying scrollable component.

```tsx
const scrollY = useCurrentTabScrollY()
```


## Default Tab Bar

### MaterialTabItem

Any additional props are passed to the pressable component.

#### Props

|name|type|description|
|:----:|:----:|:----:|
|activeColor|`string \| undefined`|Color applied to the label when active|
|inactiveColor|`string \| undefined`|Color applied to the label when inactive|
|inactiveOpacity|`number \| undefined`||
|index|`number`||
|indexDecimal|`SharedValue<number>`||
|label|`string \| ((props: TabItemProps<T>) => ReactNode)`||
|labelStyle|`StyleProp<AnimateStyle<TextStyle>>`|Style to apply to the tab item label|
|name|`T`||
|onLayout|`(((event: LayoutChangeEvent) => void) & ((event: LayoutChangeEvent) => void)) \| undefined`|Invoked on mount and layout changes with {nativeEvent: { layout: {x, y, width, height}}}.|
|onPress|`(name: T) => void`||
|pressColor|`string \| undefined`||
|pressOpacity|`number \| undefined`||
|scrollEnabled|`boolean \| undefined`||
|style|`StyleProp<ViewStyle>`|Either view styles or a function that receives a boolean reflecting whether the component is currently pressed and returns view styles.|



# Known issues

## Android FlatList pull to refresh

See [this open issue](https://github.com/software-mansion/react-native-reanimated/issues/1703). We use [scrollTo](https://docs.swmansion.com/react-native-reanimated/docs/next/api/nativeMethods/scrollTo) to synchronize the unfocused tabs, it's supposed to work only with `ScrollView`, but works great with `FlatList`, until the `RefreshControl` is added. Note that this happens only to android.

**Workaround**: see the `Android Shared Pull To Refresh` example in the expo app. You can have a single pull to refresh for the `Tabs.Container`.

## iOS FlatList stickyHeaderIndices and iOS SectionList stickySectionHeadersEnabled

When you use the stickyHeaderIndices prop on a FlatList or stickySectionHeadersEnabled on a SectionList, the sticky elements don't scroll up when the header collapses. This happens only on iOS.

See [#136](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/136).

## ref.setIndex

This isn't an issue, but you need to know. When using `containerRef.current.setIndex(i)`, if setting to the current index, the screen will scroll to the top. You can prevent this behavior like this:

```ts
const index = pageRef.current?.getCurrentIndex()
if (index !== nextIndex) {
  pageRef.current?.setIndex(nextIndex)
}
```

# Alternative libraries

If you don't need a full-featured tab view, check out the other option, a simple segmented control / material tab bar without swiping or snapping, using just the react native Animated API.

- [react-native-collapsible-segmented-view](https://github.com/PedroBern/react-native-collapsible-segmented-view)

# Contributing

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

## Documentation changes

Edit the [README_TEMPLATE](https://github.com/PedroBern/react-native-collapsible-tab-view/tree/main/documentation/README_TEMPLATE.md), or update the docstrings inside the `src` folder, and run:

```sh
yarn docs
```

<!-- badges -->

[build-badge]: https://img.shields.io/circleci/build/github/PedroBern/react-native-collapsible-tab-view/main.svg?style=flat-square
[build]: https://app.circleci.com/pipelines/github/PedroBern/react-native-collapsible-tab-view
[version-badge]: https://img.shields.io/npm/v/react-native-collapsible-tab-view.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-native-collapsible-tab-view
[license-badge]: https://img.shields.io/npm/l/react-native-collapsible-tab-view.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[expo-badge]: https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000
[expo]: https://github.com/expo/expo
