const getToken = () => {
  var details = {
    client_id: "e0dd9d94-e724-4b9b-ad1b-784b59d2bbbc",
    client_secret: "185934464D354D2A63F1C78BC7AB4C008F3DDBE5",
    grant_type: "client_credentials",
    scopes: "PublicApi.Access",
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  fetch("/api/connect/token", {
    method: "post",
    headers: {
      // "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody,
    // mode: "no-cors",
  })
    .then((res) => res.json())
    .then((res) => console.log(res, "res"));
  // .then((res) => {
  //   console.log(res, "response");
  // });

  // fetch("http://localhost:8000/test", {
  //   // method: "get",
  //   // headers: {
  //   //   // "Access-Control-Allow-Origin": "*",
  //   //   "Content-Type": "application/x-www-form-urlencoded",
  //   // },
  //   // body: formBody,
  //   // mode: "no-cors",
  // }).then((res) => console.log(res, "res"));
};

getToken();
