# [3.5.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.4.0...v3.5.0) (2021-01-27)


### Bug Fixes

* correct typo "cancelLazyFazeIn" ([2b8b194](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/2b8b1942a84f4fac81f2b5715a005bd288da0421))
* fix diffClamp tabs sync ([304e8cc](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/304e8ccb14f78ce3eb565699d6e12ec055a8286e))
* prevent not syncing on tab item press and momentum scrolling ([5c5ff49](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/5c5ff49f5e8ae05a1b8f379b44c1063470fae88c))


### Features

* add initialTabName prop ([7166592](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/7166592f5258253850722be680ada8197750ef97))

# [3.4.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.3.1...v3.4.0) (2021-01-26)


### Features

* add fade-in if headerHeight is undefined ([21d9be0](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/21d9be0fabf5ac3a9afbd1e835a5513759d56418))
* add pressableProps to tab item ([5ff176e](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/5ff176e825d80e8186a29979f0e3b78fa523f957))

## [3.3.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.3.0...v3.3.1) (2021-01-26)


### Bug Fixes

* prevent not updating translateY if not providing the headerHeight ([71cf7f4](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/71cf7f4cb609d81fd25285949bdce5698369b1be)), closes [#52](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/52)

# [3.3.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.2.1...v3.3.0) (2021-01-26)


### Bug Fixes

* scroll to correct position after window resizing ([02da5a9](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/02da5a97ff38060842e6219adc1f632952f00e2f))


### Features

* add default tab bar ([4fa4026](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/4fa4026226ddb0f0a8c293f4c37dc7499798d1c2))
* add pagerProps ([0f8b17b](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/0f8b17ba584cca3924236357286e9011f5486018))

## [3.2.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.2.0...v3.2.1) (2021-01-25)


### Bug Fixes

* replace Dimensions by useWindowDimensions ([d21b4b5](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/d21b4b589bf54cf7e83f821e710b0d2ac0aa2aa0))

# [3.2.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.1.0...v3.2.0) (2021-01-25)


### Features

* add lazy support ([4bfa80b](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/4bfa80b481ab97bbbeb90a266257304489111330)), closes [#19](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/19)

# [3.1.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.0.1...v3.1.0) (2021-01-24)


### Features

* add scrollX to context ([3f3b829](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/3f3b82911a9137fe9c32012c3c1676a994cde05d))

## [3.0.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v3.0.0...v3.0.1) (2021-01-23)


### Bug Fixes

* prevent rerenders on layout ([2e3aceb](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/2e3aceb6c734ca533afbe28e1ed6b527de9468e0))

# [3.0.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v2.0.2...v3.0.0) (2021-01-22)


### Features

* add createCollapsibleTabs ([8383cef](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/8383cefb63e118c308672c858de29780640f5518)), closes [#2](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/2) [#38](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/38) [#32](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/32) [#26](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/26)


### BREAKING CHANGES

* remove react-native-tab-view

v3 has nothing backward compatible, it's a completely new API.

## [2.0.2](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v2.0.1...v2.0.2) (2021-01-14)


### Bug Fixes

* correct tabbar height ([483ffcd](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/483ffcdf2f14d7390c5bdb8c57295b1073b42927))

## [2.0.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v2.0.0...v2.0.1) (2021-01-14)


### Bug Fixes

* prevent not showing tab bar if no renderHeader ([232561e](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/232561e18528300092b9c817e5b621ffcb3cd1ac)), closes [#39](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/39)

# [2.0.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.5.0...v2.0.0) (2021-01-05)


### Bug Fixes

* pass isGliding ref instead of current value and update types ([37bf1b8](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/37bf1b8fe0c6b72ab8a11a90b0656e46249d9a0b)), closes [#33](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/33)


### BREAKING CHANGES

* pass isGliding ref instead of isGliding.current

Migration: use isGliding.current instead of isGliding inside your
custom renderTabBar function

# [1.5.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.4.2...v1.5.0) (2020-12-29)


### Features

* scroll on header ([e02660f](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/e02660f8aba8a86b4e721cfc1b0fd0881e8c9071)), closes [#28](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/28)

## [1.4.2](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.4.1...v1.4.2) (2020-12-15)


### Bug Fixes

* **deps:** remove peerDependenciesMeta field ([a681d0a](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/a681d0ae6f55fafe43e08f12d8e9af0165f714cc))

## [1.4.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.4.0...v1.4.1) (2020-12-09)

### Code Refactoring

* export createContext helper ([24a1185](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/24a1185b26ada7185a20864d87580d58a729b97b))

# [1.4.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.3.1...v1.4.0) (2020-12-07)


### Bug Fixes

* prevent iOS infinite loop([e1d9db2](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/e1d9db2ebfbfc8984e998ce676b47c9681f1bfe3))


### Features

* add `snapTimeout` ([3c476ca](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/3c476ca9635d86ecd1d3beb7174ec60f127e6f7e))

## [1.3.1](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.3.0...v1.3.1) (2020-12-04)


### Bug Fixes

* prevent header not showing ([534aa58](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/534aa58b13d4d5f923de794eaa85a5329ef854b9)), closes [#16](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/16)

# [1.3.0](https://github.com/PedroBern/react-native-collapsible-tab-view/compare/v1.2.0...v1.3.0) (2020-12-04)


### Features

* add content container minHeight ([a633910](https://github.com/PedroBern/react-native-collapsible-tab-view/commit/a633910afe0b7bf08c796d1902ccaeff63a80291)), closes [#6](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/6) [#8](https://github.com/PedroBern/react-native-collapsible-tab-view/issues/8)

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
