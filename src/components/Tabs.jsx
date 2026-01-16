import { useDispatch, useSelector } from 'react-redux'
import { setActiveTabs, resetPagination } from '../redux/features/searchSlice'
import { Image, Video, FileImage } from 'lucide-react'
import { motion } from 'framer-motion'

const Tabs = () => {
  const tabs = [
    { name: 'photos', icon: Image, label: 'Photos' },
    { name: 'videos', icon: Video, label: 'Videos' },
    { name: 'gif', icon: FileImage, label: 'GIFs' }
  ]

  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.search.activeTab)

  return (
    <div className='px-4 sm:px-6 lg:px-10 pb-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex gap-3 overflow-x-auto scrollbar-hide'>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.name

            return (
              <motion.button
                key={tab.name}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center cursor-pointer gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-base transition-all whitespace-nowrap min-h-11 ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-white border'
                }`}
                style={{
                  background: isActive ? '#ffffff' : '#252525',
                  borderColor: isActive ? 'transparent' : '#333333'
                }}
                onClick={() => {
                  dispatch(setActiveTabs(tab.name))
                  dispatch(resetPagination())
                }}
              >
                <Icon className='w-4 h-4' />
                <span>{tab.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tabs