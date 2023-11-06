import React from "react";
import { Auth } from "./Auth";
import { NavLink } from "react-router-dom";
import logo from "../assets/FREE file host.svg"

function TopBar() {
  return (
    <div className="TopBar">
      <NavLink className="nav-link " to="/">
      <img className="logo" src={logo}/>
      </NavLink>
      <div className="AuthBar">
        <Auth />
      </div>
    </div>
  );
}

export { TopBar };
