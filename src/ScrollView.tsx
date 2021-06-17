import React from 'react'
import { ScrollViewProps, ScrollView as RNScrollView } from 'react-native'
import Animated from 'react-native-reanimated'

import { IS_IOS } from './helpers'
import {
  useAfterMountEffect,
  useChainCallback,
  useCollapsibleStyle,
  useScrollHandlerY,
  useSharedAnimatedRef,
  useTabNameContext,
  useTabsContext,
  useUpdateScrollViewContentSize,
} from './hooks'

/**
 * Use like a regular ScrollView.
 */
export const ScrollView = React.forwardRef<
  RNScrollView,
  React.PropsWithChildren<Omit<ScrollViewProps, 'onScroll'>>
>(
  (
    {
      contentContainerStyle,
      style,
      onContentSizeChange,
      children,
      refreshControl,
      ...rest
    },
    passRef
  ) => {
    const name = useTabNameContext()
    const ref = useSharedAnimatedRef<RNScrollView>(passRef)
    const { setRef, contentInset, scrollYCurrent } = useTabsContext()
    const {
      style: _style,
      contentContainerStyle: _contentContainerStyle,
      progressViewOffset,
    } = useCollapsibleStyle()

    const { scrollHandler, enable } = useScrollHandlerY(name)
    useAfterMountEffect(() => {
      // we enable the scroll event after mounting
      // otherwise we get an `onScroll` call with the initial scroll position which can break things
      enable(true)
    })

    React.useEffect(() => {
      setRef(name, ref)
    }, [name, ref, setRef])

    const scrollContentSizeChange = useUpdateScrollViewContentSize({
      name,
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
        contentInset={{ top: contentInset }}
        contentOffset={{
          y: IS_IOS ? -contentInset + scrollYCurrent.value : 0,
          x: 0,
        }}
        automaticallyAdjustContentInsets={false}
        refreshControl={
          refreshControl &&
          React.cloneElement(refreshControl, {
            progressViewOffset,
            ...refreshControl.props,
          })
        }
      >
        {children}
      </Animated.ScrollView>
    )
  }
)
