# react-native-collapsible-tab-view

[![Build Status][build-badge]][build]
[![Version][version-badge]][package]
[![MIT License][license-badge]][license]
[![runs with expo][expo-badge]][expo]

> Due to time constraints we weren't able to finish the documentation yet. You can navigate through the code and examples.

- [Expo app](#expo-app)
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Scroll on header](#scroll-on-header)
- [API reference](#api-reference)
  - [createCollapsibleTabs](#createcollapsibletabs)
    - [Tabs.Container](#tabscontainer)
    - [Tabs.Lazy](#tabslazy)
    - [Tabs.FlatList](#tabsflatlist)
    - [Tabs.ScrollView](#tabsscrollview)
    - [useTabsContext](#usetabscontext)
    - [useCollapsibleStyle](#usecollapsiblestyle)
    - [useTabNameContext](#usetabnamecontext)
  - [Default Tab Bar](#default-tab-bar)
    - [MaterialTabBar](#materialtabbar)
    - [MaterialTabItem](#materialtabitem)
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
- Lazy support with fade-in animation
- DiffClamp header
- Interpolated header
- Scroll snap (with interpolated header)
- Animated snap (with diffClamp header)
- Scrollable tabs, inspired by the [react-native-tab-view](https://github.com/satya164/react-native-tab-view) tab bar
- Support horizontal and vertical window

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
} from 'react-native-collapsible-tab-view'
import { useAnimatedRef } from 'react-native-reanimated'

type TabNames = 'A' | 'B'

const { useTabsContext, ...Tabs } = createCollapsibleTabs<TabNames>()

const HEADER_HEIGHT = 250

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
      HeaderComponent={Header}
      headerHeight={HEADER_HEIGHT} // optional
      refMap={refMap}
    >
      <ScreenA />
      <ScreenB />
    </Tabs.Container>
  )
}

const ScreenB = () => {
  return (
    <Tabs.ScrollView>
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
      data={[0, 1, 2, 3, 4]}
      renderItem={renderItem}
      keyExtractor={(v) => v + ''}
    />
  )
}

const Header = () => {
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

### createCollapsibleTabs

Basic usage looks like this:

```tsx
import { createCollapsibleTabs, } from 'react-native-collapsible-tab-view'

type MyTabs = 'tab0' | 'tab1'

const {
 Container,
 FlatList,
 ScrollView,
 useTabsContext
 useTabNameContext,
 useCollapsibleStyle,
} = createCollapsibleTabs<MyTabs>()
```

or
```tsx
const { useTabsContext, , ...Tabs } = createCollapsibleTabs<MyTabs>()
```

use like this:
```tsx
<Tabs.Container {...props} />
<Tabs.FlatList {...props} />
<Tabs.ScrollView {...props} />
```


#### Tabs.Container

Basic usage looks like this:

```tsx
import {
   RefComponent,
   ContainerRef,
   TabBarProps,
} from 'react-native-collapsible-tab-view'
import { useAnimatedRef } from 'react-native-reanimated'

type MyTabs = 'article' | 'contacts' | 'albums'

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
       headerHeight={HEADER_HEIGHT} // optional
       refMap={refMap}
     >
       { components returning Tabs.ScrollView || Tabs.FlatList }
     </Tabs.Container>
   )
}
```

##### Props

|name|type|default|description|
|:----:|:----:|:----:|----|
|HeaderComponent|\(\(props: TabBarProps&lt;string&gt;\) =&gt; ReactElement&lt;any, string | \(\(props: any\) =&gt; ReactElement&lt;any, string | ... | \(new \(props: any\) =&gt; Component&lt;any, any, any&gt;\)&gt; | null\) | \(new \(props: any\) =&gt; Component&lt;...&gt;\)&gt;\) | undefined|||
|TabBarComponent|\(\(props: TabBarProps&lt;string&gt;\) =&gt; ReactElement&lt;any, string | \(\(props: any\) =&gt; ReactElement&lt;any, string | ... | \(new \(props: any\) =&gt; Component&lt;any, any, any&gt;\)&gt; | null\) | \(new \(props: any\) =&gt; Component&lt;...&gt;\)&gt;\) | undefined|null||
|cancelLazyFadeIn|boolean | undefined|||
|cancelTranslation|boolean | undefined|||
|containerRef|RefObject&lt;ContainerRef&gt;|||
|containerStyle|StyleProp&lt;ViewStyle&gt;|||
|diffClampEnabled|boolean | undefined|false||
|headerContainerStyle|StyleProp&lt;AnimateStyle&lt;ViewStyle&gt;&gt;|||
|headerHeight|number | undefined||Is optional, but will optimize the first render.|
|initialTabName|string | undefined|||
|lazy|boolean | undefined||If lazy, will mount the screens only when the tab is visited. There is a default fade in transition.|
|onIndexChange|OnTabChangeCallback&lt;string&gt; | undefined||Callback fired when the index changes. It receives the previous and current index and tabnames.|
|pagerProps|Pick&lt;FlatListProps&lt;number&gt;, "ItemSeparatorComponent" | "ListEmptyComponent" | "ListFooterComponent" | "ListFooterComponentStyle" | "ListHeaderComponent" | ... 129 more ... | "persistentScrollbar"&gt; | undefined||Props passed to the horiztontal flatlist. If you want for example to disable swiping, you can pass { scrollEnabled: false }`|
|refMap|Record&lt;string, Ref&gt;|||
|snapEnabled|boolean | undefined|false||
|snapThreshold|number | undefined|0.5|Percentage of header height to make the snap effect. A number between 0 and 1.|
|tabBarHeight|number | undefined||Is optional, but will optimize the first render.|


#### Tabs.Lazy

Typically used internally, but if you want to mix lazy and regular screens you can wrap the lazy ones with this component.

##### Props

|name|type|
|:----:|:----:|
|cancelLazyFadeIn|boolean | undefined|
|startMounted|boolean | undefined|


#### Tabs.FlatList

Use like a regular flatlist.


#### Tabs.ScrollView

Use like a regular scrollview.


#### useTabsContext

Hook exposing some useful variables.

```tsx
const { focusedTab, ...rest } = useTabsContext()
```

##### Values

|name|type|default|description|
|:----:|:----:|:----:|----|
|accDiffClamp|SharedValue&lt;number&gt;|||
|accScrollY|SharedValue&lt;number&gt;|||
|containerHeight|number | undefined|||
|diffClampEnabled|boolean|false||
|endDrag|SharedValue&lt;number&gt;||Used internally.|
|focusedTab|SharedValue&lt;string&gt;||Name of the current focused tab.|
|headerHeight|number|||
|index|SharedValue&lt;number&gt;|||
|indexDecimal|SharedValue&lt;number&gt;|||
|isGliding|SharedValue&lt;boolean&gt;|||
|isScrolling|SharedValue&lt;number&gt;|||
|isSnapping|SharedValue&lt;boolean&gt;|||
|offset|SharedValue&lt;number&gt;|||
|oldAccScrollY|SharedValue&lt;number&gt;|||
|refMap|Record&lt;string, Ref&gt;|||
|scrollX|SharedValue&lt;number&gt;||Scroll x position of the tabs container.|
|scrollY|SharedValue&lt;number\[\]&gt;|||
|scrollYCurrent|SharedValue&lt;number&gt;||Scroll position of current tab.|
|snapEnabled|boolean|false||
|snapThreshold|number|0.5||
|snappingTo|SharedValue&lt;number&gt;||Used internally.|
|tabBarHeight|number|||
|tabNames|SharedValue&lt;string\[\]&gt;||Tab names, same as the keys of `refMap`.|


#### useCollapsibleStyle

Hook to access some key styles that make the whole think work.

You can use this to get the progessViewOffset and pass to the refresh control of scroll view.

##### Values

|name|type|
|:----:|:----:|
|contentContainerStyle|{ minHeight: number; paddingTop: number; }|
|progressViewOffset|number|
|style|{ width: number; }|



### Default Tab Bar

#### MaterialTabBar

##### Props

|name|type|default|
|:----:|:----:|:----:|
|TabItemComponent|\(\(props: MaterialTabItemProps&lt;any&gt;\) =&gt; ReactElement&lt;any, string | \(\(props: any\) =&gt; ReactElement&lt;any, string | ... | \(new \(props: any\) =&gt; Component&lt;any, any, any&gt;\)&gt; | null\) | \(new \(props: any\) =&gt; Component&lt;...&gt;\)&gt;\) | undefined|null|
|containerRef|RefObject&lt;ContainerRef&gt;||
|focusedTab|SharedValue&lt;any&gt;||
|getLabelText|\(\(name: any\) =&gt; string\) | undefined|\(name\) =&gt; name.toUpperCase\(\)|
|index|SharedValue&lt;number&gt;||
|indexDecimal|SharedValue&lt;number&gt;||
|indicatorStyle|StyleProp&lt;AnimateStyle&lt;ViewStyle&gt;&gt;||
|onTabPress|\(name: any\) =&gt; void||
|refMap|Record&lt;any, Ref&gt;||
|scrollEnabled|boolean | undefined|false|
|style|StyleProp&lt;ViewStyle&gt;||


#### MaterialTabItem

Any additional props are passed to the pressable component.

##### Props

|name|type|default|description|
|:----:|:----:|:----:|----|
|ItemElement|\(\(props: { name: any; indexDecimal: SharedValue&lt;number&gt;; }\) =&gt; ReactElement&lt;any, string | \(\(props: any\) =&gt; ReactElement&lt;any, string | ... | \(new \(props: any\) =&gt; Component&lt;any, any, any&gt;\)&gt; | null\) | \(new \(props: any\) =&gt; Component&lt;...&gt;\)&gt; | null\) | \(new \(props: { ...; }\) =&gt; Component&lt;...&gt;\) | undefined|||
|inactiveOpacity|number | undefined|0.7||
|index|number|||
|indexDecimal|SharedValue&lt;number&gt;|||
|label|string|||
|labelStyle|StyleProp&lt;AnimateStyle&lt;TextStyle&gt;&gt;|||
|name|any|||
|onLayout|\(\(\(event: LayoutChangeEvent\) =&gt; void\) & \(\(event: LayoutChangeEvent\) =&gt; void\)\) | undefined||Invoked on mount and layout changes with {nativeEvent: { layout: {x, y, width, height}}}.|
|onPress|\(name: any\) =&gt; void|||
|pressColor|string | undefined|\#DDDDDD||
|pressOpacity|number | undefined|Platform.OS === 'ios' ? 0.2 : 1||
|scrollEnabled|boolean | undefined|||
|style|ViewStyle | \(ViewStyle & false\) | \(ViewStyle & number & { \_\_registeredStyleBrand: ViewStyle; }\) | \(ViewStyle & RecursiveArray&lt;false | ViewStyle | RegisteredStyle&lt;...&gt; | null | undefined&gt;\) | \(ViewStyle & \(\(state: Readonly&lt;...&gt;\) =&gt; StyleProp&lt;...&gt;\)\) | undefined||Either view styles or a function that receives a boolean reflecting whether the component is currently pressed and returns view styles.|




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

### Documentation changes

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
