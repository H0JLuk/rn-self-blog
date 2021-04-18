import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const Post = ({ post, onOpen }) => {
  return (
    <TouchableOpacity onPress={() => onOpen(post)} activeOpacity={0.8} style={styles.post}>
      <ImageBackground style={styles.image} source={{ uri: post.img }}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{new Date(post.date).toLocaleDateString()}</Text>
          <Text style={styles.text}>{post.text}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  textWrapper: {
    backgroundColor: 'rgba(0, 0, 0, .8)',
    flexDirection: 'column',
    paddingVertical: 5,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: 'openSans-Regular',
  },
})
