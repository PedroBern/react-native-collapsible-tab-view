import type { ScrollRef } from './types';

/**
 * Utility function to perform scroll on:
 * - FlatList
 * - ScrollView
 */
const scrollScene = ({
  ref,
  offset,
  animated,
}: {
  ref?: ScrollRef;
  offset: number;
  animated: boolean;
}): void => {
  if (ref?.scrollToOffset) {
    ref.scrollToOffset({
      offset,
      animated,
    });
  } else if (ref?.scrollTo) {
    ref.scrollTo({
      y: offset,
      animated,
    });
  }
};

export default scrollScene;
