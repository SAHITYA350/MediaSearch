import { useSelector } from 'react-redux'
import ResultGrid from '../components/ResultGrid'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import { motion } from 'framer-motion'
import { Image, Video, FileImage } from 'lucide-react'

const HomePage = () => {
  const { query } = useSelector((store) => store.search)

  return (
    <div className='min-h-screen'>
      <SearchBar />

      {query ? (
        <div>
          <Tabs />
          <ResultGrid />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center justify-center py-10 sm:py-20 px-4'
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className='mb-8 p-6 rounded-full'
            style={{ background: '#252525' }}
          >
            <Image className='w-12 h-12 sm:w-16 sm:h-16 text-white' />
          </motion.div>

          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center text-white'>
            Discover Amazing Media
          </h1>
          
          <p className='text-base sm:text-lg md:text-xl text-gray-400 text-center max-w-2xl mb-8 px-4'>
            Search millions of high-quality photos, videos, and GIFs. Save your favorites and build your perfect collection.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 max-w-4xl w-full px-4'>
            {[
              { icon: Image, title: 'Photos', desc: 'High-quality images' },
              { icon: Video, title: 'Videos', desc: 'HD video content' },
              { icon: FileImage, title: 'GIFs', desc: 'Animated moments' }
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className='p-6 rounded-2xl border'
                  style={{
                    background: '#252525',
                    borderColor: '#333333'
                  }}
                >
                  <Icon className='w-8 h-8 sm:w-10 sm:h-10 mb-3 text-white' />
                  <h3 className='text-lg sm:text-xl font-semibold mb-2 text-white'>{feature.title}</h3>
                  <p className='text-sm sm:text-base text-gray-400'>{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
          <div className='mt-20 p-4 rounded-lg text-center text-gray-400 text-sm sm:text-base' style={{ background: '#1a1a1a', borderColor: '#333333' }}>
            Made with ❤️ by Sahitya Ghosh || 8777099335
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default HomePage