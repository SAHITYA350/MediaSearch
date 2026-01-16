import { useDispatch, useSelector } from 'react-redux'
import { removeCollection, removeToast, toggleLike, toggleFavorite } from '../redux/features/collectionSlice'
import { Heart, Star, Download, ExternalLink, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { downloadMedia } from '../api/mediaApi'
import { useState, useEffect } from 'react'

const CollectionCard = ({ item }) => {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const liked = useSelector(state => state.collection.liked)
  const favorites = useSelector(state => state.collection.favorites)

  const isLiked = liked.includes(item.id)
  const isFavorite = favorites.includes(item.id)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const removeFromCollection = (item) => {
    dispatch(removeCollection(item.id))
    dispatch(removeToast())
  }

  const handleDownload = async (e) => {
    e.stopPropagation()
    const filename = `${item.type}-${item.id}.${item.type === 'gif' ? 'gif' : item.type === 'video' ? 'mp4' : 'jpg'}`
    await downloadMedia(item.src, filename)
  }

  const handleCardClick = (e) => {
    if (isMobile) {
      e.preventDefault()
      setIsHovered(!isHovered)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleCardClick}
      className='w-full sm:w-[45%] md:w-[30%] lg:w-[23%] xl:w-[18%] relative h-80 rounded-2xl overflow-hidden group cursor-pointer'
      style={{
        background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      <a target='_blank' className='h-full block' href={item.url}>
        {!imageLoaded && (
          <div className='absolute inset-0 bg-linear-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse' />
        )}
        {item.type === 'photo' && (
          <img 
            className='h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110' 
            src={item.src} 
            alt={item.title}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        )}
        {item.type === 'video' && (
          <video 
            className='h-full w-full object-cover object-center' 
            autoPlay 
            loop 
            muted 
            src={item.src}
            onLoadedData={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          ></video>
        )}
        {item.type === 'gif' && (
          <img 
            className='h-full w-full object-cover object-center' 
            src={item.src} 
            alt={item.title}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        )}
      </a>

      {/* Gradient Overlay - Always visible on mobile when clicked */}
      <div className={`absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent ${
        isMobile && isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      } transition-opacity duration-300`} />

      {/* Top Action Buttons - ALWAYS VISIBLE */}
      <div className='absolute top-3 right-3 flex gap-2 z-10'>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            dispatch(toggleLike(item.id))
          }}
          className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
            isLiked ? 'bg-red-500/80' : 'bg-black/40 hover:cursor-pointer hover:bg-red-500/60'
          } ${isMobile ? 'w-11 h-11' : ''}`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            dispatch(toggleFavorite(item.id))
          }}
          className={`p-2.5 rounded-full backdrop-blur-md cursor-pointer transition-all ${
            isFavorite ? 'bg-yellow-500/80' : 'bg-black/40 hover:bg-yellow-500/60'
          } ${isMobile ? 'w-11 h-11' : ''}`}
        >
          <Star className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Bottom Info - Always visible on mobile when clicked */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 ${
        isMobile && isHovered ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
      } transition-transform duration-300`}>
        <div className='backdrop-blur-xl bg-black/60 rounded-xl p-4 border border-white/10'>
          <h2 className='text-sm font-semibold capitalize mb-2 line-clamp-2 text-white'>{item.title || 'Untitled'}</h2>
          <p className='text-xs text-gray-400 mb-3'>Saved: {format(new Date(item.savedAt), 'PPp')}</p>
          
          <div className='flex gap-2'>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                removeFromCollection(item)
              }}
              className='flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-[10px] cursor-pointer font-medium active:scale-95 transition-transform'
            >
              <Trash2 className='w-6 h-5' />
              Remove
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleDownload(e)
              }}
              className='p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 cursor-pointer transition-all'
            >
              <Download className='w-7 h-5' />
            </button>
            <a
              href={item.url}
              target='_blank'
              className='p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all'
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className='w-7 h-5 mt-1' />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CollectionCard