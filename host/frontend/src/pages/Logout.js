import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { LogoutR } from "../Requests/Logout_request";
import { useAuth } from "../store/store";

function Logout() {
  const navigate = useNavigate();
  const authStatus = useAuth((state) => state.setAuth);

  useEffect(() => {
    LogoutR();
    authStatus(false, false);
    navigate("/");
  }, []);

  return <div></div>;
}

export { Logout };
