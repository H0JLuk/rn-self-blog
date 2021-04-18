import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
// import Ionicons from 'react-native-vector-icons/Ionicons'

import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { AboutScreen } from '../screens/AboutScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'

import { THEME } from '../theme'
import { isIos } from '../helpers'
import { CreateScreen } from '../screens/CreateScreen'
import { createStackNavigator } from '@react-navigation/stack'

const defaultOptions = {
  headerTitle: 'Header',
  headerStyle: { backgroundColor: isIos ? '#fff' : THEME.MAIN_COLOR },
  headerTintColor: isIos ? THEME.MAIN_COLOR : '#fff',
}

if (isIos) {
  defaultOptions.activeTintColor = '#fff'
  defaultOptions.barStyle = {
    backgroundColor: THEME.MAIN_COLOR,
  }
} else {
  defaultOptions.activeTintColor = THEME.MAIN_COLOR
}

export const drawers = [
  {
    name: 'PostTabs',
    component: getPostTabs,
    // options: { drawerIcon: () => <Ionicons name='ios-star' size={10} /> },
    options: { activeTintColor: 'pink' },
  },
  {
    name: 'About',
    component: ({ navigation }) =>
      getSingleStackScreen('About', AboutScreen, {
        headerTitle: 'О блоге',
        ...getDrawerOptions(navigation),
      }),
    // component: AboutScreen,
    // options: ({navigation }) =>  ({ ...defaultOptions, headerTitle: 'О блоге', ...getDrawerOptions(navigation) },
  },
  {
    name: 'CreateTab',
    component: ({ navigation }) =>
      getSingleStackScreen('Create', CreateScreen, { headerTitle: 'Создать пост', ...getDrawerOptions(navigation) }),
  },
]

const Tab = isIos ? createBottomTabNavigator() : createMaterialBottomTabNavigator()

const MainScreenTabs = () => {
  const tabScreenOptions = {
    tabBarIcon: (info) => <Ionicons name='ios-albums' size={22} color={info.color} style={{ color: info.color }} />,
  }

  return (
    <Tab.Navigator
      initialRouteName='MainScreenTabs'
      tabBarOptions={{ activeTintColor: THEME.MAIN_COLOR, inactiveTintColor: '#ccc' }}
      shifting={true}
    >
      <Tab.Screen name='Main' component={MainScreen} options={tabScreenOptions} />
      <Tab.Screen name='Favorites' component={BookedScreen} options={tabScreenOptions} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()

const getDrawerOptions = (navigation) => ({
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title='Toggle Drawer' iconName='ios-menu' onPress={navigation.toggleDrawer} />
    </HeaderButtons>
  ),
})

const mainScreensOptions = ({ navigation }) => ({
  ...defaultOptions,
  headerTitle: 'Мой блог',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title='Take photo' iconName='ios-camera' onPress={() => navigation.navigate('CreateTab')} />
    </HeaderButtons>
  ),
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title='Toggle Drawer' iconName='ios-menu' onPress={navigation.toggleDrawer} />
    </HeaderButtons>
  ),
})

function getPostTabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='PostTabs' component={MainScreenTabs} options={mainScreensOptions} />
      <Stack.Screen name='Post' component={PostScreen} options={defaultOptions} />
    </Stack.Navigator>
  )
}

function getSingleStackScreen(name, component, options = {}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name={name} component={component} options={{ ...defaultOptions, ...options }} />
    </Stack.Navigator>
  )
}
