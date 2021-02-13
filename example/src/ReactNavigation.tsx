import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  Dimensions,
  useWindowDimensions,
  Alert,
} from 'react-native'
import * as Tabs from 'react-native-collapsible-tab-view'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated'

const width = Dimensions.get('window').width

type Photo = string

type Photos = Photo[]

const PHOTOS = [
  'https://source.unsplash.com/random/1600x900',
  'https://source.unsplash.com/random/1600x901',
  'https://source.unsplash.com/random/1600x902',
  'https://source.unsplash.com/random/1600x903',
  'https://source.unsplash.com/random/1600x904',
  'https://source.unsplash.com/random/1600x905',
  'https://source.unsplash.com/random/1600x906',
  'https://source.unsplash.com/random/1600x907',
  'https://source.unsplash.com/random/1600x908',
  'https://source.unsplash.com/random/1600x909',
  'https://source.unsplash.com/random/1600x910',
].sort(() => 0.5 - Math.random())

const PHOTOS2 = [
  'https://source.unsplash.com/random/1600x900',
  'https://source.unsplash.com/random/1600x901',
  'https://source.unsplash.com/random/1600x902',
  'https://source.unsplash.com/random/1600x903',
  'https://source.unsplash.com/random/1600x904',
  'https://source.unsplash.com/random/1600x905',
  'https://source.unsplash.com/random/1600x906',
  'https://source.unsplash.com/random/1600x907',
  'https://source.unsplash.com/random/1600x908',
  'https://source.unsplash.com/random/1600x909',
  'https://source.unsplash.com/random/1600x910',
  'https://source.unsplash.com/random/1600x911',
  'https://source.unsplash.com/random/1600x912',
  'https://source.unsplash.com/random/1600x913',
  'https://source.unsplash.com/random/1600x914',
].sort(() => 0.5 - Math.random())

const ListEmptyComponent = () => {
  const { headerHeight, scrollY, scrollYCurrent } = Tabs.useTabsContext()

  const translateY = useDerivedValue(() => {
    return Animated.interpolate(
      scrollYCurrent.value,
      [0, headerHeight],
      [-headerHeight / 2, 0]
    )
  }, [scrollY])

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    }
  })

  return (
    <Animated.View style={[styles.listEmpty, stylez]}>
      <Text>Centered Empty List!</Text>
    </Animated.View>
  )
}

export const PhotosList: React.FC<{ data?: Photos }> = ({ data }) => {
  const [delayedData, setDelayedData] = React.useState([])

  // Testing empty state update to trigger a re-render on this page?
  // const [, updateState] = React.useState(1)
  // React.useEffect(() => {
  //   const timer = setTimeout(() => updateState(2), 200)
  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [])

  // Simulating delay caused by API request
  React.useEffect(() => {
    const timer = setTimeout(() => setDelayedData(data), 200)
    return () => {
      clearTimeout(timer)
    }
  }, [data])

  return (
    <Tabs.FlatList
      numColumns={2}
      data={delayedData}
      // data={data}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) => (
        <Pressable onPress={() => Alert.alert('pressed')}>
          <Image source={{ uri: item }} style={styles.cover} />
        </Pressable>
      )}
      keyExtractor={(_, i) => String(i)}
    />
  )
}

// What if the height has to be calculated?
// Adding a new Image to force
const Header = () => {
  const windowWidth = useWindowDimensions().width
  return (
    <View style={styles.header}>
      <Image
        source={{
          uri: `https://source.unsplash.com/random/200x${windowWidth}`,
        }}
        style={styles.headerImage}
      />
    </View>
  )
}

const TabScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tabs.Container
        HeaderComponent={Header}
        // Comment  out to see space under tabs
        // snapThreshold={0.5}
      >
        <Tabs.Tab name="A">
          <PhotosList data={PHOTOS} />
        </Tabs.Tab>
        <Tabs.Tab name="B">
          <PhotosList data={PHOTOS2} />
        </Tabs.Tab>
      </Tabs.Container>
    </SafeAreaView>
  )
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.containerHome}>
      <Pressable onPress={() => navigation.navigate('Tabs')}>
        <Text>Home Screen</Text>
      </Pressable>
    </View>
  )
}

type RootStackParamList = {
  Home: undefined
  Tabs: undefined
  Feed: undefined
}

const RootStack = createStackNavigator<RootStackParamList>()

const title = 'React Nav Example'

const ReactNavExample = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <RootStack.Screen
        name="Tabs"
        component={TabScreen}
        options={{ title: 'Tabs' }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    height: 200,
  },
  header: {
    // height: 200,
    backgroundColor: 'blue',
    flex: 1,
  },
  cover: {
    borderWidth: 1,
    borderColor: 'black',
    width: width / 2 - 2,
    height: width / 2 - 2,
  },
  listEmpty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 10,
  },
})

ReactNavExample.title = title

export default ReactNavExample
