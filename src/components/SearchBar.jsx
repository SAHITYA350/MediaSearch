import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery, resetPagination } from '../redux/features/searchSlice'
import { Search, X, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const SearchBar = () => {
  const [text, setText] = useState('')
  const [debouncedText, setDebouncedText] = useState('')
  const dispatch = useDispatch()
  const loading = useSelector(state => state.search.loading)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text)
    }, 300)

    return () => clearTimeout(timer)
  }, [text])

  const submitHandler = useCallback((e) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch(setQuery(text.trim()))
      dispatch(resetPagination())
    }
  }, [text, dispatch])

  const clearSearch = useCallback(() => {
    setText('')
    dispatch(setQuery(''))
    dispatch(resetPagination())
  }, [dispatch])

  return (
    <div className='px-4 sm:px-6 lg:px-10 py-8 sm:py-12'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-4xl mx-auto'
      >
        <form onSubmit={submitHandler} className='relative'>
          <div className='relative group'>
            {/* Search Icon */}
            <div className='absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10'>
              <Search className='w-5 h-5 text-gray-400' />
            </div>

            {/* Input Field */}
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className='w-full pl-12 pr-32 sm:pr-40 py-4 text-base sm:text-lg rounded-xl outline-none transition-all border-2 text-white'
              style={{
                background: '#252525',
                borderColor: '#333333',
                fontSize: '16px'
              }}
              type="text"
              placeholder='Search photos, videos, GIFs...'
              autoComplete='off'
            />

            {/* Clear Button */}
            {text && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                type='button'
                onClick={clearSearch}
                className='absolute right-24 sm:right-32 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all min-w-11 min-h-11 flex items-center justify-center'
                aria-label='Clear search'
              >
                <X className='w-4 h-4 text-white' />
              </motion.button>
            )}

            {/* Search Button with Loading */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type='submit'
              disabled={loading || !text.trim()}
              className='absolute right-2 top-1/2 -translate-y-1/2 px-4 sm:px-6 py-2.5 rounded-lg font-medium bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all flex items-center gap-2 min-h-11'
            >
              {loading ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  <span className='hidden sm:inline'>Loading...</span>
                </>
              ) : (
                <span>Search</span>
              )}
            </motion.button>
          </div>
        </form>

        {/* Search Suggestions */}
        <div className='mt-6 flex flex-wrap gap-2 justify-center'>
          {['Nature', 'Technology', 'Abstract', 'Animals', 'Architecture', 'Food', 'Travel', 'Fashion'].map((suggestion) => (
            <motion.button
              key={suggestion}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setText(suggestion)
                dispatch(setQuery(suggestion))
                dispatch(resetPagination())
              }}
              className='px-4 py-2 rounded-full text-sm font-medium transition-all min-h-11 text-white'
              style={{
                background: '#252525',
                border: '1px solid #333333'
              }}
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SearchBar