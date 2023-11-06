import React, { useState, useRef } from "react";
import { LoadFileList } from "./LoadFileList";
import { useFileStore } from "../store/store";
import uuid from "react-uuid";

function DnDFiles() {
  const [drag, setDrag] = useState(false);
  const [fileList, setFileList] = useState([]);
  const fetchFiles = useFileStore((state) => state.fetchFiles);
  const ref = useRef();

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    let objectsList = [];
    for (let i = 0; i < files.length; i++) {
      objectsList.push({ id: uuid(), file: files[i], comment: "" });
    }
    setFileList([...fileList, ...objectsList]);
    setDrag(false);
  }

  const loadButtonHandler = (e) => {
    ref.current.click();
  };

  const loadFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileList([...fileList, { id: uuid(), file: file, comment: "" }]);
    }
  };

  const loadFiles = async () => {
    let myHeaders = new Headers();
    myHeaders.append("X-CSRFToken", document.cookie.split("=")[1]);
    for (let i = 0; i < fileList.length; i++) {
      const formData = new FormData();
      formData.append("file", fileList[i].file);
      formData.append("comment", fileList[i].comment);
      const res = await fetch("/files/", {
        method: "POST",
        body: formData,
        headers: myHeaders,
      });
    }
    setFileList([]);
    fetchFiles();
  };

  const addComment = (value) => {
    setFileList((prevState) =>
      prevState.map((item) =>
        item.id === value.id ? { ...item, comment: value.comment } : item
      )
    );
  };

  return (
    <div className="FileArea">
      <input
        type="file"
        ref={ref}
        onChange={(e) => {
          loadFileHandler(e);
        }}
        style={{ display: "none" }}
      ></input>
      <div className="DropFilesBlock">
        <div className="loadfileList">
          {fileList.length > 0
            ? fileList.map((object, key) => {
                return (
                  <LoadFileList key={key} file={object} callback={addComment} />
                );
              })
            : ""}
        </div>
        {drag ? (
          <div
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
            className="DropArea"
          >
            Dropfiles
          </div>
        ) : (
          <div
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            className="DropArea Drop"
          >
            {" "}
            Drag and drop files{" "}
          </div>
        )}
      </div>
      <div className="LoadButtonsBlock">
        <button className="LoadButton" onClick={loadButtonHandler}>Загрузить</button>
        <button className="LoadButton" onClick={loadFiles}>Сохранить</button>
      </div>
    </div>
  );
}

export { DnDFiles };
