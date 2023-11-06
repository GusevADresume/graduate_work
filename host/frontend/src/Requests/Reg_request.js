async function reqRequest(formdata) {
  let options = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  const response = await fetch("/api-reg/", options);
  const result = await response.json();
  if (response.status == 201) {
    return [true, result];
  } else {
    return [false, result];
  }
}

export { reqRequest };
