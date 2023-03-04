import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  Tabs,
  CollapsibleRef,
  CollapsibleProps,
  TabItemProps,
} from 'react-native-collapsible-tab-view'
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'

import { TabName } from '../../../src/types'
import Albums from './Albums'
import Article from './Article'
import Contacts from './Contacts'
import { HEADER_HEIGHT } from './Header'
import SectionContacts from './SectionContacts'

type Props = {
  emptyContacts?: boolean
} & Partial<CollapsibleProps>

function TabItem<T extends TabName>({
  index,
  indexDecimal,
  label,
}: Pick<TabItemProps<T>, 'index' | 'indexDecimal'> & { label: string }) {
  const dotStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            indexDecimal.value,
            [index - 1, index, index + 1],
            [0, -8, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        indexDecimal.value,
        [index - 1, index, index + 1],
        [0, 1, 0],
        Extrapolation.CLAMP
      ),
    }
  })

  const textStyle = useAnimatedStyle(() => {
    return {
      fontWeight:
        Math.abs(index - indexDecimal.value) < 0.5 ? 'bold' : undefined,
      transform: [
        {
          translateX: interpolate(
            indexDecimal.value,
            [index - 1, index, index + 1],
            [0, 8, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
      color: interpolateColor(
        indexDecimal.value,
        [index - 1, index, index + 1],
        ['black', '#2196f3', 'black']
      ),
    }
  })

  return (
    <View style={styles.tabItemContainer}>
      <Animated.View style={[styles.tabItemDot, dotStyle]} />
      <Animated.Text style={textStyle}>{label}</Animated.Text>
    </View>
  )
}

const Example = React.forwardRef<CollapsibleRef, Props>(
  ({ emptyContacts, ...props }, ref) => {
    const makeLabel = useCallback(
      <T extends TabName>(label: string) => (props: TabItemProps<T>) => (
        <TabItem
          index={props.index}
          indexDecimal={props.indexDecimal}
          label={label}
        />
      ),
      []
    )

    return (
      <Tabs.Container ref={ref} headerHeight={HEADER_HEIGHT} {...props}>
        <Tabs.Tab name="article" label={makeLabel('Article')}>
          <Article />
        </Tabs.Tab>
        <Tabs.Tab name="albums" label={makeLabel('Albums')}>
          <Albums />
        </Tabs.Tab>
        <Tabs.Tab name="contacts" label={makeLabel('Contacts')}>
          <Contacts emptyContacts={emptyContacts} />
        </Tabs.Tab>
        <Tabs.Tab name="ordered" label={makeLabel('Ordered')}>
          <SectionContacts emptyContacts={emptyContacts} />
        </Tabs.Tab>
      </Tabs.Container>
    )
  }
)

export default Example

const styles = StyleSheet.create({
  tabItemDot: {
    position: 'absolute',

    width: 10,
    height: 10,
    backgroundColor: '#2196f3',
    marginRight: 5,
    borderRadius: 10,
  },
  tabItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
