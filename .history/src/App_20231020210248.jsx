import { useState } from 'react'
import Editor from '@monaco-editor/react'
import './App.css'

const files = {
  "script.py": {
    name: "script.py"
  }
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Editor
      height="100vh"
      width="100%"
      theme="vs-dark"
      path='filename'
      defaultLanguage="html"
      />
    </div>
  )
}

export default App
