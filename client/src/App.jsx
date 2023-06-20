import { useState } from 'react'

import './App.css'

import Home from './components/Home/Home'
import Chat from './components/Chat/Chat'



function App() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  console.log('chatVisibility', chatVisibility)

  return (
    <div className="App">
      {
        chatVisibility ? <Chat socket={socket} /> : <Home setSocket={setSocket} setChatVisibility={setChatVisibility} />
      }

    </div >
  )
}

export default App
