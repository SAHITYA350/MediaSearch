import { createSlice } from "@reduxjs/toolkit"
import { toast, Zoom } from 'react-toastify'

const initialState = {
  items: JSON.parse(localStorage.getItem('collection')) || [],
  liked: JSON.parse(localStorage.getItem('liked')) || [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || []
}

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addCollection: (state, action) => {
      const alreadyExists = state.items.find(
        item => item.id === action.payload.id
      )
      if (!alreadyExists) {
        const itemWithTimestamp = {
          ...action.payload,
          savedAt: new Date().toISOString()
        }
        state.items.push(itemWithTimestamp)
        localStorage.setItem('collection', JSON.stringify(state.items))
      }
    },
    removeCollection: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      )
      // Also remove from liked and favorites
      state.liked = state.liked.filter(id => id !== action.payload)
      state.favorites = state.favorites.filter(id => id !== action.payload)
      
      localStorage.setItem('collection', JSON.stringify(state.items))
      localStorage.setItem('liked', JSON.stringify(state.liked))
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    clearCollection: (state) => {
      state.items = []
      state.liked = []
      state.favorites = []
      localStorage.removeItem('collection')
      localStorage.removeItem('liked')
      localStorage.removeItem('favorites')
    },
    toggleLike: (state, action) => {
      const index = state.liked.indexOf(action.payload)
      if (index > -1) {
        state.liked.splice(index, 1)
      } else {
        state.liked.push(action.payload)
      }
      localStorage.setItem('liked', JSON.stringify(state.liked))
    },
    toggleFavorite: (state, action) => {
      const index = state.favorites.indexOf(action.payload)
      if (index > -1) {
        state.favorites.splice(index, 1)
      } else {
        state.favorites.push(action.payload)
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    addedToast: () => {
      toast.success('✅ Added to Collection', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Zoom,
      })
    },
    removeToast: () => {
      toast.error('🗑️ Removed from Collection', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Zoom,
      })
    }
  }
})

export const {
  addCollection,
  removeCollection,
  clearCollection,
  toggleLike,
  toggleFavorite,
  addedToast,
  removeToast
} = collectionSlice.actions

export default collectionSlice.reducer