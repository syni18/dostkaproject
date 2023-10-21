import { useRef, useState } from 'react'
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
  const editorRef = useRef(null);
  const file = files[filename];

  function handleEditor(editor, monaco){
    editorRef.current = editor;
  }
  function getEditorValue() {
    alert(editorRef.current.getValue());
  }
  return (
    <div className="App">
      <div className="change_btn">
        <button onClick={() => setFilename("index.html")}>HTML</button>
        <button onClick={() => setFilename("script.py")}>Python</button>
        <button onClick={getEditorValue}>Get Data</button>
      </div>
      <Editor
      className=''
        height="90vh"
        width="70%"
        theme="vs-dark"
        onMount={handleEditor}
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
    </div>
  );
}

export default App
