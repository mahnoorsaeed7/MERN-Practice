import { useState } from 'react'
import './App.css'
import Card from './components/card.jsx'


const initialName = prompt("Your name:")
const arr = [1, 8, 9, 3]

function App() {

  const [name, setusername] = useState(initialName || "Guest")

  return (
    <div className="min-h-screen bg-zinc-950 py-10">
      <Card picture="01" username={name} />
    </div>
  )
}

export default App
