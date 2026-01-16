// import axios from 'axios'

// const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
// const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY
// const TENOR_KEY = import.meta.env.VITE_TENOR_KEY

// export async function fetchPhotos(query, page = 1, per_page = 20) {
//   const res = await axios.get('https://api.unsplash.com/search/photos', {
//     params: { query, page, per_page },
//     headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
//   })
//   return res.data
// }

// export async function fetchVideos(query, page = 1, per_page = 20) {
//   const res = await axios.get('https://api.pexels.com/videos/search', {
//     params: { query, per_page, page },
//     headers: { Authorization: PEXELS_KEY }
//   })
//   return res.data
// }

// export async function fetchGIF(query, pos = 0, limit = 20) {
//   const res = await axios.get('https://tenor.googleapis.com/v2/search', {
//     params: { q: query, key: TENOR_KEY, limit, pos }
//   })
//   return res.data // Fixed: return res.data instead of just res
// }

// export async function downloadMedia(url, filename) {
//   const res = await axios.get(url, { responseType: 'blob' })
//   const link = document.createElement('a')
//   link.href = window.URL.createObjectURL(res.data)
//   link.download = filename
//   link.click()
// }



import axios from 'axios'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY
const TENOR_KEY = import.meta.env.VITE_TENOR_KEY

export async function fetchPhotos(query, page = 1, per_page = 20) {
  const res = await axios.get('https://api.unsplash.com/search/photos', {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
  })
  return res.data
}

export async function fetchVideos(query, page = 1, per_page = 20) {
  const res = await axios.get('https://api.pexels.com/videos/search', {
    params: { query, per_page, page },
    headers: { Authorization: PEXELS_KEY }
  })
  return res.data
}

export async function fetchGIF(query, pos = 0, limit = 20) {
  const res = await axios.get('https://tenor.googleapis.com/v2/search', {
    params: { q: query, key: TENOR_KEY, limit, pos }
  })
  return res.data
}

export async function downloadMedia(url, filename) {
  const res = await axios.get(url, { responseType: 'blob' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(res.data)
  link.download = filename
  link.click()
}