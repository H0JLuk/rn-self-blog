import * as FileSystem from 'expo-file-system'

import { DB } from '../../db'
import { ADD_POST, DETELE_POST, LOAD_POSTS, SET_ACTIVE_POST, TOGGLE_BOOKMARK } from '../types/post'

export const loadPosts = () => async (dispatch) => {
  const posts = (await DB.getAllPosts()) || []

  dispatch({
    type: LOAD_POSTS,
    payload: posts,
  })
}

export const addPost = (post) => async (dispatch) => {
  const fileName = post.img.split('/').pop()
  const newPath = FileSystem.documentDirectory + fileName

  try {
    await FileSystem.moveAsync({ from: post.img, to: newPath })
  } catch (err) {
    console.error('Error', err)
  }

  const payload = { ...post, img: newPath }
  const id = await DB.addPost(payload)
  payload.id = id

  dispatch({
    type: ADD_POST,
    payload,
  })
}

export const toggleBookmark = (payload) => async (dispatch) => {
  await DB.updatePost(payload)

  dispatch({
    type: TOGGLE_BOOKMARK,
    payload,
  })
}

export const setActivePost = (payload) => ({
  type: SET_ACTIVE_POST,
  payload,
})

export const deletePost = (id) => async (dispatch) => {
  await DB.deletePost(id)

  dispatch({
    type: DETELE_POST,
    payload: id,
  })
}
