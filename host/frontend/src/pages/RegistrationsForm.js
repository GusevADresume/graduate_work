import React, { useState, useEffect } from "react";
import { reqRequest } from "../Requests/Reg_request";
import { useNavigate } from "react-router";
import regImg from "../assets/RegImg.jpg"

function RegistrationsForm() {
  const [login, setLogin] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [loginError, setLoginError] = useState(
    <div className="errorHelp">Необходимо заполнить</div>
  );
  const [passwordError, setPasswordError] = useState(
    <div className="errorHelp">Необходимо заполнить</div>
  );
  const [emailError, setEmailError] = useState(
    <div className="errorHelp">Необходимо заполнить</div>
  );
  const [formValid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginError || passwordError) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [loginError, passwordError]);

  const loginErrorHandler = (value) => {
    const re = /[а-яА-Я]/;
    if (value.length > 0) {
      if (Number.isInteger(parseInt(value[0]))) {
        setLoginError(
          <div className="errorHelp">Первый символ не может быть цифрой</div>
        );
      }
      if (value[0] == value[0].toLowerCase()) {
        setLoginError(
          <div className="errorHelp">
            Логин должен начинаться с большой буквы
          </div>
        );
      }
      if (value.length < 4 || value.length > 20) {
        setLoginError(<div className="errorHelp">Слишком короткий логин</div>);
      }
      if (re.test(value)) {
        setLoginError(<div className="errorHelp">Только латиница</div>);
      }
    } else {
      setLoginError(<div className="errorHelp">Необходимо заполнить</div>);
    }
  };

  const loginHandler = (e) => {
    setLogin(e.target.value);
    const re = /^[A-Z](.[a-zA-Z0-9_-]*){3,20}/;
    if (!re.test(String(e.target.value)) || e.target.value.length > 20) {
      loginErrorHandler(e.target.value);
    } else {
      setLoginError("");
    }
  };

  const passwordHandler = (e) => {
    setpassword(e.target.value);
    const re =
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/;
    if (!re.test(String(e.target.value))) {
      setPasswordError(<div className="errorHelp">Неверный пароль</div>);
    } else {
      setPasswordError("");
    }
  };

  const ValidateHandler = async (e) => {
    e.preventDefault();
    const secondPassword = document.querySelector(".password1").value;
    if (password != secondPassword) {
      alert("Password mismatch");
    } else {
      let formdata = new FormData();
      formdata.append("username", login);
      formdata.append("password", password);
      formdata.append("email", email);
      formdata.append("first_name", document.querySelector(".firstname").value);
      formdata.append("last_name", document.querySelector(".lastname").value);
      let result = await reqRequest(formdata);
      if (result[0] === true) {
        navigate("/login");
      } else {
        alert(result[1][Object.keys(result[1])]);
      }
    }
  };

  const emailHandler = (e) => {
    setemail(e.target.value);
    const re =
      /^((([0-9A-Za-z]{1}[-0-9A-z\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError(<div className="errorHelp">Неправильный email</div>);
    } else {
      setEmailError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "login":
        setLoginDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "email":
        setEmailDirty(true);
    }
  };

  return (
    <div className="RegistrationBody">
      <div className="RegistrationPage">
        <p className="RegistrationHeader">Регистрация</p>
        <form className="reg-form">
          <p>Придумайте логин</p>
          <input
            className="RegFormInput"
            onBlur={blurHandler}
            name="login"
            onChange={(e) => loginHandler(e)}
            type="text"
            value={login}
          ></input>
          {loginDirty && loginError && (
            <div style={{ color: "red" }}>{loginError}</div>
          )}
          <p>Имя</p>
          <input className="firstname RegFormInput" name="first name"></input>
          <p>Фамилия</p>
          <input className="lastname RegFormInput" name="last name"></input>
          <p>Email</p>
          <input
            className="RegFormInput"
            onBlur={blurHandler}
            name="email"
            value={email}
            onChange={(e) => emailHandler(e)}
            type="text"
          ></input>
          {emailDirty && emailError && (
            <div style={{ color: "red" }}>{emailError}</div>
          )}
          <p>Пароль</p>
          <input
            className="RegFormInput"
            onBlur={blurHandler}
            name="password"
            value={password}
            onChange={(e) => passwordHandler(e)}
            type="password"
          ></input>
          {passwordDirty && passwordError && (
            <div style={{ color: "red" }}>{passwordError}</div>
          )}
          <p>Повторите пароль</p>
          <input
            className="password1 RegFormInput"
            type="password"
            name="password1"
          ></input>
          <br></br>
          <button
            className="RegButton"
            onClick={ValidateHandler}
            disabled={!formValid}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
      <div className="regImg"><img className="regImage" src={regImg}></img></div>
    </div>
  );
}

export { RegistrationsForm };
