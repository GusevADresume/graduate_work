import React from "react";
import { formatBytes } from "./formatBytes";
import { ChangeUserStatusRequest } from "../Requests/ChangeUserStatusRequest";
import { useUsersList } from "../store/store";
import { useFileStore } from "../store/store";
import { useNavigate } from "react-router";
import { UserDellRequest } from "../Requests/UserDellRequest";
import { useRequestedUserId } from "../store/store";

function UsersView({ UserRow }) {
  const usersFetch = useUsersList((state) => state.fetchUsers);
  const fetchFiles = useFileStore((state) => state.fetchFiles);
  const setUserStoreId = useRequestedUserId((state) => state.setId);
  const navigate = useNavigate();

  const ChangeStatusHandler = () => {
    ChangeUserStatusRequest(UserRow.id, UserRow.is_staff);
    setTimeout(() => {
      usersFetch();
    }, 500);
  };

  function hostSize(files) {
    let size = 0;
    for (let i = 0; i < files.length; i++) {
      size = size + Number(files[i].size);
    }

    size = formatBytes(size);
    return size;
  }

  const userStoreView = () => {
    setUserStoreId(UserRow.storage[0].owner);
    fetchFiles(UserRow.storage[0].owner);
    navigate("/store/");
  };

  const dellUserHandler = () => {
    UserDellRequest(UserRow.storage[0].owner);
    setTimeout(() => {
      usersFetch();
    }, 500);
  };

  return (
    <>
      <div className="Cell Small">{UserRow.id}</div>
      <div className="Cell">{UserRow.username}</div>
      <div className="Cell">{UserRow.email}</div>
      <div className="Cell Small">
        <pre>
          {UserRow.is_staff == true ? "Admin" : "User"}&nbsp;
          <button className="FileBtn" onClick={ChangeStatusHandler}>Change</button>
        </pre>
      </div>
      {UserRow.storage.length > 0 ? (
        <div className="Cell Small">
          {" "}
          <button className="FileBtn" onClick={userStoreView}>{UserRow.storage[0].owner}</button>
          <div>files-{UserRow.storage[0].file.length}</div>
          <div>
            size -{" "}
            {UserRow.storage[0].file.length > 0
              ? hostSize(UserRow.storage[0].file)
              : 0}
          </div>
        </div>
      ) : (
        <div className="Cell Small">"None"</div>
      )}

      <div className="Cell">
        {UserRow.first_name} {UserRow.last_name}
      </div>
      <div className="Cell Small">
        <button className="FileBtn" onClick={dellUserHandler}>Dell</button>
      </div>
    </>
  );
}

export { UsersView };
