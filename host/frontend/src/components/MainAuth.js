import React from "react";
import { NavLink } from "react-router-dom";

export default function MainAuth() {
  return (
    <div className="MainAuth">
      <div className="mainBtn regBtn">
        <NavLink className="nav-link colorBtn" to="/registration">
          Зарегистрироваться
        </NavLink>
      </div>
      <p>ИЛИ</p>
      <div className="mainBtn logBtn">
        <NavLink className="nav-link colorBtn" to="/login">
          Войти
        </NavLink>
      </div>
    </div>
  );
}
