import { motion } from 'framer-motion'

const LoadingSkeleton = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
        {[...Array(10)].map((_, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="relative h-80 rounded-xl overflow-hidden bg-gray-900 border border-gray-800"
          >
            <div className="h-full w-full bg-gray-800 animate-pulse" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="h-4 bg-gray-700 rounded mb-2 w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-700 rounded mb-3 w-1/2 animate-pulse" />
                <div className="flex gap-2">
                  <div className="flex-1 h-10 bg-gray-700 rounded animate-pulse" />
                  <div className="w-10 h-10 bg-gray-700 rounded animate-pulse" />
                  <div className="w-10 h-10 bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default LoadingSkeleton