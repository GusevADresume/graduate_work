async function authRequest(method, formdata, callback) {
  if (method == "GET") {
    let options = {
      method: "GET",
    };
    const response = await fetch("/api-auth/login/", options);
  } else {
    let myHeaders = new Headers();
    myHeaders.append(
      "X-CSRFToken",
      document.cookie.split("=")[document.cookie.split("=").length - 1]
    );
    const options = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch("/api-auth/login/", options);
    if (response.redirected == true) {
      const result = await response.json();
      return [true, result];
    } else {
      return [false];
    }
  }
}

export { authRequest };
