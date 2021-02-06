import React from 'react'
import { FlatList as RNFlatList } from 'react-native'
import { useAnimatedRef } from 'react-native-reanimated'

import { AnimatedFlatList } from './helpers'
import {
  useCollapsibleStyle,
  useScrollHandlerY,
  useTabNameContext,
  useTabsContext,
  useUpdateScrollViewContentSize,
} from './hooks'
import { FlatListProps } from './types'

/**
 * Use like a regular flatlist.
 */
export function FlatList<R>({
  contentContainerStyle,
  style,
  ...rest
}: FlatListProps<R>): React.ReactElement {
  const name = useTabNameContext()
  const {
    _setRef: setRef,
    _setContentHeights: setContentHeights,
  } = useTabsContext()
  const ref = useAnimatedRef<RNFlatList<any>>()
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
      onContentSizeChange={scrollContentSizeChange}
      scrollEventThrottle={16}
    />
  )
}
