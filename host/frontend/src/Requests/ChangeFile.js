async function ChangeFile(method, id, comment, fileName) {
  let myHeaders = new Headers();
  myHeaders.append(
    "X-CSRFToken",
    document.cookie.split("=")[document.cookie.split("=").length - 1]
  );
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: method,
    headers: myHeaders,
    body: JSON.stringify({
      comment: comment,
      original_file_name: fileName,
    }),
    redirect: "follow",
  };

  const response = await fetch(`/files/${id}/`, requestOptions);
}

export { ChangeFile };
