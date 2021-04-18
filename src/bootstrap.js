import * as Font from 'expo-font'
import { DB } from './db'

export const bootstrap = async () => {
  try {
    await Font.loadAsync({
      'openSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'openSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      // Iconicons: require('@expo/vector-icons'),
    })

    await DB.init()
    console.log('Database started...')
  } catch (err) {
    console.error('BOOTSTRAP ERROR', err)
  }
}
