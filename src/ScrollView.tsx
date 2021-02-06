import React from 'react'
import { ScrollViewProps, ScrollView as RNScrollView } from 'react-native'
import Animated from 'react-native-reanimated'

import {
  useCollapsibleStyle,
  useScrollHandlerY,
  useSharedAnimatedRef,
  useTabNameContext,
  useTabsContext,
} from './hooks'

/**
 * Use like a regular scrollview.
 */
export const ScrollView = React.forwardRef<
  RNScrollView,
  React.PropsWithChildren<ScrollViewProps>
>(({ contentContainerStyle, style, children, ...rest }, passRef) => {
  const name = useTabNameContext()
  const ref = useSharedAnimatedRef<RNScrollView>(passRef)
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
      //@ts-expect-error type errors
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
})
