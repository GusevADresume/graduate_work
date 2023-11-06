import React, { useState } from "react";
import { ChangeFile } from "../Requests/ChangeFile";
import { useFileStore } from "../store/store";
import { formatBytes } from "./formatBytes";
import { useRequestedUserId } from "../store/store";
import { useAuth } from "../store/store";
import { Tooltip } from "./Tooltip";
import { useRef } from "react";

function File({ file }) {
  const fetchFiles = useFileStore((state) => state.fetchFiles);
  const UserStoreId = useRequestedUserId((state) => state.OwnerId[0]);
  const userId = useAuth((state) => state.auth);
  const [toolT, setToolT] = useState({});
  const originalFileName = React.useRef(null);
  const comment = React.useRef(null);

  const saveCommentHandler = (e) => {
    let cmnt = comment.current.value;
    let fileName = originalFileName.current.value;
    if (cmnt.length <= 0) {
      cmnt = null;
    }
    if (fileName.length <= 0) {
      setToolT({
        x: originalFileName.current.getBoundingClientRect().left + 30,
        y: 0,
        value: "File name cannot be empty",
        visible: true,
      });
      setTimeout(() => {
        setToolT({
          x: 0,
          y: 0,
          value: "",
          visible: false,
        });
      }, 1000);
      return;
    }

    ChangeFile("PATCH", file.id, cmnt, fileName);
    updateStore();
  };

  const copyHandler = (e) => {
    setToolT({
      x: e.target.getBoundingClientRect().left - 80,
      y: 0,
      value: "URL copy",
      visible: true,
    });
    setTimeout(() => {
      setToolT({
        x: 0,
        y: 0,
        value: "",
        visible: false,
      });
    }, 1000);
    let inp = document.createElement("input");
    inp.value = file.unique_url;
    document.body.appendChild(inp);
    inp.select();
    document.execCommand("copy");
    document.body.removeChild(inp);

    //navigator.clipboard.writeText(file.unique_url).then(() => {});
  };

  const dellFileHandler = () => {
    ChangeFile("DELETE", file.id);
    updateStore();
  };

  const updateStore = () => {
    if (UserStoreId == userId.id) {
      setTimeout(() => {
        fetchFiles();
      }, 1000);
    } else {
      setTimeout(() => {
        fetchFiles(UserStoreId);
      }, 1000);
    }
  };

  return (
    <>
      <Tooltip
        value={toolT.value}
        x={toolT.x}
        y={toolT.y}
        visible={toolT.visible}
      />
      <div className="Cell Small">{file.id}</div>
      <div className="Cell">
        <input
          className="FileInputName"
          ref={originalFileName}
          defaultValue={file.original_file_name}
        ></input>
      </div>
      <div className="Cell">
        <input
          className="FileInput"
          ref={comment}
          defaultValue={file.comment}
        ></input>
        <button className="FileBtn" onClick={saveCommentHandler}>
          Save
        </button>
      </div>
      <div className="Cell Small">{formatBytes(file.size)}</div>
      <div className="Cell Small">
        <button className="FileBtn" onClick={copyHandler}>
          Copy Url
        </button>
      </div>
      <div className="Cell Small">
        <div className="dwloadfile">
        <a className=" nav-link dwnloadlink" href={file.unique_url}>Download</a>
        </div>
      </div>
      <div className="Cell Small">
        <button className="FileBtn" onClick={dellFileHandler}>
          Dell
        </button>
      </div>
      <div className="Cell Small">{file.last_download}</div>
      <div className="Cell Small">{file.upload_date}</div>
    </>
  );
}

export { File };
