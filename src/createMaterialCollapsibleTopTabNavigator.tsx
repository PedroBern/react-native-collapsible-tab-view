import * as React from 'react';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  TabRouter,
  TabRouterOptions,
  TabNavigationState,
  TabActionHelpers,
  ParamListBase,
} from '@react-navigation/native';
import MaterialTopTabsCollapsibleTabView from './MaterialTopTabsCollapsibleTabView';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { Props as CollapsibleTabViewProps } from './CollapsibleTabView';

// copied from @react-navigation/material-top-tabs because it's not exported
type MaterialTopTabNavigationEventMap = {
  /**
   * Event which fires on tapping on the tab in the tab bar.
   */
  tabPress: { data: undefined; canPreventDefault: true };
  /**
   * Event which fires on long press on the tab in the tab bar.
   */
  tabLongPress: { data: undefined };
  /**
   * Event which fires when a swipe gesture starts, i.e. finger touches the screen.
   */
  swipeStart: { data: undefined };
  /**
   * Event which fires when a swipe gesture ends, i.e. finger leaves the screen.
   */
  swipeEnd: { data: undefined };
};

type BaseNavigator = ReturnType<
  typeof createMaterialTopTabNavigator
>['Navigator'];

type BaseProps = Parameters<
  Extract<BaseNavigator, React.FunctionComponent<any>>
>[0];

type Props = BaseProps & {
  collapsibleOptions?: Partial<CollapsibleTabViewProps<any>>;
};

function MaterialTopTabNavigator({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  ...rest
}: Props) {
  const { state, descriptors, navigation } = useNavigationBuilder<
    TabNavigationState<ParamListBase>,
    TabRouterOptions,
    TabActionHelpers<ParamListBase>,
    MaterialTopTabNavigationOptions,
    MaterialTopTabNavigationEventMap
  >(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  });

  return (
    <MaterialTopTabsCollapsibleTabView
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
    />
  );
}

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
  typeof MaterialTopTabNavigator
>(MaterialTopTabNavigator);
