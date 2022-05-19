import React from 'react'
import { ScrollViewProps, ScrollView as RNScrollView } from 'react-native'
import Animated from 'react-native-reanimated'

import {
  useAfterMountEffect,
  useChainCallback,
  useCollapsibleStyle,
  useConvertAnimatedToValue,
  useScrollHandlerY,
  useSharedAnimatedRef,
  useTabNameContext,
  useTabsContext,
  useUpdateScrollViewContentSize,
} from './hooks'

/**
 * Used as a memo to prevent rerendering too often when the context changes.
 * See: https://github.com/facebook/react/issues/15156#issuecomment-474590693
 */
const ScrollViewMemo = React.memo(
  React.forwardRef<RNScrollView, React.PropsWithChildren<ScrollViewProps>>(
    (props, passRef) => {
      return (
        <Animated.ScrollView
          // @ts-expect-error reanimated types are broken on ref
          ref={passRef}
          {...props}
        />
      )
    }
  )
)

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
    const { setRef, contentInset } = useTabsContext()
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
      React.useMemo(() => [scrollContentSizeChange, onContentSizeChange], [
        onContentSizeChange,
        scrollContentSizeChange,
      ])
    )

    const memoRefreshControl = React.useMemo(
      () =>
        refreshControl &&
        React.cloneElement(refreshControl, {
          progressViewOffset,
          ...refreshControl.props,
        }),
      [progressViewOffset, refreshControl]
    )

    const contentInsetValue = useConvertAnimatedToValue(contentInset)

    const memoContentInset = React.useMemo(() => ({ top: contentInsetValue }), [
      contentInsetValue,
    ])

    const memoContentOffset = React.useMemo(
      () => ({ x: 0, y: -contentInsetValue }),
      [contentInsetValue]
    )

    const memoContentContainerStyle = React.useMemo(
      () => [
        _contentContainerStyle,
        // TODO: investigate types
        contentContainerStyle as any,
      ],
      [_contentContainerStyle, contentContainerStyle]
    )
    const memoStyle = React.useMemo(() => [_style, style], [_style, style])

    return (
      <ScrollViewMemo
        {...rest}
        ref={ref}
        bouncesZoom={false}
        style={memoStyle}
        contentContainerStyle={memoContentContainerStyle}
        onScroll={scrollHandler}
        onContentSizeChange={scrollContentSizeChangeHandlers}
        scrollEventThrottle={16}
        contentInset={memoContentInset}
        contentOffset={memoContentOffset}
        automaticallyAdjustContentInsets={false}
        refreshControl={memoRefreshControl}
        // workaround for: https://github.com/software-mansion/react-native-reanimated/issues/2735
        onMomentumScrollEnd={() => {}}
      >
        {children}
      </ScrollViewMemo>
    )
  }
)
