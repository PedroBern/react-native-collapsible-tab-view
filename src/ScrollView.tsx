import React from 'react'
import { ScrollViewProps } from 'react-native'
import Animated, { useAnimatedRef } from 'react-native-reanimated'

import {
  useChainCallback,
  useCollapsibleStyle,
  useScrollHandlerY,
  useTabNameContext,
  useTabsContext,
  useUpdateScrollViewContentSize,
} from './hooks'

/**
 * Use like a regular scrollview.
 */
export const ScrollView: React.FC<Omit<ScrollViewProps, 'onScroll'>> = ({
  contentContainerStyle,
  style,
  children,
  onContentSizeChange,
  ...rest
}) => {
  const name = useTabNameContext()
  const ref = useAnimatedRef<Animated.ScrollView>()
  const {
    _setRef: setRef,
    _setContentHeights: setContentHeights,
  } = useTabsContext()
  const scrollHandler = useScrollHandlerY(name)
  const {
    style: _style,
    contentContainerStyle: _contentContainerStyle,
  } = useCollapsibleStyle()

  React.useEffect(() => {
    setRef(name, ref)
  }, [name, ref, setRef])

  const scrollContentSizeChange = useUpdateScrollViewContentSize({
    name,
    setContentHeights,
  })

  const scrollContentSizeChangeHandlers = useChainCallback(
    scrollContentSizeChange,
    onContentSizeChange
  )

  return (
    <Animated.ScrollView
      {...rest}
      ref={ref}
      bouncesZoom={false}
      style={[_style, style]}
      contentContainerStyle={[
        _contentContainerStyle,
        // TODO: investigate types
        contentContainerStyle as any,
      ]}
      onScroll={scrollHandler}
      onContentSizeChange={scrollContentSizeChangeHandlers}
      scrollEventThrottle={16}
    >
      {children}
    </Animated.ScrollView>
  )
}
