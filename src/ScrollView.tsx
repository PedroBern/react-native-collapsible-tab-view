import React from 'react'
import { ScrollViewProps, ScrollView as RNScrollView } from 'react-native'
import Animated from 'react-native-reanimated'

import {
  useChainCallback,
  useCollapsibleStyle,
  useScrollHandlerY,
  useSharedAnimatedRef,
  useTabNameContext,
  useTabsContext,
  useUpdateScrollViewContentSize,
} from './hooks'

/**
 * Use like a regular scrollview.
 */
export const ScrollView = React.forwardRef<
  RNScrollView,
  React.PropsWithChildren<Omit<ScrollViewProps, 'onScroll'>>
>(
  (
    { contentContainerStyle, style, onContentSizeChange, children, ...rest },
    passRef
  ) => {
    const name = useTabNameContext()
    const ref = useSharedAnimatedRef<RNScrollView>(passRef)
    const { setRef, setContentHeights } = useTabsContext()
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
        // @ts-expect-error reanimated types are broken on ref
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
)
