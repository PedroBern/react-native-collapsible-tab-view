import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as React from 'react'
import {
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import CenteredEmptyList from './CenteredEmptyList'
import Default from './Default'
import DiffClamp from './DiffClamp'
import DiffClampSnap from './DiffClampSnap'
import Lazy from './Lazy'
import MinHeaderHeight from './MinHeaderHeight'
import OnIndexChange from './OnIndexChange'
import QuickStartDemo from './QuickStartDemo'
import Ref from './Ref'
import ScrollOnHeader from './ScrollOnHeader'
import ScrollableTabs from './ScrollableTabs'
import Snap from './Snap'
import StartOnSpecificTab from './StartOnSpecificTab'
import UndefinedHeaderHeight from './UndefinedHeaderHeight'
import { ExampleComponentType } from './types'

const EXAMPLE_COMPONENTS: ExampleComponentType[] = [
  Default,
  Snap,
  DiffClamp,
  DiffClampSnap,
  Lazy,
  ScrollableTabs,
  CenteredEmptyList,
  ScrollOnHeader,
  QuickStartDemo,
  UndefinedHeaderHeight,
  StartOnSpecificTab,
  Ref,
  OnIndexChange,
  MinHeaderHeight,
]

const ExampleList: React.FC<object> = () => {
  const [index, setIndex] = React.useState(-1)
  const [title] = React.useState('Examples')

  const handleNavigate = React.useCallback((index: number) => {
    setIndex(index)
  }, [])

  const handleNavigateBack = React.useCallback(() => {
    handleNavigate(-1)
  }, [handleNavigate])

  const renderItem = React.useCallback(
    (component: ExampleComponentType, i: number) => (
      <TouchableOpacity
        key={i}
        style={styles.touchable}
        onPress={() => handleNavigate(i)}
      >
        <Text style={styles.item}>
          {i + 1}. {component.title}
        </Text>
      </TouchableOpacity>
    ),
    [handleNavigate]
  )

  const ExampleComponent = EXAMPLE_COMPONENTS[index] || null
  const backgroundColor = ExampleComponent?.backgroundColor
    ? ExampleComponent.backgroundColor
    : '#111'
  const tintColor =
    ExampleComponent && typeof ExampleComponent.tintColor === 'string'
      ? ExampleComponent.tintColor
      : 'white'
  const appbarElevation =
    ExampleComponent && typeof ExampleComponent.appbarElevation === 'number'
      ? ExampleComponent.appbarElevation
      : 4
  const statusBarStyle =
    ExampleComponent && typeof ExampleComponent.statusBarStyle === 'string'
      ? ExampleComponent.statusBarStyle
      : 'light-content'
  const borderBottomWidth = Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={Platform.OS === 'ios' ? statusBarStyle : 'light-content'}
      />
      <View
        style={[
          styles.appbar,
          backgroundColor ? { backgroundColor } : null,
          appbarElevation
            ? { elevation: appbarElevation, borderBottomWidth }
            : null,
        ]}
      >
        <View style={styles.statusbar} />
        <SafeAreaView>
          <View style={styles.content}>
            {index > -1 ? (
              <TouchableOpacity
                style={styles.button}
                onPress={handleNavigateBack}
              >
                <Ionicons
                  name={
                    Platform.OS === 'android'
                      ? 'md-arrow-back'
                      : 'ios-arrow-back'
                  }
                  size={24}
                  color={tintColor}
                />
              </TouchableOpacity>
            ) : null}
            <Text
              style={[styles.title, tintColor ? { color: tintColor } : null]}
            >
              {index > -1 ? EXAMPLE_COMPONENTS[index].title : title}
            </Text>
            {index > -1 ? <View style={styles.button} /> : null}
          </View>
        </SafeAreaView>
      </View>
      {index === -1 ? (
        <ScrollView>{EXAMPLE_COMPONENTS.map(renderItem)}</ScrollView>
      ) : ExampleComponent ? (
        <ExampleComponent />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eceff1',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  statusbar: {
    height: Platform.select({
      android: Constants.statusBarHeight,
      ios: Platform.Version < 11 ? Constants.statusBarHeight : 0,
    }),
  },
  appbar: {
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  title: {
    flex: 1,
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontSize: Platform.OS === 'ios' ? 17 : 18,
    color: '#fff',
    margin: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 56,
    padding: 16,
  },
  touchable: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, .06)',
  },
  item: {
    fontSize: 16,
    color: '#333',
  },
})

export default ExampleList
