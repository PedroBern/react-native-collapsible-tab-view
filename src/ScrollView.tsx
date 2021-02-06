import React from 'react'
import { ScrollViewProps } from 'react-native'
import Animated, { useAnimatedRef } from 'react-native-reanimated'

import {
  useCollapsibleStyle,
  useScrollHandlerY,
  useTabNameContext,
  useTabsContext,
} from './hooks'

/**
 * Use like a regular scrollview.
 */
export const ScrollView: React.FC<ScrollViewProps> = ({
  contentContainerStyle,
  style,
  children,
  ...rest
}) => {
  const name = useTabNameContext()
  const ref = useAnimatedRef<Animated.ScrollView>()
  const { _setRef: setRef, _contentHeight: contentHeight } = useTabsContext()
  const scrollHandler = useScrollHandlerY(name)
  const {
    style: _style,
    contentContainerStyle: _contentContainerStyle,
  } = useCollapsibleStyle()

  React.useEffect(() => {
    setRef(name, ref)
  }, [name, ref, setRef])

  const scrollContentSizeChange = React.useCallback(
    (_: number, h: number) => {
      contentHeight.value = h
    },
    [contentHeight]
  )

  return (
    <Animated.ScrollView
      ref={ref}
      bouncesZoom={false}
      style={[_style, style]}
      contentContainerStyle={[
        _contentContainerStyle,
        // TODO: investigate types
        contentContainerStyle as any,
      ]}
      onScroll={scrollHandler}
      onContentSizeChange={scrollContentSizeChange}
      scrollEventThrottle={16}
      {...rest}
    >
      {children}
    </Animated.ScrollView>
  )
}
