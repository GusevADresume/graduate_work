async function UserDellRequest(id) {
  let myHeaders = new Headers();
  myHeaders.append(
    "X-CSRFToken",
    document.cookie.split("=")[document.cookie.split("=").length - 1]
  );
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Cookie",
    document.cookie.split("=")[document.cookie.split("=").length - 1]
  );

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(`/users-list/${id}/`, requestOptions);
}

export { UserDellRequest };
