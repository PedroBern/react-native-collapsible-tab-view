import React from 'react'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'

import { useTabsContext } from './hooks'
import { CollapsibleProps, TabBarProps, TabName } from './types'

type HeaderContainerProps<T extends TabName = TabName> = Pick<
  CollapsibleProps,
  'renderHeader'
> &
  Pick<TabBarProps<T>, 'containerRef' | 'onTabPress' | 'tabProps'> & {
    tabNamesArray: TabName[]
  }

export const HeaderContainer: React.FC<HeaderContainerProps> = ({
  renderHeader,
  containerRef,
  tabNamesArray,
  onTabPress,
  tabProps,
}) => {
  const { headerHeight, focusedTab, index, indexDecimal } = useTabsContext()

  const getHeaderHeight = React.useCallback(
    (event: LayoutChangeEvent) => {
      const height = event.nativeEvent.layout.height
      if (headerHeight.value !== height) {
        headerHeight.value = height
      }
    },
    [headerHeight]
  )

  return (
    <View style={[styles.container]} onLayout={getHeaderHeight}>
      {renderHeader &&
        renderHeader({
          containerRef,
          index,
          tabNames: tabNamesArray,
          focusedTab,
          indexDecimal,
          onTabPress,
          tabProps,
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    flex: 1,
  },
})
