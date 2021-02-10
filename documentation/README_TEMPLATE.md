# react-native-collapsible-tab-view

[![Build Status][build-badge]][build]
[![Version][version-badge]][package]
[![MIT License][license-badge]][license]
[![runs with expo][expo-badge]][expo]

> This is the `@next` documentation. [See the v3 for latest stable version](https://github.com/PedroBern/react-native-collapsible-tab-view/tree/v3).

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
    - [Tabs.ScrollView](#tabsscrollview)
  - [Hooks](#hooks)
    - [useCollapsibleStyle](#usecollapsiblestyle)
    - [useTabNameContext](#usetabnamecontext)
  - [Default Tab Bar](#default-tab-bar)
    - [MaterialTabBar](#materialtabbar)
    - [MaterialTabItem](#materialtabitem)
- [Known issues](#known-issues)
  - [Android FlatList pull to refresh](#android-flatlist-pull-to-refresh)
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
yarn add react-native-collapsible-tab-view@next
```

Then, add Reanimated v2, [follow the official installation guide](https://docs.swmansion.com/react-native-reanimated/docs/next/installation).

# Quick Start

```tsx
$QUICK_START_CODE
```

# Guides

## Scroll on header

If you want to allow scrolling from the header:

- If the `HeaderComponent` **doesn't** contain touchables set `pointerEvents='none'`
- If `HeaderComponent` **does** contain touchables set `pointerEvents='box-none'` for them to work.

  _Note: With this setting any child component that should **not** respond to touches (e.g. `<Image />`) needs to have `pointerEvents` set to `'none'`. Otherwise it can become the target of a touch gesture on iOS devices and thereby preventing scrolling._

# API reference

## Core

$CORE_API

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

### useTabNameContext

Access the parent tab name from any deep component.

```tsx
const tabName = useTabNameContext()
```

## Default Tab Bar

$TAB_BAR_API

# Known issues

## Android FlatList pull to refresh

See [this open issue](https://github.com/software-mansion/react-native-reanimated/issues/1703). We use [scrollTo](https://docs.swmansion.com/react-native-reanimated/docs/next/api/nativeMethods/scrollTo) to synchronize the unfocused tabs, it's supposed to work only with `ScrollView`, but works great with `FlatList`, until the `RefreshControl` is added. Note that this happens only to android.

**Workaround**: see the `Android Shared Pull To Refresh` example in the expo app. You can have a single pull to refresh for the `Tabs.Container`.

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
