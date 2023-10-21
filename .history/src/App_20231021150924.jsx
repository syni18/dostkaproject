import { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Code2, Braces, Pencil, Clipboard, Lock } from 'lucide-react';
import './App.css';

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
  const editorRef = useRef(null);
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("index.html");
  const [editorOptions, setEditorOptions] = useState({ readOnly: false });

  const file = files[filename];

  const handleEditorChange = (newValaue) => {
    setText(newValaue);

    // Store code in local storage based on the language
    localStorage.setItem(`editor-${file.language}`, newValaue);
  };

  function handleEditor(editor, monaco) {
    editorRef.current = editor;
    // Get the model for the editor
    const model = editor.getModel();

    if (model) {
      // Set the cursor position to the beginning of the second line (line 2, column 1)
      editor.setPosition({ lineNumber: 2, column: 1 });
    editor.focus();
  }

  const copyCodeToClipboard = () => {
    if (editorRef.current) {
      const codeLines = editorRef.current.getValue();

      const codeWithoutComments = codeLines.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '');
      const pValueset = document.querySelector('#textarea');
      pValueset.value = codeWithoutComments;
    }
  };

  const toggleEditorLock = () => {
    setEditorOptions({ readOnly: !editorOptions.readOnly });
  };

  // Load the code from local storage based on the language
  const loadEditorContent = () => {
    const storedContent = localStorage.getItem(`editor-${file.language}`);
    if (storedContent) {
      setText(storedContent);
    }
  };

  useEffect(() => {
    loadEditorContent();
  }, [filename]);

  return (
    <div className="App">
      <h1>Code Editor</h1>
      <div className="change_btn">
        <button onClick={() => setFilename("index.html")}>
          <Code2 size={18} id="btn_icon" />
          HTML
        </button>
        <button onClick={() => setFilename("index.css")}>
          <Pencil size={18} id="btn_icon" />
          CSS
        </button>
        <button onClick={() => setFilename("script.js")}>
          <Braces size={18} id="btn_icon" />
          JavaScript
        </button>
        <button onClick={copyCodeToClipboard}>
          <Clipboard size={18} id="btn_icon" />
          Copy Text
        </button>
        <button
          onClick={toggleEditorLock}
          className={editorOptions.readOnly ? 'locked' : 'unlocked'}
        >
          <Lock size={18} id="btn_icon" />
          {editorOptions.readOnly ? 'Unlock Editor' : 'Lock Editor'}
        </button>
        <button onClick={loadEditorContent}>Load</button>
      </div>
      <Editor
        className="editor_"
        height="70vh"
        width="70%"
        theme="vs-dark"
        onMount={handleEditor}
        path={file.name}
        value={text}
        options={{ ...editorOptions, fontSize: 16 }}
        defaultLanguage={file.language}
        defaultValue={file.value}
        onChange={handleEditorChange}
      />
      <textarea
        name=""
        id="textarea"
        cols="30"
        rows="10"
        disabled
        placeholder="Copy text display here..."
      ></textarea>
    </div>
  );
}

export default App;
