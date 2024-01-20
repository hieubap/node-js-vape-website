let dataDetail;
const $ = (id) => {
  return document.getElementById(id);
};
const formatPrice = (str) => {
  try {
    return (
      parseInt(str)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        .replace(".00", "")
        .replace(/,/g, ".") + "đ"
    );
  } catch (error) {}
  return str;
};

$("btn-thanh-toan").onclick = () => {
  localStorage.setItem("description", $("CartSpecialInstructions").value);
  window.location.href = "/van-chuyen";
};

function renderCart(currentProducts) {
  console.log(currentProducts, "currentProducts?");
  $("tbody-checkout-cart").innerHTML = currentProducts
    .map(
      (item) => `
      <tr class="cart__row table__section">
                    <td data-label="Sản phẩm">
                      <a href="/products/mob-liquid-pms-peach-mango-strawberry-60ml" class="cart__image">
                        <img src="//product.hstatic.net/200000019872/product/mob_liquid_pms_peach_mango_strawberry_39b3bc245df24ef1a1c977ae05f0a476_medium.png" alt="Mob Liquid PMS Peach Mango Strawberry (60ml)(Đào Xoài Dâu Tây)">
                      </a>
                    </td>
                    <td>
                      <div class="h4">
                        ${item.dataDetail.categoryName} (${
        item.dataDetail.fullName
      })
                      </div>

                      
                      <div id="remove-${
                        item.dataDetail.code
                      }" class="cart__remove cart__remove_item_cart" style="cursor:pointer">
                        <small><i class="fa fa-times" aria-hidden="true"></i></small>
                      </div>
                    </td>
                    <td data-label="Đơn giá">
                      <span class="h3"> ${formatPrice(
                        item.dataDetail.basePrice
                      )} </span>
                    </td>
                    <td data-label="Số lượng">
                      <div class="js-qty">
                        <button type="button" class="js-qty__adjust js-qty__adjust--minus icon-fallback-text" data-id="" data-qty="0">
                          <span class="icon icon-minus" aria-hidden="true"></span>
                          <span class="fallback-text" aria-hidden="true">−</span>
                          <span class="visually-hidden">Giảm số lượng sản phẩm đi 1</span>
                        </button>
                        

      <div class="js-qty">
        <button id="btn-sub-${
          item.dataDetail.code
        }" type="button" class="btn-sub-class js-qty__adjust js-qty__adjust--minus icon-fallback-text" data-id="" data-qty="0">
      	<span class="icon icon-minus" aria-hidden="true"></span>
      	<span class="fallback-text" aria-hidden="true">−</span>
      	<span class="visually-hidden">Giảm số lượng sản phẩm đi 1</span>
        </button>
        <input type="number" class="js-qty__num" value="${
          item.soLuong
        }" min="1" data-id="" aria-label="quantity" pattern="[0-9]*" name="updates[]" id="updates_">
        <button type="button" class="js-qty__adjust js-qty__adjust--plus icon-fallback-text" data-id="" data-qty="11">
      	<span class="icon icon-plus" aria-hidden="true"></span>
      	<span class="fallback-text" aria-hidden="true">+</span>
      	<span class="visually-hidden">Tăng số lượng sản phẩm lên 1</span>
        </button>
      </div>
    <button id="btn-add-${
      item.dataDetail.code
    }" type="button" class="btn-add-class js-qty__adjust js-qty__adjust--plus icon-fallback-text" data-id="" data-qty="11">
                          <span class="icon icon-plus" aria-hidden="true"></span>
                          <span class="fallback-text" aria-hidden="true">+</span>
                          <span class="visually-hidden">Tăng số lượng sản phẩm lên 1</span>
                        </button>
                      </div>
                    </td>
                    <td data-label="Tổng giá" class="text-right">
                      <span class="h3"> ${formatPrice(
                        item.soLuong * item.dataDetail.basePrice
                      )} </span>
                    </td>
                  </tr>
    `
    )
    .join("");
  document.getElementById("span-tong-tien").innerHTML = formatPrice(
    currentProducts.reduce((a, b) => a + b.dataDetail.basePrice * b.soLuong, 0)
  );

  [...document.getElementsByClassName("cart__remove_item_cart")].forEach(
    (i) => {
      i.onclick = function () {
        console.log("click", i.id, currentProducts);
        currentProducts = currentProducts.filter(
          (item) => "remove-" + item.dataDetail.code != i.id
        );
        renderCart(currentProducts);
        localStorage.setItem(
          "currentProducts",
          JSON.stringify(currentProducts)
        );
      };
    }
  );
  [...document.getElementsByClassName("btn-add-class")].forEach((i) => {
    i.onclick = function () {
      let index = currentProducts.findIndex(
        (item) => "btn-add-" + item.dataDetail.code == i.id
      );
      currentProducts[index] = {
        dataDetail: currentProducts[index].dataDetail,
        soLuong: currentProducts[index].soLuong + 1,
      };
      renderCart(currentProducts);
      localStorage.setItem("currentProducts", JSON.stringify(currentProducts));
    };
  });
  [...document.getElementsByClassName("btn-sub-class")].forEach((i) => {
    i.onclick = function () {
      let index = currentProducts.findIndex(
        (item) => "btn-sub-" + item.dataDetail.code == i.id
      );
      currentProducts[index] = {
        dataDetail: currentProducts[index].dataDetail,
        soLuong:
          currentProducts[index].soLuong > 1
            ? currentProducts[index].soLuong - 1
            : 1,
      };
      renderCart(currentProducts);
      localStorage.setItem("currentProducts", JSON.stringify(currentProducts));
    };
  });
}

async function addProduct(item) {
  let currentProducts = await localStorage.getItem("currentProducts");
  currentProducts = currentProducts ? JSON.parse(currentProducts) : [];
  if (
    !!currentProducts.find((i) => i.dataDetail.code == item.dataDetail.code)
  ) {
  } else {
    currentProducts = [item, ...currentProducts];
    localStorage.setItem("currentProducts", JSON.stringify(currentProducts));
  }
  renderCart(currentProducts);
}
let authData;

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
  console.log("running-checkout");
  authData = await localStorage.getItem("auth");
  if (!authData) {
    authData = await getToken();
  } else {
    authData = JSON.parse(authData);
  }

  let currentProducts = await localStorage.getItem("currentProducts");
  currentProducts = currentProducts ? JSON.parse(currentProducts) : [];

  renderCart(currentProducts);

  //   Promise.all(
  //     currentProducts.map((item) =>
  //       fetch("/api/public/products/code/" + item.dataDetail.code, {
  //         method: "get",
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: authData.token_type + " " + authData.access_token,
  //           Retailer: "hethongvapedonganh",
  //         },
  //         // body: details,
  //       }).then((res) => res.json())
  //     )
  //   )
  //     // .then((res) => res.map((i) => i.json()))
  //     .then((res) => {
  //       console.log(res, "res???");
  //       //   dataDetail = res;
  //       // localStorage.setItem("auth", JSON.stringify(res));
  //       //   resolve(res);
  //     })
  //     .catch(reject);
}

running();
