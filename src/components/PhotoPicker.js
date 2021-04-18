import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { isWeb } from '../helpers'

async function askForPermissions() {
  if (!isWeb) {
    // await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status === 'granted') {
      return true
    } else {
      alert('Sorry, we need camera roll permissions to make this work!')
    }
  }
  return false
}

export const PhotoPicker = ({ onPick }) => {
  const [image, setImage] = useState(null)

  useEffect(
    () => () => {
      
      setImage(null)
    },
    []
  )

  const takePhoto = async () => {
    const hasPermissions = await askForPermissions()
    if (!hasPermissions) {
      return
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [16, 9],
    })

    img.cancelled || setImage(img.uri)
    onPick(img.uri)
  }

  return (
    <View style={styles.wrapper}>
      <Button title='Take photo' onPress={takePhoto} />
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
})
