import { Animated } from 'react-native';
import { createContext } from 'react-native-collapsible-tab-view';

const [useAnimatedValueContext, AnimatedValueContextProvider] = createContext<
  Animated.Value
>();

export { useAnimatedValueContext, AnimatedValueContextProvider };
