import { ADD_POST, DETELE_POST, LOAD_POSTS, SET_ACTIVE_POST, TOGGLE_BOOKMARK } from '../types/post'

const initialState = {
  allPosts: [],
  bookedPosts: [],
  activePost: {},
  loading: true,
}

export const postReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LOAD_POSTS:
      return loadPosts(state, payload)
    case ADD_POST:
      return addPost(state, payload)
    case TOGGLE_BOOKMARK:
      return toggleBookmark(state, payload)
    case SET_ACTIVE_POST:
      return setActivePost(state, payload)
    case DETELE_POST:
      return deletePost(state, payload)
    default:
      return state
  }
}

function loadPosts(state, payload) {
  return {
    ...state,
    allPosts: payload,
    bookedPosts: payload.filter((i) => i.booked),
    loading: false,
  }
}

function addPost(state, payload) {
  payload.id = new Date().toString()
  const allPosts = [...state.allPosts, payload]

  return { ...state, allPosts }
}

function toggleBookmark(state, payload) {
  const { id, booked } = payload
  const cb = (post) => {
    if (post.id === id) {
      post.booked = booked
    }
    return post
  }

  const allPosts = state.allPosts.map(cb)
  const bookedPosts = allPosts.filter((i) => i.booked)
  const { activePost } = state
  activePost.booked = booked

  return { ...state, allPosts, bookedPosts, activePost }
}

function setActivePost(state, payload) {
  if (!payload) {
    return { ...state, activePost: {} }
  }
  const activePost = state.allPosts.find((i) => i.id === payload)
  return { ...state, activePost }
}

function deletePost(state, payload) {
  const cb = (i) => i.id !== payload
  const allPosts = state.allPosts.filter(cb)
  const bookedPosts = state.bookedPosts.filter(cb)

  return { ...state, allPosts, bookedPosts }
}
