import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos, fetchVideos, fetchGIF } from '../api/mediaApi'
import { setLoading, setError, setResults, incrementPage, setHasMore } from '../redux/features/searchSlice'
import { useEffect } from 'react'
import ResultCard from './ResultCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const ResultGrid = () => {
  const dispatch = useDispatch()
  const { query, activeTab, results, loading, error, page, hasMore } = useSelector((store) => store.search)

  const getData = async (isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        dispatch(setLoading())
      }
      
      let data = []
      const currentPage = isLoadMore ? page : 1

      if (activeTab === 'photos') {
        let response = await fetchPhotos(query, currentPage, 20)
        data = response.results.map((item) => ({
          id: item.id,
          type: 'photo',
          title: item.alt_description || item.description || 'Photo',
          thumbnail: item.urls.small,
          src: item.urls.regular,
          url: item.links.html,
          savedAt: new Date().toISOString()
        }))
        dispatch(setHasMore(response.results.length === 20))
      }

      if (activeTab === 'videos') {
        let response = await fetchVideos(query, currentPage, 20)
        data = response.videos.map((item) => ({
          id: item.id,
          type: 'video',
          title: item.user.name || 'Video',
          thumbnail: item.image,
          src: item.video_files[0].link,
          url: item.url,
          savedAt: new Date().toISOString()
        }))
        dispatch(setHasMore(response.videos.length === 20))
      }

      if (activeTab === 'gif') {
        const pos = (currentPage - 1) * 20
        let response = await fetchGIF(query, pos, 20)
        data = response.results.map((item) => ({
          id: item.id,
          title: item.content_description || 'GIF',
          type: 'gif',
          thumbnail: item.media_formats.tinygif.url,
          src: item.media_formats.gif.url,
          url: item.itemurl,
          savedAt: new Date().toISOString()
        }))
        dispatch(setHasMore(response.results.length === 20))
      }

      dispatch(setResults(isLoadMore ? [...results, ...data] : data))
    } catch (err) {
      dispatch(setError(err.message))
    }
  }

  useEffect(() => {
    if (!query) return
    getData()
  }, [query, activeTab])

  const loadMore = () => {
    dispatch(incrementPage())
    getData(true)
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center'
        >
          <div className='text-6xl mb-4'>😔</div>
          <h2 className='text-2xl font-bold mb-2 text-white'>Oops! Something went wrong</h2>
          <p className='text-gray-400'>{error}</p>
        </motion.div>
      </div>
    )
  }

  if (loading && results.length === 0) {
    return (
      <div className='flex items-center justify-center py-20'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-center'
        >
          <Loader2 className='w-12 h-12 animate-spin mx-auto mb-4 text-red-500' />
          <p className='text-lg text-white'>Searching...</p>
        </motion.div>
      </div>
    )
  }

  if (results.length === 0 && query) {
    return (
      <div className='flex flex-col items-center justify-center py-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center'
        >
          <div className='text-6xl mb-4'>🔍</div>
          <h2 className='text-2xl font-bold mb-2 text-white'>No results found</h2>
          <p className='text-gray-400'>Try searching for something else</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className='px-4 sm:px-6 lg:px-10'>
      <InfiniteScroll
        dataLength={results.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className='flex justify-center py-8'>
            <Loader2 className='w-8 h-8 animate-spin text-purple-500' />
          </div>
        }
        endMessage={
          results.length > 0 && (
            <p className='text-center py-8 text-gray-400'>
              🎉 You've seen all results!
            </p>
          )
        }
      >
        <div className='flex justify-start flex-wrap gap-4 lg:gap-6'>
          {results.map((item, idx) => (
            <ResultCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default ResultGrid