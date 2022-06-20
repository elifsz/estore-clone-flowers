const uriCategory = "https://localhost:7225/api/Categories";
const uriflowersByCategoryNo =
  "https://localhost:7225/api/Flowers/filter?categoryNo=2";
const uriflowersByCategoryNoWedding =
  "https://localhost:7225/api/Flowers/filter?categoryNo=1";
/*const uriFlower =
  "https://localhost:7225/api/Flowers/8d179247-897f-45d6-95e3-1786f74462b3";*/
const uriFlower = "https://localhost:7225/api/Flowers/d16f59ab-9ae2-4ff7-a7a5-01834ca6ea5d";
const uriFlowers = "https://localhost:7225/api/Flowers";
const orderurl = "https://localhost:7225/api/OrderDetails";
let categories = [];
let flowersByCategoryNo = [];
let flowersByCategoryNoWedding = [];
let flowers = [];

function getFlower() {
  fetch(uriFlower)
    .then((response) => response.json())
    .then((data) => _displayFlower(data))
    .catch((error) => console.error("Unable to get books.", error));
}

function getflowerItems() {

  fetch(uriFlowers)
    .then((response) => response.json())
    .then((data) => _setFlowerItems(data))
    .catch((error) => console.error('Unable to get flowers.', error))

}

function _setFlowerItems(data) {
  flowers = data;
  console.log(flowers+"benü");
}

function getflowersByCategoryNo() {
  fetch(uriflowersByCategoryNo)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategoryDetail(data))
    .catch((error) => console.error("Unable to get books.", error));
  console.log(flowersByCategoryNo);
}

function getflowersByCategoryNoWedding() {
  fetch(uriflowersByCategoryNoWedding)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategoryDetail(data))
    .catch((error) => console.error("Unable to get books.", error));
  console.log(flowersByCategoryNoWedding);
}

function getCategory() {
  fetch(uriCategory)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategory(data))
    .catch((error) => console.error("Unable to get books.", error));
  console.log(categories);
}

function _displayFlower(data) {
  let flowerInfo = data;
  let flowerHtml = `
  <div class="col-lg-25 col-sm-5">
  <div class="box_main" >

      <div class="electronic_img">
      <img src="../images/gul.jpg" />
      </div>
      <div class="btn_main">
      </div>
</div>
</div>
</br> 
<div class="col-lg-35 col-sm-5">
<h4 class="shirt_text"> </br>  </br>  ${flowerInfo.flowerName}</h4> </br> </br>
<p class="price_text">
${flowerInfo.flowerDescription} <br/> <br/>
Price: ${flowerInfo.price} $ <br/> <br/>
Delivery Time:  ${flowerInfo.deliveryTime}  <br/> <br/></p>
<div><button class="buy_bt" id="buynow">Buy Now<button/></div>
</div>
</div> `;

  document
    .querySelector("#flower")
    .insertAdjacentHTML("afterbegin", flowerHtml);
    document.getElementById("buynow").setAttribute('onclick',`addCart("${flowerInfo.flowerId}")`);
    console.log(flowerInfo.flowerId);
}
let  cart_url_flower;
function addCart(id) {
  cart_url_flower = uriFlowers + "/" + id;
  fetch(cart_url_flower)
    .then((response) => response.json())
    .then((data) => addingCart(data))
    .catch((error) => console.error('Unable to get flowers.', error))
}

function addingCart(data){
  console.log(data);
  const item = {
    FlowerId: data.flowerId,
    FlowerPrice: data.price,
    FlowerQuantity: 1,
    TotalPrice: data.price,
    OrderListId: "e6437e80-a264-463b-aee7-a36a0eec9e0a",
  }
  fetch(orderurl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then(() => {
      getOrderDetails()
    })
    .catch((error) => console.error('Unable to add flower.', error))
}

function getOrderDetails(){
  fetch("https://localhost:7225/api/OrderDetails")
    .then((response) => response.json())
    .then((data) => _displayOrderDetails(data))
    .catch((error) => console.error("Unable to get books.", error));
}

function _displayOrderDetails(data) {
  let orderDetails = data;
  console.log(orderDetails);
  const tBody = document.getElementById('card_details');
  tBody.innerHTML = ''
  data.forEach((item) => {
  let tr = tBody.insertRow()
  let td1 = tr.insertCell()
  let flower = document.createTextNode(item.flowerId)
  td1.appendChild(flower)

  let td2 = tr.insertCell()
  let flower2 = document.createTextNode(item.flowerPrice)
  td2.appendChild(flower2)

  let td3 = tr.insertCell()
  let flower3 = document.createTextNode(item.flowerQuantity)
  td3.appendChild(flower3)

  let td4 = tr.insertCell()
  let flower4 = document.createTextNode(item.totalPrice)
  td4.appendChild(flower4)
  })
}

function _displayItemsforCategory(data) {
  categories = data;
  let categoryHtml = "";
  for (let i = 0; i < categories.length; i++) {
    categoryHtml += `
                <div class="col-lg-4 col-sm-4">
                <div class="box_main" >
                    <h4 class="shirt_text">${categories[i].categoryName}</h4>
                    <p class="price_text">
                    ${categories[i].categoryDescription}
                    </p>
                    <div class="electronic_img">
                    <img src="images/flower.jpg" />
                    </div>
                    <div class="btn_main">
                    <div class="buy_bt"><a href="#">Buy Now</a></div>
                    <div class="seemore_bt"><a href="categories/${categories[i].categoryName}_category.html">See More</a></div>
                    </div>
            </div>
            </div>
            </div>
            `;
  }
  document
    .querySelector("#category_list")
    .insertAdjacentHTML("afterbegin", categoryHtml);
}

function _displayItemsforCategoryDetail(data) {
  flowersByCategoryNo = data;
  let categoryHtml = "";
  for (let i = 0; i < flowersByCategoryNo.length; i++) {
    categoryHtml += `
                <div class="col-lg-4 col-sm-4">
                <div class="box_main" >
                    <h4 class="shirt_text">${flowersByCategoryNo[i].flowerName}</h4>
                    <p class="price_text">
                    ${flowersByCategoryNo[i].price} $ <br/>
                    ${flowersByCategoryNo[i].flowerDescription}
                    </p>
                    <div class="electronic_img">
                    <img src="../images/papatya.jpg" />
                    </div>
                    <div class="btn_main">
                    <div class="buy_bt"><a href="#">Buy Now</a></div>
                    <div class="seemore_bt"><a href="http://localhost:3000/flowers/rose">See More</a></div>
                    </div>
            </div>
            </div>
            </div>
            `;
  }
  document
    .querySelector("#categoryDetail")
    .insertAdjacentHTML("afterbegin", categoryHtml);
}

function _displayItemsforCategoryDetailWedding(data) {
  flowersByCategoryNoWedding = data;
  let categoryHtml = "";
  for (let i = 0; i < flowersByCategoryNoWedding.length; i++) {
    categoryHtml += `
                <div class="col-lg-4 col-sm-4">
                <div class="box_main" >
                    <h4 class="shirt_text">${flowersByCategoryNoWedding[i].flowerName}</h4>
                    <p class="price_text">
                    ${flowersByCategoryNoWedding[i].price} $ <br/>
                    ${flowersByCategoryNoWedding[i].flowerDescription}
                    </p>
                    <div class="electronic_img">
                    <img src="../images/gul.jpg" />
                    </div>
                    <div class="btn_main">
                    <div class="buy_bt"><a href="#">Buy Now</a></div>
                    <div class="seemore_bt"><a href="http://localhost:3000/flowers/rose">See More</a></div>
                    </div>
            </div>
            </div>
            </div>
            `;
  }
  document
    .querySelector("#categoryDetail")
    .insertAdjacentHTML("afterbegin", categoryHtml);
}

function getFlowerFromCategory(categoryName) {
  console.log("flew" + books);
  for (let i = 0; i < books.length; i++) {
    if (getCategoryNameFromCategoryNo(books[i].catergoryNo) === categoryName) {
      console.log("bura" + books[i].flowerName);
    }
  }
}

function getSearchFlower(searchInput) {
  var uriSearch = "https://localhost:7225/api/Flowers/search?flowerNameSearch";
  fetch(`${uriSearch}=${searchInput}`)
    .then((response) => response.json())
    .then((data) => _display(data))
    .catch((error) => console.error("Unable to get flowers.", error));
}

function searchFlower() {
  console.log("fffff");
  var searchInput = $("#searchId").val();
  getSearchFlower(searchInput);
}

function _display(data) {
  console.log(data);
  var flowerUrl = `${data[0].flowerName}`;
  flowerUrl = flowerUrl.toLowerCase();
  var url = `http://localhost:3000/flowers/${flowerUrl}`;
  window.location.assign(url);
}
