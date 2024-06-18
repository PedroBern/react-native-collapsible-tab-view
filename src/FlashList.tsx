import type {
  FlashListProps,
  FlashList as SPFlashList,
} from '@shopify/flash-list'
import React, { useCallback } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated'

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
 * Used as a memo to prevent rerendering too often when the context changes.
 * See: https://github.com/facebook/react/issues/15156#issuecomment-474590693
 */

type FlashListMemoProps = React.PropsWithChildren<FlashListProps<unknown>>
type FlashListMemoRef = SPFlashList<any>

let AnimatedFlashList: React.ComponentClass<FlashListProps<any>> | null = null

const ensureFlastList = () => {
  if (AnimatedFlashList) {
    return
  }

  try {
    const flashListModule = require('@shopify/flash-list')
    AnimatedFlashList = Animated.createAnimatedComponent(
      flashListModule.FlashList
    ) as unknown as React.ComponentClass<FlashListProps<any>>
  } catch {
    console.error(
      'The optional dependency @shopify/flash-list is not installed. Please install it to use the FlashList component.'
    )
  }
}

const FlashListMemo = React.memo(
  React.forwardRef<FlashListMemoRef, FlashListMemoProps>((props, passRef) => {
    ensureFlastList()
    return AnimatedFlashList ? (
      <AnimatedFlashList ref={passRef} {...props} />
    ) : (
      <></>
    )
  })
)

function FlashListImpl<R>(
  {
    style,
    onContentSizeChange,
    refreshControl,
    contentContainerStyle: _contentContainerStyle,
    ...rest
  }: Omit<FlashListProps<R>, 'onScroll'>,
  passRef: React.Ref<SPFlashList<any>>
) {
  const name = useTabNameContext()
  const { setRef, contentInset } = useTabsContext()
  const ref = useSharedAnimatedRef<any>(passRef)
  const recyclerRef = useSharedAnimatedRef<any>(null)

  const { scrollHandler, enable } = useScrollHandlerY(name)

  const hadLoad = useSharedValue(false)

  const onLoad = useCallback(() => {
    hadLoad.value = true
  }, [hadLoad])

  useAnimatedReaction(
    () => {
      return hadLoad.value
    },
    (ready) => {
      if (ready) {
        enable(true)
      }
    }
  )

  const { progressViewOffset, contentContainerStyle } = useCollapsibleStyle()

  React.useEffect(() => {
    setRef(name, recyclerRef)
  }, [name, recyclerRef, setRef])

  const scrollContentSizeChange = useUpdateScrollViewContentSize({
    name,
  })

  const scrollContentSizeChangeHandlers = useChainCallback(
    React.useMemo(
      () => [scrollContentSizeChange, onContentSizeChange],
      [onContentSizeChange, scrollContentSizeChange]
    )
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

  const memoContentInset = React.useMemo(
    () => ({ top: contentInset }),
    [contentInset]
  )

  const memoContentOffset = React.useMemo(
    () => ({ x: 0, y: -contentInset }),
    [contentInset]
  )

  const memoContentContainerStyle = React.useMemo(
    () => ({
      paddingTop: contentContainerStyle.paddingTop,
      ..._contentContainerStyle,
    }),
    [_contentContainerStyle, contentContainerStyle.paddingTop]
  )

  const refWorkaround = useCallback(
    (value: FlashListMemoRef | null): void => {
      // https://github.com/Shopify/flash-list/blob/2d31530ed447a314ec5429754c7ce88dad8fd087/src/FlashList.tsx#L829
      // We are not accessing the right element or view of the Flashlist (recyclerlistview). So we need to give
      // this ref the access to it
      // eslint-ignore
      ;(recyclerRef as any)(value?.recyclerlistview_unsafe)
      ;(ref as any)(value)
    },
    [recyclerRef, ref]
  )

  return (
    // @ts-expect-error typescript complains about `unknown` in the memo, it should be T
    <FlashListMemo
      {...rest}
      onLoad={onLoad}
      ref={refWorkaround}
      contentContainerStyle={memoContentContainerStyle}
      bouncesZoom={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentInset={memoContentInset}
      contentOffset={memoContentOffset}
      refreshControl={memoRefreshControl}
      progressViewOffset={progressViewOffset}
      automaticallyAdjustContentInsets={false}
      onContentSizeChange={scrollContentSizeChangeHandlers}
    />
  )
}

/**
 * Use like a regular FlashList.
 */
export const FlashList = React.forwardRef(FlashListImpl) as <T>(
  p: FlashListProps<T> & { ref?: React.Ref<SPFlashList<T>> }
) => React.ReactElement
