import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import Loader from './components/Loader'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // 1.5 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div 
        className="min-h-screen w-full flex items-center justify-center"
        style={{
          backgroundColor: '#131313',
          backgroundImage: 'radial-gradient(#252525 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        <Loader />
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen text-white w-full"
      style={{
        backgroundColor: '#131313',
        backgroundImage: 'radial-gradient(#252525 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/collection' element={<CollectionPage />} />
      </Routes>
      <ToastContainer 
        toastClassName={() => "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-gray-900 border border-gray-800"}
        bodyClassName={() => "text-sm font-white font-med block p-3"}
      />
    </div>
  )
}

export default App