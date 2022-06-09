# [5.0.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v5.0.0-rc.1...v5.0.0-rc.10) (2022-06-29)

### Performance Improvements

* snap using animated reaction scroll ([5f11c61](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/5f11c610a3a8fbaea95edacb3e4c522cd5db8187))

### Bug Fixes

* prevent typescript error for conditional tabs ([749c27b](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/749c27b05ce6a158d320929e13dbbfa9d8c82b79))
* initial scroll position sometimes wrong on iOS ([e349941](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/e3499412ea660fd7c5445414adbd14cc840b44a0))
* initial scroll position if starting with undefined header height ([9378af6](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/9378af6a0f95ce59a3eab9ca786baa05bb8039ba))
* bring back pagerProps ([2137bbd](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/2137bbd5562becc3136c79c966a107c4239a120c))
* **ios:** scroll sync issues between tabs ([14dfc79](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/14dfc7995c6d56763d694eec3f373e0c2dc00ab5))

### Features

* custom label component ([51a7234](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/51a7234fec8f19f384ed771789d883aee247260f))
* `keepActiveTabCentered` property on scrollable MaterialTabBar to keep tab in the center ([6d35e31](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/6d35e3151355d35830a8387af642c5af5a13c54d))
* `useCurrentTabScrollY` ([73ee5d7](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/73ee5d7c5e2b470551a5ad1dedae68413d3d5da0))

### Code Refactoring

* remove obsolete HeaderComponent and FooterComponent ([cb2cb04](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/cb2cb04bbcf1dd86484c2a77f273e10ee6ceabbe))


### BREAKING CHANGES

* use `renderHeader` and `renderTabBar` instead of HeaderComponent and FooterComponent
* a peer dependency on `react-native-pager-view@5` is now required
* `useHeaderMeasurements` now returns the `height` as an `Animated.SharedValue`

## [4.5.2](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.5.1...v4.5.2) (2022-01-15)


### Bug Fixes

* edge case with tabs still scrolling to top ([#230](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/230)) ([dd13cbc](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/dd13cbc44fbcf49ff519c6f7e9fb8d3502cfe2db))

## [4.5.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.5.0...v4.5.1) (2022-01-15)


### Bug Fixes

* minimum height with allowHeaderOverscroll ([#229](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/229)) ([1e8ce9c](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/1e8ce9ce5481621c242b3178f8fbb73ee60a8109))

# [4.5.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.4.0...v4.5.0) (2022-01-15)


### Bug Fixes

* tabs should not scroll to top ([#205](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/205)) ([dd6d2ef](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/dd6d2efd97337ce29903650de3d072a32de540db))


### Features

* allow header to move down on pull to refresh on iOS ([#228](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/228)) ([d0e063b](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/d0e063b710b0d48b75443c8e97f32d45e19a171c))

# [4.4.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.3.0...v4.4.0) (2021-11-04)


### Features

* add `width` prop to `Tabs.Container` ([#208](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/208)) ([4b9e738](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/4b9e73881347dc205e8e0c95290314b165233150))

# [4.3.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.2.1...v4.3.0) (2021-10-03)


### Bug Fixes

* lint and typescript errors ([dc5fd39](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/dc5fd398451d1eeb795a07c239f1d1b939255709))
* tab indicator did not work correctly in RTL mode ([#193](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/193)) ([243848d](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/243848dd1f76b5e62524bd94a8a1a7d9f9416f75))


### Features

* SectionList support (without stickyHeaders for now) ([#201](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/201)) ([1571a62](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/1571a625eb3a2527acd3ba9a9267fb939b330a51))

## [4.2.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.2.0...v4.2.1) (2021-07-28)


### Bug Fixes

* animated header example ([#177](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/177)) ([ebfecd7](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/ebfecd77ebd50cae30f8b911202a068e41b5efd4))


### Performance Improvements

* optimize and reduce rerenders ([#186](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/186)) ([a9d2a44](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/a9d2a445fa59a46547e3be6afb1ed09f068ef2ac))

# [4.2.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.1.0...v4.2.0) (2021-05-28)


### Features

* add renderHeader and renderTabBar ([#154](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/154)) ([73af169](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/73af1692f88de0c525ebc6440ed592a5ff7e4fcf))


### Features

* support custom refresh control component ([273e0e7](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/273e0e7ff11d0b566e65bb2f0bf81e676bd99814))

## [4.0.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/list...v4.0.1) (2021-02-25)


### Bug Fixes

* rework contentHeights to use a shared value ([#146](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/146)) ([0cecd27](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/0cecd27155976a52e3ddf788507348bd8fcc5955))

# [4.0.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.11...v4.0.0) (2021-02-18)


### Features

* expose hooks ([06e693c](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/06e693c521b777546fea75e8e82ddb67acb240a1))

# [4.0.0-rc.11](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.10...v4.0.0-rc.11) (2021-02-18)


### Bug Fixes

* touchables not registering touches after scrolling ([5598b11](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/5598b11be2c0a5fb881c630084c9c55f1eb6afa3)), closes [#123](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/123)

# [4.0.0-rc.10](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.9...v4.0.0-rc.10) (2021-02-17)


### Bug Fixes

* scroll to top on header ([fed60c4](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/fed60c4327f1ba0e879b9cd85650f2910f5a9440)), closes [#137](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/137)

# [4.0.0-rc.9](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.8...v4.0.0-rc.9) (2021-02-16)


### Performance Improvements

* memoize ([#134](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/134)) ([14bfaa0](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/14bfaa03bb5b57b168570b804defa2f7a4331de4)), closes [#130](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/130)

# [4.0.0-rc.8](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.7...v4.0.0-rc.8) (2021-02-15)


### Bug Fixes

* assume headerHeight is 0 if HeaderComponent isn't provided ([#132](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/132)) ([418c917](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/418c91702163e16be7e5c5a36c7791136a8d56f4))

# [4.0.0-rc.7](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.6...v4.0.0-rc.7) (2021-02-15)


### Bug Fixes

* indicator glitch because scrollX was being reset ([#131](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/131)) ([49a1348](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/49a13484295deddcebb93312829edd212ec36d94))

# [4.0.0-rc.6](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.5...v4.0.0-rc.6) (2021-02-14)


### Bug Fixes

* remove ios scroll reset workaround ([#127](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/127)) ([9e9d130](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/9e9d1300a71561b53f82e33e75c581cc1c2abfc7))

# [4.0.0-rc.5](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.4...v4.0.0-rc.5) (2021-02-13)


### Bug Fixes

* iOS issues when header height is undefined ([#126](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/126)) ([5b2711b](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/5b2711b809f8bbc2934f01bc57c2fd48d5411182))

# [4.0.0-rc.4](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.3...v4.0.0-rc.4) (2021-02-13)


### Bug Fixes

* add missing hook dependency ([#125](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/125)) ([d741e74](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/d741e74188b8815f45fd08ae342a931146d5b656))

# [4.0.0-rc.3](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.2...v4.0.0-rc.3) (2021-02-11)


### Bug Fixes

* switching lazy tabs sometimes jumps scroll position on ios ([#120](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/120)) ([6c3e9fd](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/6c3e9fda32c104522fad97ce4c2bc76ae0b8ed4c))

# [4.0.0-rc.2](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.1...v4.0.0-rc.2) (2021-02-10)


### Bug Fixes

* tab sync on ios when scrolling to the top ([15ff5fc](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/15ff5fcf8bd2e85e35225604715bceba8c5cdbc5)), closes [#104](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/104)

# [4.0.0-rc.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-rc.0...v4.0.0-rc.1) (2021-02-10)


### Bug Fixes

* conditional dynamic tabs ([51bf7cf](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/51bf7cf29e569edf6452eda4e6b2125d6c3ba84d)), closes [#102](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/102)
* content inset broken on react native ([040e5c8](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/040e5c8b6a997dfc460ebb7ffd2a5c0b72f5d78c)), closes [#113](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/113)
* ensure top line (1px) is visible on iOS ([#112](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/112)) ([d832baf](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/d832bafc4302b97325d5c106bfef87fceb8655ab))
* exclude documentation from library build ([6826aa0](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/6826aa00b54e15dd911eda68bf2c932f0dc19c95)), closes [#105](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/105)

# [4.0.0-rc.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v4.0.0-next.0...v4.0.0-rc.0) (2021-02-09)

### Bug Fixes

- add isGliding back + interpolate scrollYCurrent only in iOS ([80a5690](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/80a5690cd57e65c1c5d3969c1cf591aa8bea89bb))
- add null check ([fb3b1b2](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/fb3b1b29ba956073f1cccae258162fe61c0a3a64))
- attempt at fixing lazy sometimes opening with 0 opacity ([264cf00](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/264cf008137f0f52cf030a791be12b975b061c61))
- bug when removing dynamic tab ([d9c27a5](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/d9c27a5ed59e8ac878990664733736b8329722d5))
- cancel snapping animations on drag ([63fa2dc](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/63fa2dc6ba13a932a41e17b92c077aaf5d373a2f))
- contentHeight should've been a map ([321fa34](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/321fa340ac5ddc4a35a271e8ebb122ddaea8d374))
- diffclamp snap threshold ([356cdbf](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/356cdbf96ddd0044c308ac51f0683addacebb8ce))
- don't bounce pager on ios ([fb49a97](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/fb49a973c630abdb7ac6f50f2f15a6e6d95371ea))
- ensure callers can't override onScroll ([8421c65](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/8421c6538dbe74cd28143b8b7d63c2869c521aa5))
- handle ios overscroll ([72b4e54](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/72b4e54fd46ddc928321035f9fc1a014b9c28ca5))
- infinite loop ([f6a2f69](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/f6a2f69e4eaa4259b3920597f2f0fd0460dae63f))
- initial lazy position on ios ([56789c1](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/56789c121b6bcb2a5f2d7193bf926ca6da995979))
- ios refresh control ([c09a3e8](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/c09a3e860f82bf6ab877fa80fbde4187851418b0))
- lazy ([b383af9](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/b383af90c00aba552c566597f0e02f1d5a9a742f))
- memoize tabbar in example so it doesn't flicker ([eeb94cc](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/eeb94cc4c6b211c0664ddfdeb317ac2dc676437f))
- minor tabbar tweaks ([b0cdcff](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/b0cdcff21a17dd719749b1256d534e912c1d5112))
- navigation bar zindex on ios ([9fa6958](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/9fa69587970911490ca9d3713e738d83535fa633))
- opacity stuck as 0 on lazy tab (sometimes) ([8cfc596](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/8cfc596cde99df9d1d59fcf7b4706176b38f02b1))
- prevent scrolling to top ([1db8e4e](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/1db8e4e7bcd110d8d02580984bd08c896929e054))
- rework refs to fix scroll sync ([ec513cd](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/ec513cd7d66ec0ccc77cb303b234e49e2bd22685))
- sticky header edge case on android ([7569a52](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/7569a52059269b594f6742f91aa276af47858d56))
- stop animated scroll on snap ([72e87ac](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/72e87aca21d4f8558e4840c3072c1b2180ee0089))
- sync scroll position on dynamic tabs ([4c9cfce](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/4c9cfce49df666f6da558eb05bb49f5da1a085c5))
- usederivedvalue for tabnames value ([92f22de](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/92f22de90fc2f43d39a9258d36cac8cd85a5fbea))

### Features

- add sanity check (duplicate tabs not allowed) ([5e18678](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/5e186785424e84c3521eaaab0ef4e04e6db31051))
- allow callers to still hook into certain events we're also handling ([6f32f1c](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/6f32f1c15b87c000be7a747443f8fc38fd3b2d86))
- dynamic tabbar ([f4ebdfe](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/f4ebdfec3c9e90bccdbcec4c9de0f7c15f9e139f))
- dynamic tabs ([2884bba](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/2884bba5de3a124c6a2349905c1d4c18d36fc6bf))
- forward flatlist and scrollview refs ([749cfbe](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/749cfbe8a60e24de43a119d0e5e1e1d8dafbc4a4))
- rename onIndexChange to onTabChange and add onIndexChange(number) ([c02c88a](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/c02c88a6bd1dd9f983ebded416afa960b780ec96))

### BREAKING CHANGES

- createCollapsibleTabs() no longer exists. Instead the library exports different components (Container, Tab, ScrollView, ListView) which can be nested like normal react components.
- refMap no longer exists, and creating refs is no longer necessary (it's all handled internally)
- ScrollView/FlatList now forward their refs, so the caller can just tap into their ref prop
- the existing onIndexChange was renamed to onTabChange, and a separate onIndexChange was implemented that just returns the new index (as a number)
- diffClampEnabled was changed to revealHeaderOnScroll
- redundant prop snapEnabled was removed, instead snapThreshold is number | null | undefined. If not a number, then snap is not enabled. Setting it to 0.5 will result in snapping in the middle, like in the previous version.

Fixes: [#88](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/88), [#94](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/94), [#98](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/98), [#100](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/100)

# [3.8.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.7.1...v3.8.0) (2021-02-09)

### Features

- add minHeaderHeight prop ([0036da3](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/0036da3fe95fe1476a250a0e69b508460e4f58ec)), closes [#95](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/95) [#5](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/5)
- add tab item customization props in tab bar ([fe4ac3c](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/fe4ac3c53f4bc2cefd0580a3e82903bd1b9bd7a4)), closes [#82](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/82)

## [3.7.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.7.0...v3.7.1) (2021-02-01)

### Bug Fixes

- ensure correct tab label ordering ([1c2e65e](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/1c2e65e0f99fe46c8996f9d189475c4d23dc4ea1)), closes [#77](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/77)
- handle scroll to top ios ([d96f2e2](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/d96f2e2c35d9bc45c229f4fca243dac2cf12cc10)), closes [#66](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/66)

# [3.7.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.6.3...v3.7.0) (2021-01-30)

### Bug Fixes

- add missing tabbar style prop and improve typing ([826966d](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/826966db89141b04c1521f710608686bcc7f5ff8)), closes [#64](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/64)
- change keyExtactor to use index and to be useCallback ([95be6c2](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/95be6c2ff00bd2ba183126e3e6892e0730e8f0c9))
- ensure children is not undefined ([bd4f0e2](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/bd4f0e20b66198c8607d1dd8d1a52a1f1a2b2f52)), closes [#68](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/68) [#72](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/72)

### Features

- add imperactive ref handler ([a6c20fe](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/a6c20feadb0b08b87eb3c98658e31184a039d4b8)), closes [#71](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/71)
- add onIndexChange prop ([15a516c](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/15a516c21908cf16afd9688c39d10ee34e8e5c35)), closes [#71](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/71)
- export useCollapsibleStyle hook ([dde28fe](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/dde28fecf0c65ef85dc5c5f54dd26b98fd6e35f0))

## [3.6.3](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.6.2...v3.6.3) (2021-01-30)

### Bug Fixes

- allow flatlist to bounce ([f359f80](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/f359f80f5298686e44116c4ada6a2b8d05c8559f))
- fix ios without momentum scrolling ([87e3124](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/87e3124eda0903409fd2a3fca802b80ac9251a6f))

### Performance Improvements

- optimize useAnimatedReaction ([9b5b0a9](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/9b5b0a9cf8c1e803c845052449c3f704b1978f4c))

## [3.6.2](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.6.1...v3.6.2) (2021-01-30)

### Bug Fixes

- start with correct calculateNextOffset.value ([fb405f7](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/fb405f7b4980d233930bc06fb31bda875732bf0b))

## [3.6.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.6.0...v3.6.1) (2021-01-29)

### Bug Fixes

- prevent diffclamp not syncing on tab press ([1ec9dcd](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/1ec9dcd56386726771d555ce990e7d26fb0c0101))

# [3.6.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.5.0...v3.6.0) (2021-01-29)

### Features

- add tab name context, remove name prop from scrollable components ([c5166d2](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/c5166d2a957fb644e039bb357198a06fdbd12323))

# [3.5.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.4.0...v3.5.0) (2021-01-27)

### Bug Fixes

- correct typo "cancelLazyFazeIn" ([2b8b194](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/2b8b1942a84f4fac81f2b5715a005bd288da0421))
- fix diffClamp tabs sync ([304e8cc](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/304e8ccb14f78ce3eb565699d6e12ec055a8286e))
- prevent not syncing on tab item press and momentum scrolling ([5c5ff49](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/5c5ff49f5e8ae05a1b8f379b44c1063470fae88c))

### Features

- add initialTabName prop ([7166592](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/7166592f5258253850722be680ada8197750ef97))

# [3.4.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.3.1...v3.4.0) (2021-01-26)

### Features

- add fade-in if headerHeight is undefined ([21d9be0](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/21d9be0fabf5ac3a9afbd1e835a5513759d56418))
- add pressableProps to tab item ([5ff176e](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/5ff176e825d80e8186a29979f0e3b78fa523f957))

## [3.3.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.3.0...v3.3.1) (2021-01-26)

### Bug Fixes

- prevent not updating translateY if not providing the headerHeight ([71cf7f4](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/71cf7f4cb609d81fd25285949bdce5698369b1be)), closes [#52](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/52)

# [3.3.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.2.1...v3.3.0) (2021-01-26)

### Bug Fixes

- scroll to correct position after window resizing ([02da5a9](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/02da5a97ff38060842e6219adc1f632952f00e2f))

### Features

- add default tab bar ([4fa4026](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/4fa4026226ddb0f0a8c293f4c37dc7499798d1c2))
- add pagerProps ([0f8b17b](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/0f8b17ba584cca3924236357286e9011f5486018))

## [3.2.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.2.0...v3.2.1) (2021-01-25)

### Bug Fixes

- replace Dimensions by useWindowDimensions ([d21b4b5](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/d21b4b589bf54cf7e83f821e710b0d2ac0aa2aa0))

# [3.2.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.1.0...v3.2.0) (2021-01-25)

### Features

- add lazy support ([4bfa80b](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/4bfa80b481ab97bbbeb90a266257304489111330)), closes [#19](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/19)

# [3.1.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.0.1...v3.1.0) (2021-01-24)

### Features

- add scrollX to context ([3f3b829](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/3f3b82911a9137fe9c32012c3c1676a994cde05d))

## [3.0.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.0.0...v3.0.1) (2021-01-23)

### Bug Fixes

- prevent rerenders on layout ([2e3aceb](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/2e3aceb6c734ca533afbe28e1ed6b527de9468e0))

# [3.0.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v2.0.2...v3.0.0) (2021-01-22)

### Features

- add createCollapsibleTabs ([8383cef](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/8383cefb63e118c308672c858de29780640f5518)), closes [#2](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/2) [#38](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/38) [#32](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/32) [#26](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/26)

### BREAKING CHANGES

- remove react-native-tab-view

v3 has nothing backward compatible, it's a completely new API.

## [2.0.2](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v2.0.1...v2.0.2) (2021-01-14)

### Bug Fixes

- correct tabbar height ([483ffcd](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/483ffcdf2f14d7390c5bdb8c57295b1073b42927))

## [2.0.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v2.0.0...v2.0.1) (2021-01-14)

### Bug Fixes

- prevent not showing tab bar if no renderHeader ([232561e](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/232561e18528300092b9c817e5b621ffcb3cd1ac)), closes [#39](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/39)

# [2.0.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.5.0...v2.0.0) (2021-01-05)

### Bug Fixes

- pass isGliding ref instead of current value and update types ([37bf1b8](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/37bf1b8fe0c6b72ab8a11a90b0656e46249d9a0b)), closes [#33](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/33)

### BREAKING CHANGES

- pass isGliding ref instead of isGliding.current

Migration: use isGliding.current instead of isGliding inside your
custom renderTabBar function

# [1.5.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.4.2...v1.5.0) (2020-12-29)

### Features

- scroll on header ([e02660f](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/e02660f8aba8a86b4e721cfc1b0fd0881e8c9071)), closes [#28](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/28)

## [1.4.2](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.4.1...v1.4.2) (2020-12-15)

### Bug Fixes

- **deps:** remove peerDependenciesMeta field ([a681d0a](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/a681d0ae6f55fafe43e08f12d8e9af0165f714cc))

## [1.4.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.4.0...v1.4.1) (2020-12-09)

### Code Refactoring

- export createContext helper ([24a1185](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/24a1185b26ada7185a20864d87580d58a729b97b))

# [1.4.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.3.1...v1.4.0) (2020-12-07)

### Bug Fixes

- prevent iOS infinite loop([e1d9db2](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/e1d9db2ebfbfc8984e998ce676b47c9681f1bfe3))

### Features

- add `snapTimeout` ([3c476ca](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/3c476ca9635d86ecd1d3beb7174ec60f127e6f7e))

## [1.3.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.3.0...v1.3.1) (2020-12-04)

### Bug Fixes

- prevent header not showing ([534aa58](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/534aa58b13d4d5f923de794eaa85a5329ef854b9)), closes [#16](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/16)

# [1.3.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.2.0...v1.3.0) (2020-12-04)

### Features

- add content container minHeight ([a633910](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/a633910afe0b7bf08c796d1902ccaeff63a80291)), closes [#6](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/6) [#8](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/8)

# [1.2.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.1.3...v1.2.0) (2020-12-02)

### Features

- allow overriding route key property ([c7ea905](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/c7ea905d4bc0d24aa16f20dbb04d018a31b762f5))
- add react-navigation integration ([e34a34b](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/e34a34b8ef2fb498be1afbbfb292154265ee7ece)), closes [#7](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/7)

## [1.1.3](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.1.2...v1.1.3) (2020-12-02)

### Bug Fixes

- remove minHeight from contentContainerStyle ([fa0e2ed](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/fa0e2edd6bff91c9f8b18c98cc5dca401cd13fd5)), closes [#8](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/8)
- snapping when momentum scrolling ([887b0d9](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/887b0d934a2236ae7697a8f506c1ec5ba39ea163))

## [1.1.2](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.1.1...v1.1.2) (2020-11-30)

### Bug Fixes

- prevent blank space on small content ([98f7b7e](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/98f7b7e4f44e25f9c225d29782c8d55fabdbc83f)), closes [#8](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/8)

## [1.1.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.1.0...v1.1.1) (2020-11-20)

# [1.1.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.1.0...v1.1.1) (2020-11-20)

### Features

- progressViewOffset in useCollapsibleScene ([13c444d](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/13c444dd80ccfd0017a111340ab66e41808e673c))

## [1.0.3](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.1.0...v1.1.1) (2020-11-20)

### Bug Fixes

- expo app ([e1e4807](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/e1e4807813bc352eddca094c60c0e56a7f39a805))

## [1.0.2](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.1.0...v1.1.1) (2020-11-19)

## [1.0.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.1.0...v1.1.1) (2020-11-19)

# [1.0.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.1.0...v1.1.1) (2020-11-19)

### Features

- add collapsible tab view ([ac0696b](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/ac0696b640e9b11280607c3ac6afbe5cd86e2ca9))
