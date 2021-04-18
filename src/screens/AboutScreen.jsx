import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const AboutScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Best application for personal notes</Text>
      <Text style={styles.text}>
        App version <Text style={styles.bold}>1.0.0</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    paddingVertical: 5,
  },

  bold: {
    fontFamily: 'openSans-Bold',
  },
})
