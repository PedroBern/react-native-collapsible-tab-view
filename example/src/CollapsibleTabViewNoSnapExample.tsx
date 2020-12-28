import React from 'react';
import CollapsibleTabView from './CollapsibleTabViewExample';
import { ExampleComponentType } from './types';

const CollapsibleTabViewExample: ExampleComponentType = () => {
  return <CollapsibleTabView disableSnap />;
};

CollapsibleTabViewExample.title = 'Without snapping';
CollapsibleTabViewExample.backgroundColor = '#3f51b5';
CollapsibleTabViewExample.appbarElevation = 0;

export default CollapsibleTabViewExample;
