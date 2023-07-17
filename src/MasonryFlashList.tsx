import {
  MasonryFlashListProps,
  MasonryFlashList as SPMasonryFlashList,
} from '@shopify/flash-list'
import React from 'react'
import { Dimensions, View, StyleSheet } from 'react-native'
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

type MasonryFlashListMemoProps = React.PropsWithChildren<
  MasonryFlashListProps<unknown>
>
type MasonryFlashListMemoRef = typeof SPMasonryFlashList

const MasonryFlashListMemo = React.memo(
  React.forwardRef<MasonryFlashListMemoRef, MasonryFlashListMemoProps>(
    (props, passRef) => {
      // Load FlashList dynamically or print a friendly error message
      try {
        const flashListModule = require('@shopify/flash-list')
        const AnimatedMasonryFlashList = (Animated.createAnimatedComponent(
          flashListModule.MasonryFlashList
        ) as unknown) as React.ComponentClass<MasonryFlashListProps<any>>
        // @ts-expect-error
        return <AnimatedMasonryFlashList ref={passRef} {...props} />
      } catch (error) {
        console.error(
          'The optional dependency @shopify/flash-list is not installed. Please install it to use the FlashList component.'
        )
        return <></>
      }
    }
  )
)

function MasonryFlashListImpl<R>(
  {
    style,
    onContentSizeChange,
    refreshControl,
    ...rest
  }: Omit<MasonryFlashListProps<R>, 'onScroll'>,
  passRef: React.Ref<MasonryFlashListMemoRef>
) {
  const name = useTabNameContext()
  const { setRef, contentInset } = useTabsContext()
  const ref = useSharedAnimatedRef<any>(passRef)

  const { scrollHandler, enable } = useScrollHandlerY(name)

  const onLayout = useAfterMountEffect(rest.onLayout, () => {
    'worklet'
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
    <View
      style={{
        height: Dimensions.get('screen').height - contentInsetValue,
        ...styles.container,
      }}
    >
      {/* @ts-expect-error typescript complains about `unknown` in the memo, it should be T*/}
      <MasonryFlashListMemo
        {...rest}
        onLayout={onLayout}
        ref={(value) => {
          // https://github.com/Shopify/flash-list/blob/2d31530ed447a314ec5429754c7ce88dad8fd087/src/FlashList.tsx#L829
          // We are not accessing the right element or view of the Flashlist (recyclerlistview). So we need to give
          // this ref the access to it
          // eslint-ignore
          // @ts-expect-error
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
    </View>
  )
}

/**
 * Use like a regular MasonryFlashList.
 */
export const MasonryFlashList = React.forwardRef(MasonryFlashListImpl) as <T>(
  p: MasonryFlashListProps<T> & { ref?: React.Ref<MasonryFlashListMemoRef> }
) => React.ReactElement

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
