import {
  useNavigationBuilder,
  TabRouter,
  TabActions,
  TabActionHelpers,
  TabRouterOptions,
  TabNavigationState,
  createNavigatorFactory,
  ParamListBase,
  useTheme,
} from '@react-navigation/native'
import * as React from 'react'
import {
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'

import {
  MaterialTabBar,
  MaterialTabItemProps,
  MaterialTabItem,
} from '../MaterialTabBar'
import createCollapsibleTabs from '../createCollapsibleTabs'
import { TabBarProps, CollapsibleRef, OnTabChangeCallback } from '../types'
import {
  NavigatorProps,
  TabNavigationOptions,
  TabNavigationEventMap,
  TabOptionsContext,
} from './types'

function createCollapsibleNavigator<T extends ParamListBase>() {
  const {
    FlatList,
    ScrollView,
    Container,
    useTabsContext,
  } = createCollapsibleTabs<keyof T>()

  const Context = React.createContext<TabOptionsContext<keyof T> | undefined>(
    undefined
  )

  function useTabOptionsContext(): TabOptionsContext<keyof T> {
    const c = React.useContext(Context)
    if (!c)
      throw new Error(
        'useTabOptionsContext must be inside a Collapsible Navigator'
      )
    return c
  }

  const TabItem = (props: MaterialTabItemProps<keyof T>) => {
    const { colors } = useTheme()
    return (
      <MaterialTabItem
        {...props}
        pressColor={colors.border}
        labelStyle={{ color: colors.text }}
      />
    )
  }

  const TabBar = (props: TabBarProps<keyof T>) => {
    const { colors } = useTheme()
    const options = useTabOptionsContext()

    const getLabelText = React.useCallback(
      (name) => {
        return options[name]?.tabBarLabel || name
      },
      [options]
    )

    return (
      <MaterialTabBar
        {...props}
        getLabelText={getLabelText}
        TabItemComponent={TabItem}
        indicatorStyle={{ backgroundColor: colors.primary }}
      />
    )
  }

  const RawNavigator = ({
    initialRouteName,
    children,
    screenOptions,
    containerRef,
    refMap,
    lazy = true,
    backBehavior,
    TabBarComponent = TabBar,
    headerContainerStyle,
    containerStyle,
    onIndexChange,
    ...props
  }: NavigatorProps<keyof T>) => {
    const ref = React.useRef<CollapsibleRef<keyof T>>()
    const { colors } = useTheme()

    const { state, navigation, descriptors } = useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      TabNavigationOptions,
      TabNavigationEventMap
    >(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
      backBehavior,
    })

    const _onIndexChange: OnTabChangeCallback<keyof T> = React.useCallback(
      (data) => {
        const { index } = data
        navigation.emit({
          type: 'tabPress',
          target: state.routes[index].key,
          data: { index: data.index, prevIndex: data.prevIndex },
        })

        navigation.dispatch({
          ...TabActions.jumpTo(state.routes[index].name),
          target: state.key,
        })

        onIndexChange?.(data)
      },
      [navigation, state.key, state.routes, onIndexChange]
    )

    const oldLen = useSharedValue(0)
    const len = useDerivedValue(() => {
      return state.history.length
    }, [state.history.length])

    const goBack = React.useCallback((index: number) => {
      // TODO
      // need to force setIndex in case of going back on momentum scrolling,
      // because currently it will update the index only if not scrolling/swipping/momentum,
      // but the navigation state will be updated, even if the setIndex fails.
      // The workaround is to set backBehavior="none"
      ref.current?.setIndex(index)
    }, [])

    useAnimatedReaction(
      () => {
        return len.value
      },
      (len) => {
        if (len > oldLen.value) {
          oldLen.value = len
        } else if (len < oldLen.value) {
          runOnJS(goBack)(state.index)
          oldLen.value = len
        }
      },
      [state.routeNames, state.index]
    )

    const ContainerWrapper = React.useMemo(() => {
      return (
        <Container
          ref={ref}
          containerRef={containerRef}
          refMap={refMap}
          lazy={lazy}
          initialTabName={initialRouteName}
          onIndexChange={_onIndexChange}
          containerStyle={[
            { backgroundColor: colors.background },
            containerStyle,
          ]}
          headerContainerStyle={[
            { backgroundColor: colors.card },
            headerContainerStyle,
          ]}
          TabBarComponent={TabBarComponent}
          {...props}
        >
          {state.routes.map((route) => {
            return descriptors[route.key].render()
          })}
        </Container>
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      // remove descriptors from dependency to improve performance,
      // and specify exacly the props we need to rerender
      containerRef,
      initialRouteName,
      lazy,
      onIndexChange,
      refMap,
      state.routes,
      containerStyle,
      headerContainerStyle,
      TabBarComponent,
      colors,
      props.headerHeight,
      props.tabBarHeight,
      props.snapEnabled,
      props.diffClampEnabled,
      props.snapThreshold,
      props.HeaderComponent,
      props.cancelTranslation,
      props.cancelLazyFadeIn,
      props.pagerProps,
    ])

    const options = React.useMemo((): TabOptionsContext<keyof T> => {
      const options = {}
      state.routes.forEach((route) => {
        // @ts-ignore
        options[route.name] = descriptors[route.key].options
      })
      // @ts-ignore
      return options
    }, [descriptors, state.routes])

    return (
      <Context.Provider value={options}>{ContainerWrapper}</Context.Provider>
    )
  }

  const factory = createNavigatorFactory<
    TabNavigationState<ParamListBase>,
    TabNavigationOptions,
    TabNavigationEventMap,
    typeof RawNavigator
  >(RawNavigator)

  const { Navigator, Screen } = factory<T>()

  return {
    Navigator,
    Screen,
    FlatList,
    ScrollView,
    useTabsContext,
    useTabOptionsContext,
  }
}

export default createCollapsibleNavigator
