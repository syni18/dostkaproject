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
    name: "index.html",
    language: "python",
    value: "here is some python text"
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
      path={file.name}
      defaultLanguage="html"
      />
    </div>
  )
}

export default App
