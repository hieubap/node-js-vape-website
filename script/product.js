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

$("btnCloseQVCart").onclick = function (e) {
  $("quickview-cart").style.right = "-400px";
};
// Nút thêm tất cả vào giỏ
$("AddToCart").onclick = function (e) {
  e.preventDefault();
  //   $(".cart-overlay").classList.add("open");
  //   $(".quickview-cart").classList.add("drawer--is-open");
  $("quickview-cart").style.right = 0;
  addProduct({ dataDetail, soLuong: 1 });
};
// $("body").on("click", "#discount-promotion-combo-add-btn", );

function renderCart(currentProducts) {
  $("cart-product-select").innerHTML = currentProducts
    .map(
      (item) => `
      <li class="cart-item">
			<div id="remove-${
        item.dataDetail.code
      }" class="cart__remove cart__remove_item_cart" style="cursor:pointer">
				<img src="//theme.hstatic.net/200000019872/1001131403/14/close_80px.png?v=115" width="15"></div>
			<div class="grid mg-left-15">
				<div class="grid__item large--four-twelfths medium--four-twelfths small--four-twelfths pd-left15">
					<div class="cart-item-img text-center">
						<a href="/products/mob-liquid-pms-peach-mango-strawberry-salt-nic-30ml">
							
							<img src="//product.hstatic.net/200000019872/product/mob_liquid_pms_peach_mango_strawberry_salt_nic_6e4726c391c045d09744f0e4659caf9e_compact.png" alt="Mob Liquid PMS Peach Mango Strawberry Salt Nic (30ml)(Đào Xoài Dâu)">
							
						</a>
					</div>
				</div>
				<div class="grid__item large--eight-twelfths medium--eight-twelfths small--eight-twelfths pd-left15">
					<div class="cart-item-info text-left">
						<a href="/products/mob-liquid-pms-peach-mango-strawberry-salt-nic-30ml">${
              item.dataDetail.fullName
            } ${item.dataDetail.categoryName}</a> 
					</div>
					<div class="cart-item-price-quantity text-left">
						<span class="quantity">Số lượng: 
	
							<div class="js-qty">
								<button id="btn-sub-${
                  item.dataDetail.code
                }" type="button" class="btn-sub-class js-qty__adjust js-qty__adjust--minus icon-fallback-text" data-id="1106426447" data-qty="1">
									<span class="icon icon-minus" aria-hidden="true"></span>
									<span class="fallback-text" aria-hidden="true">−</span>
									<span class="visually-hidden">Giảm số lượng sản phẩm đi 1</span>
								</button>
								<input type="number" class="js-qty__num" value="${
                  item.soLuong
                }" min="0" data-id="1106426447" aria-label="quantity" pattern="[0-9]*" name="updates[]" id="updates_1106426447">
								<button id="btn-add-${
                  item.dataDetail.code
                }" type="button" class="btn-add-class js-qty__adjust js-qty__adjust--plus icon-fallback-text" data-id="1106426447" data-qty="31">
									<span class="icon icon-plus" aria-hidden="true"></span>
									<span class="fallback-text" aria-hidden="true">+</span>
									<span class="visually-hidden">Tăng số lượng sản phẩm lên 1</span>
								</button>
							</div>
						</span>
						<span class="current-price">Giá/sp: ${formatPrice(
              item.dataDetail.basePrice
            )}</span>
					</div>
				</div>
			</div>
		</li>
    `
    )
    .join("");

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
  authData = await localStorage.getItem("auth");
  if (!authData) {
    authData = await getToken();
  } else {
    authData = JSON.parse(authData);
  }

  console.log("running...2", authData);
  const code = window.location.search.substring(6);
  fetch("/api/public/products/code/" + code, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      authorization: authData.token_type + " " + authData.access_token,
      Retailer: "hethongvapedonganh",
    },
    // body: details,
  })
    .then((res) => res.json())
    .then((res) => {
      dataDetail = res;
      console.log(res, "res???");
      // localStorage.setItem("auth", JSON.stringify(res));
      $("id-price").innerHTML = formatPrice(res.basePrice);
      $("id-name").innerHTML = res.fullName;
      
      resolve(res);
    })
    .catch(reject);
}

running();
