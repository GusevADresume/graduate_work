import React from "react";
import { useState } from "react";

function LoadFileList({ file, callback }) {
  const [comment, setComment] = useState("");

  const addComment = (value) => {
    setComment(value);
  };

  const addComentToState = () => {
    callback({ id: file.id, comment: comment });
  };
  return (
    <div>
      <div>{file.file.name}</div>
      <input
        type="text"
        value={comment}
        onChange={(e) => addComment(e.target.value)}
        onBlur={addComentToState}
      />
    </div>
  );
}

export { LoadFileList };
