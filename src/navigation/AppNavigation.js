import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import { drawers } from './routes'
import { THEME } from '../theme'

const Drawer = createDrawerNavigator()

const drawerNavOptions = {
  initialRouteName: 'Home',
  drawerContentOptions: {
    activeTintColor: THEME.MAIN_COLOR,
    labelStyle: { fontFamily: 'openSans-Bold' },
  },
}

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator {...drawerNavOptions}>
        {drawers.map((drawer, idx) => (
          <Drawer.Screen name={drawer.name} component={drawer.component} key={idx} options={drawer.options} />
        ))}
      </Drawer.Navigator>
      {/* <Stack.Navigator>
        {routes.map((route, idx) => (
          <Stack.Screen {...route} key={idx} />
        ))}
      </Stack.Navigator> */}
    </NavigationContainer>
  )
}
