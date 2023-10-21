import { useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import prettier from 'prettier';
import './App.css'

const files = {
  "index.html": {
    name: "index.html",
    language: "html",
    value: "// write your html code here...",
  },
  "index.css": {
    name: "index.css",
    language: "css",
    value: "/* write your css code here... */",
  },
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: "// write your javascript code here...",
  },
};

function App() {
  const [filename, setFilename] = useState("index.html");
  const [text, setText] = useState("");
  const editorRef = useRef(null);
  const file = files[filename];

  function handleEditor(editor, monaco){
    editorRef.current = editor;
  }
const copyCodeToClipboard = () => {
  if (editorRef.current) {
    const codeLines = editorRef.current.getValue();

    const codeWithoutComments = codeLines.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '');    const p = document.createElement("p");
    const pValueset = document.querySelector('textarea');
    pValueset.value = formattedCode;

  }
};
  return (
    <div className="App">
      <div className="change_btn">
        <button onClick={() => setFilename("index.html")}>HTML</button>
        <button onClick={() => setFilename("index.css")}>css</button>
        <button onClick={() => setFilename("script.js")}>Javascript</button>
        <button onClick={copyCodeToClipboard}>Copy Text</button>
      </div>
      <Editor
        className="editor_"
        height="90vh"
        width="70%"
        theme="vs-dark"
        onMount={handleEditor}
        path={file.name}
        value={text}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
     <textarea name="" id="" cols="30" rows="10" disabled></textarea>
    </div>
  );
}

export default App
