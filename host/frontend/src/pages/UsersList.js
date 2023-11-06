import React, { useEffect } from "react";
import { UsersView } from "../components/UsersView";
import { useUsersList } from "../store/store";
import { SideBar } from "../components/SideBar";

function UsersList() {
  const usersFetch = useUsersList((state) => state.fetchUsers);
  const usList = useUsersList((state) => state.usersStore);

  useEffect(() => {
    usersFetch();
  }, []);

  return (
    <div className="AdminArea">
      <SideBar />
      <div className="UserList">
        <div className="TableHeader">
          <div className="Cell Small">id</div>
          <div className="Cell">UserName</div>
          <div className="Cell">email</div>
          <div className="Cell Small">admin</div>
          <div className="Cell Small">storage</div>
          <div className="Cell">FullName</div>
          <div className="Cell Small">Dell User</div>
        </div>
        {usList.map((object, key) => {
          return (
            <div key={key} className="fileRow">
              <UsersView UserRow={object} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { UsersList };
