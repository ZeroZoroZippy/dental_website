import './App.css'
import Homepage from './pages/Homepage'
import { useLenis } from './hooks/useLenis'

function App() {
  useLenis();
  
  return (
    <div className="App">
      <Homepage />
    </div>
  )
}

export default App
