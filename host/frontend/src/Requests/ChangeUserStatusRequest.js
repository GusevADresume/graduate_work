async function ChangeUserStatusRequest(id, status) {
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
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify({
      is_staff: !status,
    }),
    redirect: "follow",
  };

  const response = await fetch(`/users-list/${id}/`, requestOptions);
}

export { ChangeUserStatusRequest };
