import React from 'react'
import { FlatList as RNFlatList, FlatListProps } from 'react-native'

import { AnimatedFlatList, IS_IOS } from './helpers'
import {
  useChainCallback,
  useCollapsibleStyle,
  useScrollHandlerY,
  useSharedAnimatedRef,
  useTabNameContext,
  useTabsContext,
  useUpdateScrollViewContentSize,
} from './hooks'

function FlatListImpl<R>(
  {
    contentContainerStyle,
    style,
    onContentSizeChange,
    ...rest
  }: Omit<FlatListProps<R>, 'onScroll'>,
  passRef: React.Ref<RNFlatList>
): React.ReactElement {
  const name = useTabNameContext()
  const {
    setRef,
    setContentHeights,
    contentInset,
    scrollYCurrent,
  } = useTabsContext()
  const ref = useSharedAnimatedRef<RNFlatList<unknown>>(passRef)
  const scrollHandler = useScrollHandlerY(name)
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
    setContentHeights,
  })

  const scrollContentSizeChangeHandlers = useChainCallback(
    scrollContentSizeChange,
    onContentSizeChange
  )

  return (
    <AnimatedFlatList
      {...rest}
      // @ts-expect-error problem with reanimated types, they're missing `ref`
      ref={ref}
      bouncesZoom={false}
      style={[_style, style]}
      contentContainerStyle={[_contentContainerStyle, contentContainerStyle]}
      progressViewOffset={progressViewOffset}
      onScroll={scrollHandler}
      onContentSizeChange={scrollContentSizeChangeHandlers}
      scrollEventThrottle={16}
      contentInset={{ top: contentInset }}
      contentOffset={{
        y: IS_IOS ? -contentInset + scrollYCurrent.value : 0,
        x: 0,
      }}
      automaticallyAdjustContentInsets={false}
    />
  )
}

/**
 * Use like a regular FlatList.
 */
export const FlatList = React.forwardRef(FlatListImpl) as <T>(
  p: FlatListProps<T> & { ref?: React.Ref<RNFlatList<T>> }
) => React.ReactElement
