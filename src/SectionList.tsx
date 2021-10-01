import React from 'react'
import { SectionList as RNSectionList, SectionListProps } from 'react-native'

import { AnimatedSectionList, IS_IOS } from './helpers'
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
const SectionListMemo = React.memo(
  React.forwardRef<
    RNSectionList,
    React.PropsWithChildren<SectionListProps<unknown>>
  >((props, passRef) => {
    return <AnimatedSectionList ref={passRef} {...props} />
  })
)

function SectionListImpl<R>(
  {
    contentContainerStyle,
    style,
    onContentSizeChange,
    refreshControl,
    ...rest
  }: Omit<SectionListProps<R>, 'onScroll'>,
  passRef: React.Ref<RNSectionList>
): React.ReactElement {
  const name = useTabNameContext()
  const { setRef, contentInset, scrollYCurrent } = useTabsContext()
  const ref = useSharedAnimatedRef<RNSectionList<unknown>>(passRef)

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
    <SectionListMemo
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
 * Use like a regular SectionList.
 */
export const SectionList = React.forwardRef(SectionListImpl) as <T>(
  p: SectionListProps<T> & { ref?: React.Ref<RNSectionList<T>> }
) => React.ReactElement
