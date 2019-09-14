import React, { useState } from "react";

import Editor from "./components/Editor";

function App() {
  const [image, setImage] = useState(null);

  return (
    <div>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <Editor imageFile={image} />
    </div>
  );
}

export default App;
