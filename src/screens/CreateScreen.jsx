import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  Button,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { PhotoPicker } from '../components/PhotoPicker'
import { addPost } from '../redux/actions/post'
import { THEME } from '../theme'

export const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const imgRef = useRef()

  useEffect(() => () => (imgRef.current = null), [])

  const createPostHandler = () => {
    const newPost = {
      date: new Date().toJSON(),
      text,
      img: imgRef.current,
      booked: false,
    }

    dispatch(addPost(newPost))
    setText('')
    navigation.navigate('Main')
  }

  const photoPickHandler = (uri) => {
    imgRef.current = uri
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Создайте новый пост!</Text>
          <TextInput
            style={styles.textArea}
            placeholder='Type a note text'
            value={text}
            onChangeText={setText}
            multiline
          />
          <PhotoPicker onPick={photoPickHandler} />
          <Button
            title='Создать пост'
            disabled={!(text && imgRef.current)}
            color={THEME.MAIN_COLOR}
            onPress={createPostHandler}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'openSans-Regular',
    marginVertical: 10,
  },
  textArea: {
    padding: 10,
    marginBottom: 10,
  },
})
