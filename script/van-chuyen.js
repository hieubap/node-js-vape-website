const x = {};
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

function getField() {
  const name = $("billing_address_full_name").value;
  const phone = $("billing_address_phone").value;
  const address = $("billing_address_address1").value;

  return {
    name,
    phone,
    address,
  };
}

let authData;

async function running() {
  console.log(getField(), "getField");
  authData = await localStorage.getItem("auth");
  if (!authData) {
    authData = await getToken();
  } else {
    authData = JSON.parse(authData);
  }

  let currentProducts = await localStorage.getItem("currentProducts");
  currentProducts = currentProducts ? JSON.parse(currentProducts) : [];

  $("tbody-danh-sach-hang").innerHTML = currentProducts
    .map(
      (item) => `
  <tr class="product" data-variant-id="1106426447">
                        <td class="product-image">
                          <div class="product-thumbnail">
                            <div class="product-thumbnail-wrapper">
                              <img class="product-thumbnail-image" alt="Mob Liquid PMS Peach Mango Strawberry Salt Nic (30ml)(Đào Xoài Dâu)" src="//product.hstatic.net/200000019872/product/mob_liquid_pms_peach_mango_strawberry_salt_nic_6e4726c391c045d09744f0e4659caf9e_small.png">
                            </div>
                            <span class="product-thumbnail-quantity" aria-hidden="true">${
                              item.soLuong
                            }</span>
                          </div>
                        </td>
                        <td class="product-description">
                          <span class="product-description-name order-summary-emphasis">
                          ${item.dataDetail.categoryName} ${
        item.dataDetail.fullName
      }
                          </span>
                        </td>
                        <td class="product-quantity visually-hidden">2</td>
                        <td class="product-price">
                          <span class="order-summary-emphasis">${formatPrice(
                            item.dataDetail.basePrice
                          )}</span>
                        </td>
                      </tr>
  `
    )
    .join("");

  $("span-tong-tien").innerHTML = formatPrice(
    currentProducts.reduce((a, b) => a + b.dataDetail.basePrice * b.soLuong, 0)
  );
}

running();

$("btn-dat-hang").onclick = async () => {
  const inputData = getField();
  let currentProducts = await localStorage.getItem("currentProducts");
  currentProducts = currentProducts ? JSON.parse(currentProducts) : [];
  const description = await localStorage.getItem("description");

  fetch("/api/public/orders", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: authData.token_type + " " + authData.access_token,
      Retailer: "hethongvapedonganh",
    },
    body: JSON.stringify({
      branchId: currentProducts[0].dataDetail.inventories[0].branchId,
      // soldById: "95762",
      cashierId: "",
      description,
      // discount: 1000,
      status: 5,
      makeInvoice: false,
      orderDetails: currentProducts.map((item) => ({
        productId: item.dataDetail.id,
        productCode: item.dataDetail.code,
        quantity: item.soLuong,
        price: item.dataDetail.basePrice,
      })),
      // [
      //   {
      //     productId: "",
      //     productCode: "SP000045",
      //     quantity: 1,
      //     price: 2100000,
      //   },
      // ],
      orderDelivery: {
        receiver: inputData.name,
        contactNumber: inputData.phone,
        address: inputData.address,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res, "res?????");
      window.location.href = "/?p=success";
      localStorage.removeItem("currentProducts");
      localStorage.removeItem("description");
      // dataDetail = res;
      // localStorage.setItem("auth", JSON.stringify(res));
      resolve(res);
    })
    .catch(reject);
};
