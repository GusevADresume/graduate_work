import React from "react";
import { Filelist } from "../components/Filelist";
import { DnDFiles } from "../components/DnDFiles";
import { useRequestedUserId } from "../store/store";
import { useAuth } from "../store/store";
import { SideBar } from "../components/SideBar";

function Storage() {
  const UserStoreId = useRequestedUserId((state) => state.OwnerId[0]);
  const userId = useAuth((state) => state.auth);

  return (
    <div className="Storage">
      <SideBar />
      <div className="StorageControls">
        <Filelist />
        {UserStoreId === userId.id ? <DnDFiles /> : ""}
      </div>
    </div>
  );
}

export { Storage };

