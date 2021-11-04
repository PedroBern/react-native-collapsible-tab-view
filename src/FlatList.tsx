import React from 'react'
import { FlatList as RNFlatList, FlatListProps } from 'react-native'

import { AnimatedFlatList, IS_IOS } from './helpers'
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
 * Used as a memo to prevent rerendering too often when the context changes.
 * See: https://github.com/facebook/react/issues/15156#issuecomment-474590693
 */
const FlatListMemo = React.memo(
  React.forwardRef<RNFlatList, React.PropsWithChildren<FlatListProps<unknown>>>(
    (props, passRef) => {
      return <AnimatedFlatList ref={passRef} {...props} />
    }
  )
)

function FlatListImpl<R>(
  {
    contentContainerStyle,
    style,
    onContentSizeChange,
    refreshControl,
    ...rest
  }: Omit<FlatListProps<R>, 'onScroll'>,
  passRef: React.Ref<RNFlatList>
): React.ReactElement {
  const name = useTabNameContext()
  const { setRef, contentInset, scrollYCurrent } = useTabsContext()
  const ref = useSharedAnimatedRef<RNFlatList<unknown>>(passRef)

  const { scrollHandler, enable } = useScrollHandlerY(name)
  useAfterMountEffect(() => {
    // we enable the scroll event after mounting
    // otherwise we get an `onScroll` call with the initial scroll position which can break things
    enable(true)
  })

  const {
    style: _style,
    contentContainerStyle: _contentContainerStyle,
    progressViewOffset,
  } = useCollapsibleStyle()

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
  const memoContentOffset = React.useMemo(
    () => ({
      y: IS_IOS ? -contentInset.value + scrollYCurrent.value : 0,
      x: 0,
    }),
    [contentInset.value, scrollYCurrent.value]
  )
  const memoContentInset = React.useMemo(() => ({ top: contentInset.value }), [
    contentInset.value,
  ])
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
    // @ts-expect-error typescript complains about `unknown` in the memo, it should be T
    <FlatListMemo
      {...rest}
      ref={ref}
      bouncesZoom={false}
      style={memoStyle}
      contentContainerStyle={memoContentContainerStyle}
      progressViewOffset={progressViewOffset}
      onScroll={scrollHandler}
      onContentSizeChange={scrollContentSizeChangeHandlers}
      scrollEventThrottle={16}
      contentInset={memoContentInset}
      contentOffset={memoContentOffset}
      automaticallyAdjustContentInsets={false}
      refreshControl={memoRefreshControl}
    />
  )
}

/**
 * Use like a regular FlatList.
 */
export const FlatList = React.forwardRef(FlatListImpl) as <T>(
  p: FlatListProps<T> & { ref?: React.Ref<RNFlatList<T>> }
) => React.ReactElement
