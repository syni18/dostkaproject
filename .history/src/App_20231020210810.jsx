import { useState } from 'react'
import Editor from '@monaco-editor/react'
import './App.css'

const files = {
  "script.py": {
    name: "script.py",
    language: "python",
    value: "here is some python text"
  },
  "index.html": {
    name: "index.html",
    language: "python",
    value: "<div> </div>"
  }
}

function App() {
  const [filename, setFilename] = useState("script.py");
  const file = files[filename];

  return (
    <div className="App">
      <button onClick={() => setFilename("index.html")}>HTML</button>
      <button onClick={() => setFilename("script.py")}>Python</button>
      <Editor
        height="100vh"
        width="100%"
        theme="vs-dark"
        path={file.name}
        defaultLanguage={file.language}
        defaultValue=''
      />
    </div>
  );
}

export default App