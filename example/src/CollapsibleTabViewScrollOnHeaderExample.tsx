import React from 'react';
import CollapsibleTabView from './CollapsibleTabViewExample';
import { ExampleComponentType } from './types';

const CollapsibleTabViewExample: ExampleComponentType = () => {
  return <CollapsibleTabView enableScrollOnHeader />;
};

CollapsibleTabViewExample.title = 'Scroll on header';
CollapsibleTabViewExample.backgroundColor = '#2196f3';
CollapsibleTabViewExample.appbarElevation = 0;

export default CollapsibleTabViewExample;
