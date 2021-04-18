import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { PostList } from '../components/PostList'
import { setActivePost } from '../redux/actions/post'

export const BookedScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const allPosts = useSelector(({ post }) => post.bookedPosts)

  const openPostHandler = (post) => {
    dispatch(setActivePost(post.id))
    navigation.navigate('Post')
  }

  useEffect(() => {
    navigation.setOptions({ headerRight: () => <View /> })
  }, [])

  return <PostList data={allPosts} onOpenPost={openPostHandler} />
}
