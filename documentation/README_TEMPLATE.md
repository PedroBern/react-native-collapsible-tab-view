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

## 🚀 Version 6 released with Reanimated v3 support.


Collapsible Tab View for React Native, with [Reanimated](https://github.com/software-mansion/react-native-reanimated).

- Checkout the [examples](https://github.com/PedroBern/react-native-collapsible-tab-view/tree/main/example) for the source code of the Expo app.


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

# Installation

Open a Terminal in the project root and run:

```sh
yarn add react-native-collapsible-tab-view react-native-pager-view
```

Then, add Reanimated v3, [follow the official installation guide](https://docs.swmansion.com/react-native-reanimated/docs/next/installation).

# Quick Start

```tsx
$QUICK_START_CODE
```

# Guides

## Scrolling on the Header

If you want to enable scrolling from the header, follow these steps:

- If the `HeaderComponent` **does not** contain touchable components, set the `pointerEvents` prop to `'none'`.
- If the `HeaderComponent` **does** contain touchable components, set the `pointerEvents` prop to `'box-none'` to ensure they function properly.

Note: If any child component within the `HeaderComponent` should **not** respond to touches, such as an `<Image />` element, set its `pointerEvents` prop to `'none'`. Otherwise, it may unintentionally become the target of a touch gesture on iOS devices and prevent scrolling.

# API Reference

## Core

$CORE_API

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

Hook to access some key styles. You can use this to get the progessViewOffset and pass to the refresh control of scroll view.

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

The `useAnimatedTabIndex` hook returns an animated value representing the current tab index. This value is a floating-point number because the tab view can be in between panes while swiping.

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

$TAB_BAR_API

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
