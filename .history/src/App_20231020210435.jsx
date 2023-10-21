import { useState } from 'react'
import Editor from '@monaco-editor/react'
import './App.css'

const files = {
  "script.py": {
    name: "script.py",
    language: "python",
    value: "here is some python text"
  }
  "index.html": {

  }
}

function App() {
  const [filename, setFilename] = useState("script.py");
  const file = files[filename];

  return (
    <div className="App">
      <Editor
      height="100vh"
      width="100%"
      theme="vs-dark"
      path={filename}
      defaultLanguage="html"
      />
    </div>
  )
}

export default App
