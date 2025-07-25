import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Homepage from './pages/Homepage'
import ServicesPage from './pages/ServicesPage'
import GalleryPage from './pages/GalleryPage'
import { useLenis } from './hooks/useLenis'
import { BookingProvider } from './components/BookingProvider'

function App() {
  useLenis();

  return (
    <BookingProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </div>
      </Router>
    </BookingProvider>
  )
}

export default App
