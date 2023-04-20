import { FlashList as SPFlashList, FlashListProps } from '@shopify/flash-list'
import React from 'react'

import { AnimatedFlashList } from './helpers'
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

type FlashListMemoProps = React.PropsWithChildren<FlashListProps<unknown>>
type FlashListMemoRef = SPFlashList<any>

const FlashListMemo = React.memo(
  React.forwardRef<FlashListMemoRef, FlashListMemoProps>((props, passRef) => {
    return <AnimatedFlashList ref={passRef} {...props} />
  })
)

const EMPTY_HANDLER = () => {
  //
}

function FlashListImpl<R>(
  {
    style,
    onContentSizeChange,
    refreshControl,
    ...rest
  }: Omit<FlashListProps<R>, 'onScroll'>,
  passRef: React.Ref<SPFlashList<any>>
) {
  const name = useTabNameContext()
  const { setRef, contentInset } = useTabsContext()
  const ref = useSharedAnimatedRef<any>(passRef)

  const { scrollHandler, enable } = useScrollHandlerY(name)

  useAfterMountEffect(() => {
    // we enable the scroll event after mounting
    // otherwise we get an `onScroll` call with the initial scroll position which can break things
    enable(true)
  })

  const { progressViewOffset } = useCollapsibleStyle()

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

  const contentInsetValue = useConvertAnimatedToValue<number>(contentInset)

  const memoContentInset = React.useMemo(() => ({ top: contentInsetValue }), [
    contentInsetValue,
  ])

  const memoContentOffset = React.useMemo(
    () => ({ x: 0, y: -contentInsetValue }),
    [contentInsetValue]
  )

  return (
    // @ts-expect-error typescript complains about `unknown` in the memo, it should be T
    <FlashListMemo
      {...rest}
      ref={ref}
      bouncesZoom={false}
      progressViewOffset={progressViewOffset}
      onScroll={scrollHandler}
      onContentSizeChange={scrollContentSizeChangeHandlers}
      scrollEventThrottle={16}
      contentInset={memoContentInset}
      contentOffset={memoContentOffset}
      automaticallyAdjustContentInsets={false}
      refreshControl={memoRefreshControl}
      // workaround for: https://github.com/software-mansion/react-native-reanimated/issues/2735
      onMomentumScrollEnd={EMPTY_HANDLER}
    />
  )
}

/**
 * Use like a regular FlashList.
 */
export const FlashList = React.forwardRef(FlashListImpl) as <T>(
  p: FlashListProps<T> & { ref?: React.Ref<SPFlashList<T>> }
) => React.ReactElement
