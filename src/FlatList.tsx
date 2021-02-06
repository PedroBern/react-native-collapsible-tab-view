import React from 'react'
import { FlatList as RNFlatList } from 'react-native'

import { AnimatedFlatList } from './helpers'
import {
  useCollapsibleStyle,
  useScrollHandlerY,
  useSharedAnimatedRef,
  useTabNameContext,
  useTabsContext,
} from './hooks'
import { FlatListProps } from './types'

/**
 * Use like a regular flatlist.
 */
function FlatListImpl<R>(
  { contentContainerStyle, style, ...rest }: FlatListProps<R>,
  passRef: React.Ref<RNFlatList>
): React.ReactElement {
  const name = useTabNameContext()
  const { _setRef: setRef, _contentHeight: contentHeight } = useTabsContext()
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

  const scrollContentSizeChange = React.useCallback(
    (_: number, h: number) => {
      contentHeight.value = h
    },
    [contentHeight]
  )

  return (
    <AnimatedFlatList
      // @ts-expect-error problem with reanimated types, they're missing `ref`
      ref={ref}
      bouncesZoom={false}
      style={[_style, style]}
      contentContainerStyle={[_contentContainerStyle, contentContainerStyle]}
      progressViewOffset={progressViewOffset}
      onScroll={scrollHandler}
      onContentSizeChange={scrollContentSizeChange}
      scrollEventThrottle={16}
      {...rest}
    />
  )
}

export const FlatList = React.forwardRef(FlatListImpl) as <T>(
  p: FlatListProps<T> & { ref?: React.Ref<RNFlatList> }
) => React.ReactElement
