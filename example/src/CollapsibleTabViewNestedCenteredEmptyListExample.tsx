import * as React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

import {
  CollapsibleTabView,
  useCollapsibleScene,
} from 'react-native-collapsible-tab-view';

import { AnimatedValueContextProvider } from './Shared/AnimatedContext';

import {
  AnimatedContacts,
  AnimatedNestedEmptyContacts,
  AnimatedNestedPopulatedContacts,
  AnimatedNonNestedEmptyContacts,
  AnimatedNonNestedPopulatedContacts,
} from './Shared/Contacts';
import { ExampleComponentType } from './types';

type Route = {
  key: string;
  title: string;
};

export const ContactsScene = () => {
  const scenePropsAndRef = useCollapsibleScene('contacts');
  return <AnimatedContacts {...scenePropsAndRef} data={[]} />;
};

export const ContactsNestedEmpty = () => {
  const scenePropsAndRef = useCollapsibleScene('contactsNestedPopulated');
  return <AnimatedNestedEmptyContacts {...scenePropsAndRef} />;
};

export const ContactsNestedPopulated = () => {
  const scenePropsAndRef = useCollapsibleScene('contactsNestedPopulated');
  return <AnimatedNestedPopulatedContacts {...scenePropsAndRef} />;
};

export const ContactsNonNestedEmpty = () => {
  return <AnimatedNonNestedEmptyContacts />;
};

export const ContactsNonNestedPopulated = () => {
  return <AnimatedNonNestedPopulatedContacts />;
};

export const HEADER_HEIGHT = 250;

const renderHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>COLLAPSIBLE</Text>
  </View>
);

const renderScene = SceneMap({
  contacts: ContactsScene,
  contactsNestedEmpty: ContactsNestedEmpty,
  contactsNestedPopulated: ContactsNestedPopulated,
  contactsNonNestedEmpty: ContactsNonNestedEmpty,
  contactsNonNestedPopulated: ContactsNonNestedPopulated,
});

const CollapsibleTabViewExample: ExampleComponentType = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'contacts', title: 'C' },
    { key: 'contactsNestedEmpty', title: 'N-E' },
    { key: 'contactsNestedPopulated', title: 'N-P' },
    { key: 'contactsNonNestedEmpty', title: 'NN-E' },
    { key: 'contactsNonNestedPopulated', title: 'NN-P' },
  ]);

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  const [animatedValue] = React.useState(new Animated.Value(0));

  return (
    <AnimatedValueContextProvider value={animatedValue}>
      <CollapsibleTabView<Route>
        animatedValue={animatedValue}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        renderHeader={renderHeader}
        headerHeight={HEADER_HEIGHT}
      />
    </AnimatedValueContextProvider>
  );
};

CollapsibleTabViewExample.title = 'Nested Centered empty list example';
CollapsibleTabViewExample.backgroundColor = '#2196f3';
CollapsibleTabViewExample.appbarElevation = 0;

export default CollapsibleTabViewExample;

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
});
