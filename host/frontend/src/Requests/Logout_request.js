async function LogoutR() {
  let myHeaders = new Headers();
  myHeaders.append("X-CSRFToken", document.cookie.split("=")[1]);

  const options = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch("/api-auth/logout/", options);
}

export { LogoutR };
