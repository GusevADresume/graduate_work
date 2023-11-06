import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/store";
import { useFileStore } from "../store/store";
import { useRequestedUserId } from "../store/store";

function SideBar() {
  const authStatus = useAuth((state) => state.auth);
  const fetchFiles = useFileStore((state) => state.fetchFiles);
  const setUserStoreId = useRequestedUserId((state) => state.setId);

  const handleFecthMyFiles = () => {
    setUserStoreId(authStatus.id);
    fetchFiles();
  };
  return (
    <div className="SideBar">
      {authStatus.status == true ? (
        <NavLink onClick={handleFecthMyFiles} className="nav-link sbarLink" to="/store">
          Хранилище
        </NavLink>
      ) : (
        ""
      )}

      <div className="dividingLine"></div>
      {authStatus.is_staff == true ? (
        <NavLink className="nav-link sbarLink" to="/userslist">
          Пользователи
        </NavLink>
      ) : (
        ""
      )}
    </div>
  );
}

export { SideBar };
