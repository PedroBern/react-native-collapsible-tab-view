import * as React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import {
  CollapsibleTabView,
  useCollapsibleScene,
} from 'react-native-collapsible-tab-view';
import {
  SceneMap,
  TabBarIndicatorProps,
  TabBarProps,
  TabBar,
} from 'react-native-tab-view';
import { Scene } from 'react-native-tab-view/src/types';
import { ExampleComponentType } from './types';

type Route = {
  key: string;
  title: string;
  icon?: string;
};

const SomeRoute: React.FC<{ routeKey: string; color: string }> = ({
  routeKey,
  color,
}) => {
  const scrollPropsAndRef = useCollapsibleScene(routeKey);

  return (
    <Animated.ScrollView
      style={{ backgroundColor: color }}
      {...scrollPropsAndRef}
    >
      <View style={styles.content} />
    </Animated.ScrollView>
  );
};

const FirstScene = () => <SomeRoute routeKey="first" color="white" />;
const SecondScene = () => <SomeRoute routeKey="second" color="black" />;

const HEADER_HEIGHT = 250;

const renderHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>COLLAPSIBLE</Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstScene,
  second: SecondScene,
});

const CollapsibleTabViewExample: ExampleComponentType = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'first', title: 'First', icon: '👋' }, // or FontAwesome/badge
    { key: 'second', title: 'Second', icon: '🤯' },
  ]);

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  const renderTabBar = (
    props: JSX.IntrinsicAttributes &
      JSX.IntrinsicClassAttributes<TabBar<Route>> &
      Pick<
        Readonly<TabBarProps<Route>> & Readonly<{ children?: React.ReactNode }>,
        | 'layout'
        | 'position'
        | 'jumpTo'
        | 'navigationState'
        | 'scrollEnabled'
        | 'bounces'
        | 'activeColor'
        | 'inactiveColor'
        | 'pressColor'
        | 'pressOpacity'
        | 'renderLabel'
        | 'renderIcon'
        | 'renderBadge'
        | 'renderTabBarItem'
        | 'onTabPress'
        | 'onTabLongPress'
        | 'tabStyle'
        | 'indicatorStyle'
        | 'indicatorContainerStyle'
        | 'labelStyle'
        | 'contentContainerStyle'
        | 'style'
        | 'children'
      > &
      Partial<
        Pick<
          Readonly<TabBarProps<Route>> &
            Readonly<{ children?: React.ReactNode }>,
          | 'getLabelText'
          | 'getAccessible'
          | 'getAccessibilityLabel'
          | 'getTestID'
          | 'renderIndicator'
        >
      > &
      Partial<
        Pick<
          {
            getLabelText: ({ route }: Scene<Route>) => string | undefined;
            getAccessible: ({ route }: Scene<Route>) => boolean;
            getAccessibilityLabel: ({
              route,
            }: Scene<Route>) => string | undefined;
            getTestID: ({ route }: Scene<Route>) => string | undefined;
            renderIndicator: (
              props: TabBarIndicatorProps<Route>
            ) => JSX.Element;
          },
          never
        >
      > & {
        isGliding: React.MutableRefObject<boolean>;
        preventTabPressOnGliding: boolean;
      }
  ) => (
    <TabBar
      {...props}
      activeColor="pink"
      inactiveColor="red"
      onTabPress={(event) => {
        if (props?.isGliding?.current && props?.preventTabPressOnGliding) {
          event.preventDefault();
        }
        props?.onTabPress && props.onTabPress(event);
      }}
      renderLabel={({ color, focused, route }) => (
        <View style={styles.label}>
          <Text
            style={[
              styles.title,
              { color },
              { fontWeight: focused ? 'bold' : 'normal' },
            ]}
          >
            {route.icon ?? route.title}
          </Text>
        </View>
      )}
    />
  );

  return (
    <CollapsibleTabView<Route>
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      renderHeader={renderHeader} // optional
      renderTabBar={renderTabBar} // optional
      headerHeight={HEADER_HEIGHT} // optional, will be computed.
    />
  );
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  content: {
    height: 1500,
  },
  label: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {},
});

CollapsibleTabViewExample.title = 'Custom Tab Bar demo';
CollapsibleTabViewExample.backgroundColor = '#2196f3';
CollapsibleTabViewExample.appbarElevation = 0;

export default CollapsibleTabViewExample;
