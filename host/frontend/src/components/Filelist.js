import React from "react";
import { File } from "./File";
import { useFileStore } from "../store/store";

function Filelist() {
  const files = useFileStore((state) => state.fileStore);
  return (
    <div className="FileList">
      <div className="TableHeader">
        <div className="Cell Small"> id </div>
        <div className="Cell">original_file_name </div>
        <div className="Cell">comment</div>
        <div className="Cell Small">size </div>
        <div className="Cell Small">external url</div>
        <div className="Cell Small">download</div>
        <div className="Cell Small">delete</div>
        <div className="Cell Small">last download</div>
        <div className="Cell Small">upload date</div>
      </div>
      {files.map((object, key) => {
        return (
          <div key={key} className="fileRow">
            <File file={object} />
          </div>
        );
      })}
    </div>
  );
}

export { Filelist };
