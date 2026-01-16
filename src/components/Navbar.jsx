import { Link, useLocation } from 'react-router-dom'
import { Search, Bookmark, Image } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const location = useLocation()
  const collection = useSelector(state => state.collection.items)

  return (
    <nav 
      className='sticky top-0 z-50 border-b'
      style={{
        background: '#1a1a1a',
        borderColor: '#333333'
      }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-2 group'>
            <div className='p-2 rounded-lg' style={{ background: '#252525' }}>
              <Image className='w-5 h-5 text-white' />
            </div>
            <span className='font-bold text-xl sm:text-2xl text-white'>
              MediaSearch
            </span>
          </Link>

          {/* Navigation Links */}
          <div className='flex gap-3 items-center'>
            <Link
              to='/'
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all min-h-[44px] ${
                location.pathname === '/'
                  ? 'bg-white text-black'
                  : 'bg-[#252525] hover:bg-[#2a2a2a] text-white border border-[#333333]'
              }`}
            >
              <Search className='w-4 h-4' />
              <span className='hidden sm:inline'>Search</span>
            </Link>

            <Link
              to='/collection'
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all relative min-h-[44px] ${
                location.pathname === '/collection'
                  ? 'bg-white text-black'
                  : 'bg-[#252525] hover:bg-[#2a2a2a] text-white border border-[#333333]'
              }`}
            >
              <Bookmark className='w-4 h-4' />
              <span className='hidden sm:inline'>Collection</span>
              {collection.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center'
                >
                  {collection.length}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar