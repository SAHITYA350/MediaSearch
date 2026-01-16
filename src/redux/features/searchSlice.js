import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: '',
    activeTab: 'photos',
    results: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
      state.page = 1
      state.results = []
      state.hasMore = true
    },
    setActiveTabs(state, action) {
      state.activeTab = action.payload
      state.page = 1
      state.results = []
      state.hasMore = true
    },
    setResults(state, action) {
      state.results = action.payload
      state.loading = false
      state.error = null
    },
    setLoading(state) {
      state.loading = true
      state.error = null
    },
    setError(state, action) {
      state.error = action.payload
      state.loading = false
    },
    clearResults(state) {
      state.results = []
      state.page = 1
      state.hasMore = true
    },
    incrementPage(state) {
      state.page += 1
    },
    setHasMore(state, action) {
      state.hasMore = action.payload
    },
    resetPagination(state) {
      state.page = 1
      state.hasMore = true
      state.results = []
    }
  }
})

export const {
  setQuery,
  setActiveTabs,
  setError,
  setLoading,
  setResults,
  clearResults,
  incrementPage,
  setHasMore,
  resetPagination
} = searchSlice.actions

export default searchSlice.reducer