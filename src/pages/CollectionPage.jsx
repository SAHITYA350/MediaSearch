import { useDispatch, useSelector } from "react-redux"
import CollectionCard from "../components/CollectionCard"
import { clearCollection } from '../redux/features/collectionSlice'
import { Trash2, Filter, Heart, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const CollectionPage = () => {
  const collection = useSelector(state => state.collection.items)
  const liked = useSelector(state => state.collection.liked)
  const favorites = useSelector(state => state.collection.favorites)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('all')

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire collection?')) {
      dispatch(clearCollection())
    }
  }

  const filteredCollection = collection.filter(item => {
    if (filter === 'liked') return liked.includes(item.id)
    if (filter === 'favorites') return favorites.includes(item.id)
    if (filter === 'photos') return item.type === 'photo'
    if (filter === 'videos') return item.type === 'video'
    if (filter === 'gifs') return item.type === 'gif'
    return true
  })

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-8">
      {collection.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-linear-to-r text-white bg-clip-text">
                Your Collection
              </h2>
              <p className="text-gray-400">{collection.length} items saved</p>
            </div>

            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 cursor-pointer hover:bg-red-800 font-medium active:scale-95 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </motion.div>

    {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            {/* Desktop layout */}
            <div className="hidden md:flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-gray-400 shrink-0" />
              {[
                { value: 'all', label: 'All', icon: null },
                { value: 'liked', label: 'Liked', icon: Heart },
                { value: 'favorites', label: 'Favorites', icon: Star },
                { value: 'photos', label: 'Photos', icon: null },
                { value: 'videos', label: 'Videos', icon: null },
                { value: 'gifs', label: 'GIFs', icon: null }
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                    filter === f.value
                      ? 'bg-white text-black'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {f.icon && <f.icon className="w-4 h-4" />}
                  {f.label}
                </button>
              ))}
            </div>
            
            {/* Mobile layout - Scrollable pills */}
            <div className="md:hidden">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-5 h-5 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-400">Filters:</span>
              </div>
              <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
                {[
                  { value: 'all', label: 'All', emoji: '📁' },
                  { value: 'liked', label: 'Liked', emoji: '❤️' },
                  { value: 'favorites', label: 'Favorites', emoji: '⭐' },
                  { value: 'photos', label: 'Photos', emoji: '🖼️' },
                  { value: 'videos', label: 'Videos', emoji: '🎬' },
                  { value: 'gifs', label: 'GIFs', emoji: '🎞️' }
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all shrink-0 ${
                      filter === f.value
                        ? 'bg-gray-600 text-white'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span className="text-base">{f.emoji}</span>
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Collection Grid */}
          {filteredCollection.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='flex justify-start flex-wrap gap-4 lg:gap-6'
            >
              <AnimatePresence>
                {filteredCollection.map((item) => (
                  <CollectionCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No items match this filter</h3>
              <p className="text-gray-400">Try selecting a different filter</p>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-8xl mb-6"
          >
            📦
          </motion.div>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-white">
            Collection is Empty
          </h2>
          <p className="text-xl text-gray-400 mb-8">Start searching and save your favorite media</p>
          <a
            href="/"
            className="px-8 py-4 rounded-xl bg-gray-700 text-white hover:bg-gray-800 font-medium active:scale-95 transition-all"
          >
            Start Searching
          </a>
        </motion.div>
      )}
    </div>
  )
}

export default CollectionPage