let storeApp = {};
let authData;

function getStore() {
  return storeApp;
}

function setStore(payload) {
  storeApp = { ...storeApp, ...payload };
  localStorage.setItem("store", JSON.stringify(storeApp));
}

const getToken = () => {
  var details = Object.entries({
    client_id: "ca5899e1-aa95-432c-95e6-0389b0777f27",
    client_secret: "066BAFA59CA142B49AF3D3D5D9DD90A3DBC1A5B0",
    // client_id: "e0dd9d94-e724-4b9b-ad1b-784b59d2bbbc",
    // client_secret: "185934464D354D2A63F1C78BC7AB4C008F3DDBE5",
    grant_type: "client_credentials",
    scopes: "PublicApi.Access",
  })
    .map(([k, v]) => k + "=" + v)
    .join("&");
  return new Promise((resolve, reject) => {
    fetch("/api/id/connect/token", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: details,
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("auth", JSON.stringify(res));
        resolve(res);
      })
      .catch(reject);
  });
};

async function running() {
  console.log('running...');
  authData = await localStorage.getItem("auth");
  if (!authData) {
    authData = await getToken();
  } else {
    authData = JSON.parse(authData);
  }

  storeApp["currentProducts"] = await localStorage.getItem("currentProducts");
}

running();

const $ = (id) => {
  return document.getElementById(id);
};

export { getStore, setStore, $ };
