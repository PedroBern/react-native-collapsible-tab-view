import React from 'react';
import CollapsibleTabView from './CollapsibleTabViewExample';
import { ExampleComponentType } from './types';

const CollapsibleTabViewExample: ExampleComponentType = () => {
  return <CollapsibleTabView startCollapsed />;
};

CollapsibleTabViewExample.title = 'Start collapsed';
CollapsibleTabViewExample.backgroundColor = '#2196f3';
CollapsibleTabViewExample.appbarElevation = 0;

export default CollapsibleTabViewExample;
