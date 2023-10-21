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
    value: "<div> </div"
  }
}

function App() {
  const [filename, setFilename] = useState("script.py");
  const [text, setText] = useState("");
  const editorRef = useRef(null);
  const file = files[filename];

  function handleEditor(editor, monaco){
    editorRef.current = editor;
  }
  const copyCodeToClipboard = () => {
    if (editorRef.current) {
      // Get the code from the editor instance
      const codeToCopy = editorRef.current.getValue();

      // Create a temporary textarea to copy the code
      const textArea = document.createElement("textarea");
      textArea.value = codeToCopy;

      // Append the textarea to the document
      document.body.appendChild(textArea);

      // Select the text in the textarea and copy it to the clipboard
      // textArea.select();
      // document.execCommand("copy");

      // Remove the temporary textarea
      // document.body.removeChild(textArea);
    }
  };
  return (
    <div className="App">
      <div className="change_btn">
        <button onClick={() => setFilename("index.html")}>HTML</button>
        <button onClick={() => setFilename("script.py")}>Python</button>
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
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>
  );
}

export default App
