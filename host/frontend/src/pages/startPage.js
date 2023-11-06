import React from "react";
import MainImg from "../assets/MainPage.jpg"
import MainAuth from "../components/MainAuth";

function StartPage() {
  return (
    <div className="MainContainer">
    <div className="MainPage">
      <div className="MainInfo">
        <h1 className="MainHeader">
          Бесплатный сервис <br></br>для хранения файлов
        </h1>
        <h3 className="MainText">
          Чтобы пользоваться хранилищем нужна регистрация
        </h3>
      </div>
      <div><img className="MainImg" src={MainImg}></img></div>
    </div>
    <MainAuth/>
    </div>
  );
}

export { StartPage };
