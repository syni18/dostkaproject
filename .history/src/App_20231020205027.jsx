import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Editor
      height="100vh"
      width="100"
      />
    </div>
  )
}

export default App
