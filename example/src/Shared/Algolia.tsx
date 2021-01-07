import * as React from 'react';
import {
  Text,
  Animated,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useCollapsibleScene } from 'react-native-collapsible-tab-view';
import useRefresh from './useRefresh';
import { useAnimatedValueContext } from './AnimatedContext';

import {
  InstantSearch,
  Configure,
  connectInfiniteHits,
} from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/lite';

const { width } = Dimensions.get('window');

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const ListEmptyComponent = ({ routeKey }: any) => {
  const animatedValue = useAnimatedValueContext();
  const {
    contentContainerStyle: { paddingTop },
  } = useCollapsibleScene(routeKey);

  const [translateY] = React.useState(
    animatedValue.interpolate({
      inputRange: [0, paddingTop - 49], // 49 is the default tabBar height, use your value here
      outputRange: [-(paddingTop - 49) / 2, 0],
      extrapolateRight: 'clamp',
    })
  );

  return (
    <Animated.View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        transform: [{ translateY }],
        borderColor: 'black',
        borderWidth: 10,
      }}
    >
      <Text>Centered Empty List!</Text>
    </Animated.View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const Item = React.memo(({ item }: any) => (
  <View style={styles.item}>
    <Image
      style={{ height: width, width: width }}
      source={{ uri: item.image }}
    />
  </View>
));

const Hits = ({ hits, hasMore, refine, routeKey }: any) => {
  const [isRefreshing, startRefreshing] = useRefresh();

  const scenePropsAndRef = useCollapsibleScene(routeKey);

  const onEndReached = () => {
    if (hasMore) {
      refine();
    }
  };

  const renderItem = ({ item }: any) => <Item item={item} />;

  return (
    <Animated.FlatList
      data={hits}
      onEndReached={onEndReached}
      keyExtractor={(_, i) => String(i)}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
      refreshing={isRefreshing}
      onRefresh={startRefreshing}
      ListEmptyComponent={() => <ListEmptyComponent routeKey={routeKey} />}
      {...scenePropsAndRef}
    />
  );
};

// Optional: Improvement to prevent unnecessary re-renders
const comparisonFunction = (prevProps: any, nextProps: any) => {
  if (prevProps.hits.length !== nextProps.hits.length) {
    return false;
  }
  for (let i = 0; i < nextProps.hits.length; i++) {
    if (nextProps.hits[i].objectID !== prevProps.hits[i].objectID) {
      return false;
    }
  }
  return true;
};

const ConnectedHits = connectInfiniteHits(React.memo(Hits, comparisonFunction));

export const Algolia = ({ hitsPerPage, routeKey = 'algolia' }: any) => (
  <InstantSearch indexName="instant_search" searchClient={searchClient}>
    <Configure hitsPerPage={hitsPerPage} />
    {/* @ts-ignore */}
    <ConnectedHits routeKey={routeKey} />
  </InstantSearch>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
  },
});
