let authData;
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
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: details,
      // mode: "no-cors",
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("auth", JSON.stringify(res));
        resolve(res);
      })
      .catch(reject);
  });
};

const apiGetProducts = (
  payload = {
    orderBy: undefined,
    orderDirection: undefined,
    format: "json",
    currentItem: 11,
    pageSize: 10,
    includeInventory: "True",
    isActive: true,
    includePricebook: true,
    orderBy: "id",
    lastModifiedFrom: "2022-12-14",
    orderDirection: "desc",
  }
) => {
  return new Promise((resolve, reject) => {
    fetch(
      `/api/public/products?${Object.entries(payload)
        .map(([k, v]) => k + "=" + v)
        .join("&")}`,
      {
        headers: {
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          authorization: authData.token_type + " " + authData.access_token,
          Retailer: "hethongvapedonganh",
        },
        // body: details,
        // mode: "no-cors",
      }
    )
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};

const renderProductItem = (item) => {
  console.log(item.images, "item.images");
  return `<li data-hook="product-list-grid-item">
  <div
    data-slug="queen-passion-fruit"
    role="group"
    aria-label="${item.name}
    data-hook="product-item-root"
    class="ETPbIy n_dqkS EGg5Ga"
  >
    <a
      href="https://www.gemvapestore.com/product-page/queen-passion-fruit"
      tabindex="-1"
      class="oQUvqL x5qIv3"
      data-hook="product-item-container"
      ><div
        class="mS0yET heightByImageRatio heightByImageRatio2"
        aria-live="assertive"
        data-hook="ProductMediaDataHook.Images"
      >
        <div
          class="naMHY_ vALCqq"
          data-hook="ImageUiTpaWrapperDataHook.Wrapper_0"
        >
          <div
            data-source-width="1500"
            data-source-height="1500"
            data-resize="contain"
            data-use-lqip="true"
            data-is-seo-bot="false"
            class="sTakczI oX8MY_M---resize-7-contain oX8MY_M--fluid oX8MY_M--forceImageContain oX8MY_M--verticalContainer s__65YAB3 v_lwe5"
            style="--wut-source-width: 1500px; --wut-source-height: 1500px"
            data-hook="ImageUiTpaWrapperDataHook.Media_0"
          >
            <image
              class="d7xFyJ syZQ404"
              data-image-info='{"displayMode":"fit","isLQIP":true,"isSEOBot":false,"lqipTransition":null,"imageData":{"width":1500,"height":1500,"uri":"59d5d1_21f010ca178b49bb81760bd2bf703c3a~mv2.png","name":"59d5d1_21f010ca178b49bb81760bd2bf703c3a~mv2.png","displayMode":"fit"}}'
              data-bg-effect-name=""
              data-has-ssr-src=""
              data-src="${item.images?.[0]}"
              ><img
                src="${item.images?.[0]}"
                alt="${item.name}"
                style="
                  width: 368px;
                  height: 368px;
                  object-fit: contain;
                  object-position: center center;
                "
                fetchpriority="high"
            /></image>
          </div>
        </div></div
    ></a>
    <div data-hook="not-image-container" class="CZ0KIs">
      <div class="A4k3VP">
        <a
          href="https://www.gemvapestore.com/product-page/queen-passion-fruit"
          class="JPDEZd"
          data-hook="product-item-product-details-link"
          ><div style="display: var(--showProductDetails-display, inherit)">
            <div class="t2u_rw" data-hook="product-item-product-details">
              <div
                style="
                  display: var(--gallery_showProductName-display, inherit);
                "
              >
                <p
                  class="s__3MGQzq on_VT2s---typography-11-runningText on_VT2s---priority-7-primary syHtuvM FzO_a9"
                  aria-hidden="false"
                  data-hook="product-item-name"
                >
                  ${item.fullName}
                </p>
              </div>
              <div
                class="ntj2AV"
                style="display: var(--gallery_showPrice-display, inherit)"
              >
                <div class="UqnnNN">
                  <span
                    class="iI5avH"
                    data-hook="sr-product-item-price-to-pay"
                    >Giá</span
                  ><span
                    data-hook="product-item-price-to-pay"
                    class="cfpn1d"
                    data-wix-price="₫ 320.000"
                    >₫ ${formatPrice(item.basePrice)}</span
                  >
                </div>
              </div>
              <div
                style="
                  display: var(--gallery_showDiscountName-display, inherit);
                "
              ></div>
            </div></div
        ></a>
        <div class="PgHPAM">
          <div
            id="comp-lkqsgjst.product-gallery-details-slot-1"
            data-hook="slot-placeholder-comp-lkqsgjst.product-gallery-details-slot-1"
            class=""
          ></div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
  </li>`;
};

const running = async () => {
  authData = await localStorage.getItem("auth");
  if (authData) {
    authData = await getToken();
  } else {
    authData = JSON.parse(authData);
  }

  const products = await apiGetProducts();
  const newProducts = await apiGetProducts({
    orderBy: "createdDate",
    orderDirection: "desc",
  });
  console.log(products, "products");
  if (products) {
    document.getElementById("id-product-list-wrapper").innerHTML = products.data
      .map((item) => renderProductItem(item))
      .join("");
  }
  if (newProducts) {
    document.getElementById("id-product-list-new").innerHTML = newProducts.data
      .map((item) => renderProductItem(item))
      .join("");
  }

  console.log(authData, "authData");
};

running();
