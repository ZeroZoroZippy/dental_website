import './App.css'
import Homepage from './pages/Homepage'
import { useLenis } from './hooks/useLenis'
import { BookingProvider } from './components/BookingProvider'

function App() {
  useLenis();
  
  return (
    <BookingProvider>
      <div className="App">
        <Homepage />
      </div>
    </BookingProvider>
  )
}

export default App
