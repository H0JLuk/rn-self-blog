import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
// import Ionicons from 'react-native-vector-icons/Ionicons'
import { Ionicons } from '@expo/vector-icons'
import { isIos } from '../helpers'
import { THEME } from '../theme'

export const AppHeaderIcon = (props) => (
  <HeaderButton {...props} iconSize={23} IconComponent={Ionicons} color={isIos ? THEME.MAIN_COLOR : '#fff'} />
)
