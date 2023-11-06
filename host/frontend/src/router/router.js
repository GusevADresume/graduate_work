import React from "react";
import { Routes, Route } from "react-router-dom";
import { StartPage } from "../pages/startPage";
import { PageNotFound } from "../pages/PageNotFound";
import { Storage } from "../pages/Storage";
import { UsersList } from "../pages/UsersList";
import { LoginForm } from "../pages/LoginForm";
import { RegistrationsForm } from "../pages/RegistrationsForm";
import { Logout } from "../pages/Logout";

function MyRouter() {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<StartPage />} />
      <Route path="/store/" element={<Storage />} />
      <Route path="/userslist" element={<UsersList />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registration" element={<RegistrationsForm />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export { MyRouter };
