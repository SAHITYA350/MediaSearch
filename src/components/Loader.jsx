import React from 'react'

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="loader" />
      <div className="mt-8 text-center">
        <h3 className="text-xl font-medium text-gray-300 mb-2">Loading MediaSearch</h3>
        <p className="text-gray-500">Preparing your experience...</p>
      </div>
      
      {/* Add styles in a regular style tag */}
      <style>
        {`
          .loader {
            width: 64px;
            height: 64px;
            position: relative;
            background: #252525;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }
          
          .loader:before {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 40px;
            height: 40px;
            transform: rotate(45deg) translate(30%, 40%);
            background: #4a5568;
            box-shadow: 32px -34px 0 5px #2d3748;
            animation: slide 2s infinite ease-in-out alternate;
          }
          
          .loader:after {
            content: "";
            position: absolute;
            left: 10px;
            top: 10px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #4299e1;
            transform: rotate(0deg);
            transform-origin: 35px 145px;
            animation: rotate 2s infinite ease-in-out;
          }
          
          @keyframes slide {
            0% , 100% {
              bottom: -35px
            }
            
            25% , 75% {
              bottom: -2px
            }
            
            20% , 80% {
              bottom: 2px
            }
          }
          
          @keyframes rotate {
            0% {
              transform: rotate(-15deg)
            }
            
            25% , 75% {
              transform: rotate(0deg)
            }
            
            100% {
              transform: rotate(25deg)
            }
          }
        `}
      </style>
    </div>
  )
}

export default Loader