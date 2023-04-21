import type {
  FlashListProps,
  FlashList as SPFlashList,
} from '@shopify/flash-list'
import React from 'react'
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

// Load FlashList dynamically or print a friendly error message
let AnimatedFlashList: React.ComponentClass<FlashListProps<any>>
try {
  const flashListModule = require('@shopify/flash-list')
  AnimatedFlashList = (Animated.createAnimatedComponent(
    flashListModule.FlashList
  ) as unknown) as React.ComponentClass<FlashListProps<any>>
} catch (error) {
  console.error(
    'The optional dependency @shopify/flash-list is not installed. Please install it to use the FlashList component.'
  )
}

/**
 * Used as a memo to prevent rerendering too often when the context changes.
 * See: https://github.com/facebook/react/issues/15156#issuecomment-474590693
 */

type FlashListMemoProps = React.PropsWithChildren<FlashListProps<unknown>>
type FlashListMemoRef = SPFlashList<any>

const FlashListMemo = React.memo(
  React.forwardRef<FlashListMemoRef, FlashListMemoProps>((props, passRef) => {
    // Load FlashList dynamically or print a friendly error message
    try {
      const flashListModule = require('@shopify/flash-list')
      const AnimatedFlashList = (Animated.createAnimatedComponent(
        flashListModule.FlashList
      ) as unknown) as React.ComponentClass<FlashListProps<any>>
      return <AnimatedFlashList ref={passRef} {...props} />
    } catch (error) {
      console.error(
        'The optional dependency @shopify/flash-list is not installed. Please install it to use the FlashList component.'
      )
      return <></>
    }
  })
)

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
      ref={(value) => {
        // https://github.com/Shopify/flash-list/blob/2d31530ed447a314ec5429754c7ce88dad8fd087/src/FlashList.tsx#L829
        // We are not accessing the right element or view of the Flashlist (recyclerlistview). So we need to give
        // this ref the access to it
        // eslint-ignore
        ;(ref as any)(value?.recyclerlistview_unsafe)
      }}
      bouncesZoom={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentInset={memoContentInset}
      contentOffset={memoContentOffset}
      refreshControl={memoRefreshControl}
      // workaround for: https://github.com/software-mansion/react-native-reanimated/issues/2735
      onMomentumScrollEnd={() => {}}
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
