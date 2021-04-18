import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'

import { AppNavigation } from './src/navigation/AppNavigation'
import { bootstrap } from './src/bootstrap'
import store from './src/redux'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return <AppLoading startAsync={bootstrap} onFinish={() => setIsReady(true)} onError={console.warn} />
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}
