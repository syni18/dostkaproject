import { useRef, useState, useEffect } from 'react'
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
  const [editorOptions, setEditorOptions] = useState({readOnly: false});
  const [text, setText] = useState("");
  const editorRef = useRef(null);
  const file = files[filename];

  function handleEditor(editor, monaco){
    editorRef.current = editor;

     // Configure the JavaScript language service for auto-suggestions
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
    });

    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      [
        'declare function myFunction(param1: string, param2: number): void;',
        // Add any additional declarations or libraries here
      ].join('\n'),
      'myLib.d.ts'
    );
  }
const copyCodeToClipboard = () => {
  if (editorRef.current) {
    const codeLines = editorRef.current.getValue();

    const codeWithoutComments = codeLines.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '');    const p = document.createElement("p");
    const pValueset = document.querySelector('#textarea');
    pValueset.value = codeWithoutComments;

  }
};
const toggleEditorLock = () => {
  // Toggle between "read-only" and "editable" modes
  setEditorOptions({ readOnly: !editorOptions.readOnly });
};

 useEffect(() => {
    if (editorRef.current) {
      // Trigger auto-suggestions when the code changes
      editorRef.current.onDidChangeModelContent(() => {
        editorRef.current.trigger('anyString', 'editor.action.triggerSuggest', {});
      });
    }
  }, []);
  return (
    <div className="App">
      <div className="change_btn">
        <button onClick={() => setFilename("index.html")}>HTML</button>
        <button onClick={() => setFilename("index.css")}>css</button>
        <button onClick={() => setFilename("script.js")}>Javascript</button>
        <button onClick={copyCodeToClipboard}>Copy Text</button>
        <button onClick={toggleEditorLock} className={editorOptions.readOnly ? 'locked' : 'unlocked'}>
        {editorOptions.readOnly ? 'Unlock Editor' : 'Lock Editor'}
      </button>
      </div>
      <Editor
        className="editor_"
        height="90vh"
        width="70%"
        theme="vs-dark"
        onMount={handleEditor}
        path={file.name}
        value={text}
        options={{ ...editorOptions, fontSize: 16 }}
        defaultLanguage={file.language}
        defaultValue={file.value}
      />
     <textarea name="" id="textarea" cols="30" rows="10" disabled></textarea>
    </div>
  );
}

export default App
