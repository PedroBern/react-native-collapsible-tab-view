import type { LegendListProps, LegendListRef } from '@legendapp/list'
import type { AnimatedLegendList as AnimatedLegendListType } from '@legendapp/list/reanimated'
import React from 'react'
import { useSharedValue, useAnimatedReaction } from 'react-native-reanimated'

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

let AnimatedLegendList: typeof AnimatedLegendListType | null = null

const ensureLegendList = () => {
  if (AnimatedLegendList) {
    return
  }

  try {
    const legendListModule = require('@legendapp/list/reanimated')
    AnimatedLegendList = legendListModule.AnimatedLegendList
  } catch {
    console.error(
      'The optional dependency @legendapp/list is not installed. Please install it to use the LegendList component.'
    )
  }
}

const LegendListMemo = React.memo(
  React.forwardRef(function <T>(
    props: React.PropsWithChildren<
      React.ComponentProps<typeof AnimatedLegendListType<T>>
    >,
    ref: React.Ref<LegendListRef>
  ) {
    ensureLegendList()
    return AnimatedLegendList ? (
      <AnimatedLegendList {...props} ref={ref as any} />
    ) : null
  })
) as <T>(
  props: LegendListProps<T> & { ref?: React.Ref<LegendListRef> }
) => React.ReactElement

function LegendListImpl<T>(
  {
    style,
    onContentSizeChange,
    refreshControl,
    contentContainerStyle: _contentContainerStyle,
    ...rest
  }: Omit<LegendListProps<T>, 'onScroll'>,
  passRef: React.Ref<LegendListRef>
) {
  const name = useTabNameContext()
  const { setRef, contentInset } = useTabsContext()
  const ref = useSharedAnimatedRef<any>(passRef)

  const { scrollHandler, enable } = useScrollHandlerY(name)

  const hadLoad = useSharedValue(false)

  // LegendList doesn't have onLoad, but we'll keep the initialization pattern
  React.useEffect(() => {
    // Enable scroll handler after first render
    setTimeout(() => {
      hadLoad.value = true
    }, 0)
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
    setRef(name, ref)
  }, [name, ref, setRef])

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

  // Note: LegendList might not support contentInset and contentOffset directly
  const topInset = contentInset

  const memoContentContainerStyle = React.useMemo(() => {
    const basePadding = contentContainerStyle?.paddingTop || 0
    return {
      paddingTop: basePadding + topInset,
      ...(typeof _contentContainerStyle === 'object'
        ? _contentContainerStyle
        : {}),
    }
  }, [_contentContainerStyle, contentContainerStyle?.paddingTop, topInset])
  return (
    <LegendListMemo
      {...rest}
      ref={ref}
      contentContainerStyle={memoContentContainerStyle}
      progressViewOffset={progressViewOffset}
      bouncesZoom={false}
      onScroll={scrollHandler}
      refreshControl={memoRefreshControl}
      automaticallyAdjustContentInsets={false}
      onContentSizeChange={scrollContentSizeChangeHandlers}
    />
  )
}

/**
 * Use like a regular LegendList.
 */
export const LegendList = React.forwardRef(LegendListImpl) as <T>(
  p: LegendListProps<T> & { ref?: React.Ref<LegendListRef> }
) => React.ReactElement
