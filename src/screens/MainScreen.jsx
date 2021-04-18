import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { PostList } from '../components/PostList'
import { loadPosts, setActivePost } from '../redux/actions/post'
import { THEME } from '../theme'

export const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const openPostHandler = (post) => {
    dispatch(setActivePost(post.id))
    navigation.navigate('Post')
  }

  useEffect(() => {
    dispatch(loadPosts())
  }, [])

  const { allPosts, loading } = useSelector(({ post }) => post)

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' color={THEME.MAIN_COLOR} />
      </View>
    )
  }

  return <PostList data={allPosts} onOpenPost={openPostHandler} />
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
