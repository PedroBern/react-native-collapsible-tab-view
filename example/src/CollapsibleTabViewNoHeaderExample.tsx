import * as React from 'react';
import { Animated } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

import {
  CollapsibleTabView,
  useCollapsibleScene,
  CollapsibleTabViewProps,
} from 'react-native-collapsible-tab-view';

import { AnimatedValueContextProvider } from './Shared/AnimatedContext';

import { AnimatedAlbums } from './Shared/Albums';
import { AnimatedArticle } from './Shared/Article';
import { AnimatedContacts } from './Shared/Contacts';
import { ExampleComponentType } from './types';

type Route = {
  key: string;
  title: string;
};

export const ContactsScene = () => {
  const scenePropsAndRef = useCollapsibleScene('contacts');
  return <AnimatedContacts {...scenePropsAndRef} data={[]} />;
};

export const ArticleScene = () => {
  const scenePropsAndRef = useCollapsibleScene('article');
  return <AnimatedArticle {...scenePropsAndRef} />;
};

export const AlbumsScene = () => {
  const scenePropsAndRef = useCollapsibleScene('albums');
  return <AnimatedAlbums {...scenePropsAndRef} />;
};

const renderScene = SceneMap({
  albums: AlbumsScene,
  contacts: ContactsScene,
  article: ArticleScene,
});

const CollapsibleTabViewExample: ExampleComponentType<Partial<
  Partial<CollapsibleTabViewProps<Route>>
>> = (props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'article', title: 'Article' },
    { key: 'contacts', title: 'Contacts' },
    { key: 'albums', title: 'Albums' },
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
        {...props}
      />
    </AnimatedValueContextProvider>
  );
};

CollapsibleTabViewExample.title = 'No Header example';
CollapsibleTabViewExample.backgroundColor = '#2196f3';
CollapsibleTabViewExample.appbarElevation = 0;

export default CollapsibleTabViewExample;
