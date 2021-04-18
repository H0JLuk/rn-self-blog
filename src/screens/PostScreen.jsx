import React, { useEffect } from 'react'
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { deletePost, setActivePost, toggleBookmark } from '../redux/actions/post'
import { THEME } from '../theme'

export const PostScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()

  const post = useSelector(({ post }) => post.activePost)
  const booked = useSelector(({ post }) => post.activePost.booked)

  const handleToggleBookmark = () => {
    const payload = { id: post.id, booked: !post.booked }
    dispatch(toggleBookmark(payload))
  }

  useEffect(
    () => () => {
      dispatch(setActivePost(null))
    },
    []
  )

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title='Bookmark' iconName={booked ? 'ios-star' : 'ios-star-outline'} onPress={handleToggleBookmark} />
        </HeaderButtons>
      ),
    })
  }, [])

  const removeHandler = () => {
    Alert.alert(
      'Deleting post',
      'Do you want delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => handleRemovePost(post.id) },
      ],
      { cancelable: false }
    )
  }

  const handleRemovePost = (id) => {
    dispatch(deletePost(id))
    navigation.navigate('Main')
  }

  useEffect(() => {
    navigation.setOptions({ headerTitle: post.text })
  }, [])

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{post.text}</Text>
      </View>
      <Button onPress={removeHandler} color={THEME.DANGER_COLOR} title='Delete' />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    marginTop: 2,
    width: '100%',
    height: 200,
  },
  textWrapper: {
    padding: 10,
  },
  text: {
    fontFamily: 'openSans-Regular',
  },
})
