import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Post } from '../components/Post'

export const PostList = ({ data = [], onOpenPost }) => {
  if (!data.length) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.noItems}>No posts</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(post) => post.id.toString()}
      renderItem={({ item }) => <Post onOpen={onOpenPost} post={item} />}
    />
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  noItems: {
    fontFamily: 'openSans-Regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
  },
})
