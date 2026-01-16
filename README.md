# 🎨 Premium Media Search Application

A modern, feature-rich media search application built with React, Redux Toolkit, and premium UI/UX design.

## ✨ Features

- 🔍 **Smart Search**: Search millions of photos, videos, and GIFs
- 📱 **Fully Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- 🎨 **Premium UI**: Dark theme with metallic gradients and smooth animations
- ♾️ **Infinite Scroll**: Seamless pagination with automatic loading
- 💾 **Save & Organize**: Save items to your personal collection
- ❤️ **Like & Favorite**: Mark items as liked or favorite
- ⬇️ **Download**: Download media directly to your device
- 🔗 **External Links**: Open items in original source
- 🕐 **Timestamps**: Track when items were saved
- 🔄 **Real-time Filters**: Filter collection by type, likes, favorites
- 🎯 **Smart Notifications**: Toast notifications for all actions
- 💾 **LocalStorage**: Persist data across sessions

## 🚀 Tech Stack

- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons
- **React Toastify** - Notifications
- **React Infinite Scroll** - Pagination
- **Date-fns** - Date formatting
- **Axios** - API requests

## 📁 Project Structure

```
project-root/
├── src/
│   ├── api/
│   │   └── mediaApi.js          # API functions with pagination
│   ├── components/
|   |   ├── Loader.jsx           # First website loading component
│   │   ├── CollectionCard.jsx   # Enhanced collection card
│   │   ├── Navbar.jsx           # Premium navigation bar
│   │   ├── ResultCard.jsx       # Enhanced result card
│   │   ├── ResultGrid.jsx       # Grid with infinite scroll
│   │   ├── SearchBar.jsx        # Premium search bar
│   │   └── Tabs.jsx             # Animated tab navigation
│   ├── pages/
│   │   ├── CollectionPage.jsx   # Collection with filters
│   │   └── HomePage.jsx         # Home page with search
│   ├── redux/
│   │   ├── features/
│   │   │   ├── collectionSlice.js # Collection management
│   │   │   └── searchSlice.js     # Search with pagination
│   │   └── store.js             # Redux store
│   ├── App.jsx                  # Main app component
│   ├── index.css                # Enhanced styles
│   └── main.jsx                 # App entry point
├── .env                         # API keys
└── package.json                 # Dependencies
```

## 🎨 Design Features

### Color Palette
- **Primary**: Purple (#9333EA) to Blue (#3B82F6) gradients
- **Background**: Dark navy (#0f0c29, #302b63, #24243e)
- **Surface**: Glassmorphism with rgba(26, 26, 46, 0.6)
- **Accents**: Red, Yellow, Green for actions

### Animations
- Smooth hover effects
- Card scaling and transforms
- Page transitions
- Infinite scroll loading
- Toast notifications
- Button interactions

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔥 Key Features Explained

### Infinite Scroll
- Loads 20 items per page
- Automatic loading on scroll
- Loading indicator
- End message when complete

### Collection Management
- Save/Remove items
- Like items (red heart)
- Favorite items (yellow star)
- Download functionality
- Filter by type/status
- Timestamps for all items

### Enhanced UI/UX
- Glassmorphism effects
- Smooth animations
- Hover interactions
- Loading states
- Error handling
- Empty states
- Toast notifications

## 🔌 API Integration

The app uses three APIs:
- **Unsplash**: High-quality photos
- **Pexels**: HD videos
- **Tenor**: Animated GIFs

Each API supports pagination for infinite scrolling.

## 💾 Data Persistence

Uses localStorage for:
- Collection items
- Liked items
- Favorite items
- All data persists across sessions

## 🎯 Usage Tips

1. **Search**: Enter keywords and press Enter or click Search
2. **Tabs**: Switch between Photos, Videos, and GIFs
3. **Save**: Click Save button on any card
4. **Like/Favorite**: Click heart or star icons
5. **Download**: Click download icon to save media
6. **Filter**: Use filters in collection page
7. **Clear**: Clear all items with Clear All button

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🤝 Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- Unsplash for amazing photos
- Pexels for high-quality videos
- Tenor for GIFs
- React team for excellent documentation
- Tailwind CSS for utility-first CSS

---

**Made with ❤️ by Sahitya Ghosh || 8777099335**

NIT Bhubaneswar | CSE Department