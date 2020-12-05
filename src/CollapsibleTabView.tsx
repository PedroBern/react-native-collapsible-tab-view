import React from 'react';
import {
  StyleSheet,
  Animated,
  ViewStyle,
  LayoutChangeEvent,
  View,
} from 'react-native';
import {
  TabView,
  TabBar,
  Route,
  TabViewProps,
  TabBarProps,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import { useDebouncedCallback } from 'use-debounce';
import { CollapsibleContextProvider } from './CollapsibleTabViewContext';
import scrollScene from './scrollScene';
import type { ScrollRef, GetRef } from './types';

export type Props<T extends Route> = Partial<TabViewProps<T>> &
  Pick<TabViewProps<T>, 'onIndexChange' | 'navigationState' | 'renderScene'> & {
    /**
     * Optionally controlled animated value.
     * Default is `new Animated.Value(0)`.
     */
    animatedValue?: Animated.Value;
    /**
     * Header height, default is 0.
     */
    headerHeight?: number;
    /**
     * Tab bar height, default is 49.
     */
    tabBarHeight?: number;
    /**
     * Props passed to the tab bar component.
     */
    tabBarProps?: Partial<TabBarProps<T>>;
    /**
     * Header rendered on top of the tab bar. Defaul is `() => null`
     */
    renderHeader?: () => React.ReactNode;
    /**
     * Styles applied to header and tabbar container.
     */
    headerContainerStyle?: Animated.WithAnimatedValue<ViewStyle>;
    /**
     * Prevent tab press if screen is gliding. Default is `true`
     */
    preventTabPressOnGliding?: boolean;
    /**
     * Disable the snap animation.
     */
    disableSnap?: boolean;
    /**
     * Same as `renderTab` of `TabViewProps`, but with the additional
     * `isGliding` property.
     */
    renderTabBar?: (
      props: SceneRendererProps & {
        navigationState: NavigationState<T>;
        isGliding: boolean;
      }
    ) => React.ReactNode;
    /**
     * Callback fired when the `headerHeight` state value inside
     * `CollapsibleTabView` will be updated in the `onLayout` event
     * from the tab/header container. Useful to call layout animations
     * Example:
     *
     * ```js
     * const onHeaderHeightChange = () => {
     *  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
     * }
     * ```
     */
    onHeaderHeightChange?: () => void;
    /**
     * Percentage of header height to make the snap effect. A number between
     * 0 and 1. Default is 0.5.
     */
    snapThreshold?: number;
    /**
     * How long to wait before initiating the snap effect, in milliseconds.
     * Default is 100
     */
    snapTimeout?: number;
    /**
     * The property from the `routes` map to use for the active route key
     * Default is 'key'
     */
    routeKeyProp?: keyof T;
  };

/**
 * `CollapsibleTabView` wraps the `TabView` and take care of animations /
 * scroll value computations. It should be used with `useCollapsibleScene`.
 */
const CollapsibleTabView = <T extends Route>({
  animatedValue = new Animated.Value(0),
  navigationState: { index, routes },
  renderHeader = () => null,
  headerHeight: initialHeaderHeight = 0,
  tabBarHeight = 49,
  tabBarProps,
  headerContainerStyle,
  preventTabPressOnGliding = true,
  disableSnap = false,
  renderTabBar: customRenderTabBar,
  onHeaderHeightChange,
  snapThreshold = 0.5,
  snapTimeout = 100,
  routeKeyProp = 'key',
  ...tabViewProps
}: React.PropsWithoutRef<Props<T>>): React.ReactElement => {
  const [headerHeight, setHeaderHeight] = React.useState(
    Math.max(initialHeaderHeight, 0)
  );
  const scrollY = React.useRef(animatedValue);
  const listRefArr = React.useRef<{ key: T['key']; value?: ScrollRef }[]>([]);
  const listOffset = React.useRef<{ [key: string]: number }>({});
  const isGliding = React.useRef(false);
  /** Used to keep track if the user is actively scrolling */
  const isUserScrolling = React.useRef(false);

  const [canSnap, setCanSnap] = React.useState(false);

  const activateSnapDebounced = useDebouncedCallback(
    () => {
      // make sure the user is not currently still scrolling
      if (!isUserScrolling.current) {
        setCanSnap(true);
      }
    },
    snapTimeout,
    { trailing: true, leading: false }
  );

  const [translateY, setTranslateY] = React.useState(
    scrollY.current.interpolate({
      inputRange: [0, Math.max(headerHeight, 0)],
      outputRange: [0, -headerHeight],
      extrapolateRight: 'clamp',
    })
  );

  React.useLayoutEffect(() => {
    const currY = scrollY.current;
    currY.addListener(({ value }) => {
      const curRoute = routes[index][routeKeyProp as keyof Route] as string;
      listOffset.current[curRoute] = value;
    });
    return () => {
      currY.removeAllListeners();
    };
  }, [routes, index, routeKeyProp, activateSnapDebounced]);

  /**
   * Sync the scroll of unfocused routes to the current focused route,
   */
  const syncScrollOffsets = React.useCallback(() => {
    const curRouteKey = routes[index][routeKeyProp as keyof Route] as string;
    const offset = listOffset.current[curRouteKey];

    const newOffset = calculateNewOffset(
      offset,
      headerHeight,
      disableSnap,
      snapThreshold
    );

    listRefArr.current.forEach((item) => {
      const isCurrentRoute = item.key === curRouteKey;
      if (isCurrentRoute) return;

      const itemOffset = listOffset.current[item.key];
      if (newOffset !== null) {
        scrollScene({
          ref: item.value,
          offset,
          animated: false,
        });

        listOffset.current[item.key] = offset;
      } else if (itemOffset < headerHeight || !itemOffset) {
        scrollScene({
          ref: item.value,
          offset: Math.min(offset, headerHeight),
          animated: false,
        });
      }
    });
  }, [disableSnap, headerHeight, index, routeKeyProp, routes, snapThreshold]);

  /**
   * Snapping
   */
  React.useLayoutEffect(() => {
    if (disableSnap || !canSnap) return;

    const curRouteKey = routes[index][routeKeyProp as keyof Route] as string;
    const offset = listOffset.current[curRouteKey];

    setCanSnap(false);

    const newOffset = calculateNewOffset(
      offset,
      headerHeight,
      disableSnap,
      snapThreshold
    );

    if (newOffset !== null && newOffset !== offset) {
      listRefArr.current.forEach((item) => {
        // scroll everything because we could be moving to a new tab
        scrollScene({
          ref: item.value,
          offset: newOffset,
          animated: true,
        });
      });
    }
  }, [
    canSnap,
    disableSnap,
    headerHeight,
    index,
    routeKeyProp,
    routes,
    snapThreshold,
  ]);

  const maybeSnap = React.useCallback(() => {
    const curRouteKey = routes[index][routeKeyProp as keyof Route] as string;

    const offset = listOffset.current[curRouteKey];

    const newOffset = calculateNewOffset(
      offset,
      headerHeight,
      disableSnap,
      snapThreshold
    );

    // only snap if the current offset is different
    if (newOffset !== null && offset !== newOffset) {
      activateSnapDebounced.callback();
    }
  }, [
    activateSnapDebounced,
    disableSnap,
    headerHeight,
    index,
    routeKeyProp,
    routes,
    snapThreshold,
  ]);

  const cancelSnap = React.useCallback(() => {
    activateSnapDebounced.cancel();
  }, [activateSnapDebounced]);

  const onMomentumScrollBegin = () => {
    isGliding.current = true;
    cancelSnap();
  };

  const onMomentumScrollEnd = () => {
    isGliding.current = false;
    maybeSnap();
    syncScrollOffsets();
  };

  const onScrollBeginDrag = () => {
    isUserScrolling.current = true;
    cancelSnap();
  };

  const onScrollEndDrag = () => {
    isUserScrolling.current = false;
    // make sure we snap if the user keeps his finger in the same position for a while then lifts it
    maybeSnap();
    syncScrollOffsets();
  };

  /**
   * Function to be passed as ref for the scrollable animated
   * component inside the tab scene.
   *
   * One of: Animated.[SrcollView | FlatList]
   *
   * It is exposed in the context.
   */
  const buildGetRef = React.useCallback(
    (routeKey: string): GetRef => (ref) => {
      if (ref) {
        const found = listRefArr.current.find((e) => e.key === routeKey);
        if (!found) {
          listRefArr.current.push({
            key: routeKey,
            value: ref,
          });
        }
      }
    },
    []
  );

  /**
   * Get header height on layout mount/change,
   * if different from the current `headerHeight`,
   * update both the `headerHeight` and the
   * `translateY`.
   */
  const getHeaderHeight = React.useCallback(
    (event: LayoutChangeEvent) => {
      const value = event.nativeEvent.layout.height - tabBarHeight;
      if (Math.round(value * 10) / 10 !== Math.round(headerHeight * 10) / 10) {
        onHeaderHeightChange?.();
        setHeaderHeight(Math.max(value, 0));
        setTranslateY(
          scrollY.current.interpolate({
            inputRange: [0, Math.max(value, 0)],
            outputRange: [0, -value],
            extrapolateRight: 'clamp',
          })
        );
      }
    },
    [headerHeight, onHeaderHeightChange, scrollY, tabBarHeight]
  );

  /**
   *
   * Wraps the tab bar with `Animated.View` to
   * control the translateY property.
   *
   * Render the header with `renderHeader` prop if
   * the header height is greater than 0.
   *
   * Render the default `<TabBar />` with additional
   * `tabBarProps`, or a custom tab bar from the
   * `renderTabBar` prop, inside the Animated wrapper.
   */
  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<T>;
    }
  ): React.ReactNode => {
    return (
      <Animated.View
        style={[
          styles.headerContainer,
          { transform: [{ translateY }] },
          headerContainerStyle,
        ]}
        onLayout={getHeaderHeight}
      >
        {renderHeader()}
        {customRenderTabBar ? (
          customRenderTabBar({
            ...props,
            ...tabBarProps,
            isGliding: isGliding.current,
          })
        ) : (
          <TabBar
            {...props}
            {...tabBarProps}
            onTabPress={(event) => {
              if (isGliding.current && preventTabPressOnGliding) {
                event.preventDefault();
              }
              tabBarProps?.onTabPress && tabBarProps.onTabPress(event);
            }}
          />
        )}
      </Animated.View>
    );
  };

  const [containerHeight, setContainerHeight] = React.useState<
    number | undefined
  >(undefined);

  const onLayout = React.useCallback((e: LayoutChangeEvent) => {
    setContainerHeight(e.nativeEvent.layout.height);
  }, []);

  return (
    <View style={styles.container} onLayout={onLayout}>
      <CollapsibleContextProvider
        value={{
          activeRouteKey: routes[index][routeKeyProp as keyof Route] as string,
          scrollY: scrollY.current,
          buildGetRef,
          headerHeight,
          tabBarHeight,
          onMomentumScrollBegin,
          onScrollBeginDrag,
          onScrollEndDrag,
          onMomentumScrollEnd,
          containerHeight: containerHeight || 0,
        }}
      >
        <TabView
          {...tabViewProps}
          navigationState={{ index, routes }}
          renderTabBar={renderTabBar}
        />
      </CollapsibleContextProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    top: 0,
    zIndex: 1,
    position: 'absolute',
    width: '100%',
  },
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default CollapsibleTabView;

function calculateNewOffset(
  offset: number,
  headerHeight: number,
  disableSnap: boolean,
  snapThreshold: number
) {
  return offset >= 0 && offset <= headerHeight
    ? disableSnap
      ? offset
      : offset <= headerHeight * snapThreshold
      ? 0
      : offset > headerHeight * snapThreshold
      ? headerHeight
      : null
    : null;
}
