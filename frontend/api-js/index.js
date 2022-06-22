const uriCategory = 'https://localhost:7225/api/Categories'
const uriflowersByCategoryNo =
  'https://localhost:7225/api/Flowers/filter?categoryNo=2'
const uriflowersByCategoryNoWedding =
  'https://localhost:7225/api/Flowers/filter?categoryNo=1'
//const uriFlower ="https://localhost:7225/api/Flowers/8d179247-897f-45d6-95e3-1786f74462b3";
const uriFlower =
  'https://localhost:7225/api/Flowers/d16f59ab-9ae2-4ff7-a7a5-01834ca6ea5d'
const uriFlowers = 'https://localhost:7225/api/Flowers'
const orderurl = 'https://localhost:7225/api/OrderDetails'
const uriLogin = 'https://localhost:7225/api/Users/login?email&password'
const uriOrderDetails = 'https://localhost:7225/api/OrderDetails'
let categories = []
let flowersByCategoryNo = []
let flowersByCategoryNoWedding = []
let flowers = []
let trackOrders = []
let orderDetails = []
let deleteOrderDetailId = ''

function getFlower() {
  fetch(uriFlower)
    .then((response) => response.json())
    .then((data) => _displayFlower(data))
    .catch((error) => console.error('Unable to get flower.', error))
}

function getTrackOrder() {
  var trackOrderNo = $('#trackOrder-no').val()
  var trackOrderEmail = $('#trackOrder-email').val()
  console.log(
    'trackOrderNo' + trackOrderNo + 'trackOrderEmail' + trackOrderEmail,
  )

  var uriTrackOrder = `https://localhost:7225/api/OrderLists/trackorder?email=${trackOrderEmail}&orderno=${trackOrderNo}`
  console.log(uriTrackOrder)
  fetch(uriTrackOrder)
    .then((res) => {
      return res.text()
    })
    .then((text) => {
      console.log(text)
      _displayTrackOrder(text)
    })
}

function getflowerItems() {
  fetch(uriFlowers)
    .then((response) => response.json())
    .then((data) => _setFlowerItems(data))
    .catch((error) => console.error('Unable to get flowers.', error))
}

function _setFlowerItems(data) {
  flowers = data
}

function getflowersByCategoryNo() {
  fetch(uriflowersByCategoryNo)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategoryDetail(data))
    .catch((error) => console.error('Unable to get books.', error))
  console.log(flowersByCategoryNo)
}

function getflowersByCategoryNoWedding() {
  fetch(uriflowersByCategoryNoWedding)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategoryDetail(data))
    .catch((error) => console.error('Unable to get books.', error))
  console.log(flowersByCategoryNoWedding)
}

function getCategory() {
  fetch(uriCategory)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategory(data))
    .catch((error) => console.error('Unable to get books.', error))
  console.log(categories)
}

function _displayTrackOrder(data) {
  const trackOrderInfo = data
  let trackOrderHtml = `
  <div class="modal-dialog">
  <div class="modal-content">
      <p class="text">
      ${trackOrderInfo}
      </p>
  </div>    
</div>
`
  document
    .querySelector('#trackOrderModal')
    .insertAdjacentHTML('afterbegin', trackOrderHtml)

  console.log('display')
}

function _displayFlower(data) {
  let flowerInfo = data
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
      <div><button class="btn btn-success" id="buynow" style="position: absolute; right: 0;">Buy Now<button/></div>
    </div>
      </div>
      </div> `

  document.querySelector('#flower').insertAdjacentHTML('afterbegin', flowerHtml)
  document
    .getElementById('buynow')
    .setAttribute('onclick', `addCart("${flowerInfo.flowerId}")`)
}

let cart_url_flower
function addCart(id) {
  getflowerItems()

  cart_url_flower = uriFlowers + '/' + id
  fetch(cart_url_flower)
    .then((response) => response.json())
    .then((data) => addingCart(data))
    .catch((error) => console.error('Unable to get flowers.', error))

  swal('Added to cart', '', 'success')
}
function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function addingCart(data) {
  console.log('çiçeekk' + flowers[0].flowerName)
  let index =  Math.floor((Math.random() * flowers.length) + 0);
  let randomFlower = flowers[index];
  const item = {
    orderDetailsId: createUUID(),
    FlowerId: randomFlower.flowerId,
    FlowerPrice: randomFlower.price,
    FlowerQuantity: 1,
    TotalPrice: data.price,
    OrderListId: 'e6437e80-a264-463b-aee7-a36a0eec9e0a',
  }

  console.log(JSON.stringify(item))
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

function getOrderDetails() {
  fetch('https://localhost:7225/api/OrderDetails')
    .then((response) => response.json())
    .then((data) => _displayOrderDetails(data))
    .catch((error) => console.error('Unable to get books.', error))
}

function _displayOrderDetails(data) {
  const tBody = document.getElementById('card_details')
  tBody.innerHTML = ''
  data.forEach((item) => {
    let deleteButton = document.createElement('a')
    deleteButton.href = '#deleteCartModal'
    deleteButton.className = 'delete'
    deleteButton.id = 'delete-cart-id'
    deleteButton.setAttribute('onclick', `displayDeleteCartForm(${item.orderDetailsId})`)
    deleteButton.addEventListener(
      'click',
      function () {
        displayDeleteCartForm(item.orderDetailsId)
      },
      false,
    )

    deleteButton.setAttribute('data-toggle', 'modal')
    deleteButton.setAttribute('delete-cart-id', `${item.orderDetailsId}`)

    deleteButton.innerHTML =
      "<i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i>"

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

    let td5 = tr.insertCell()
    td5.appendChild(deleteButton)
  })

  orderDetails = data
}

function deleteCartItem() {
  let itemId = deleteOrderDetailId
  fetch(`${uriOrderDetails}/${itemId}`, {
    method: 'DELETE',
  })
    .then(() => getOrderDetails())
    .catch((error) => console.error('Unable to delete cart.', error))
}

function displayDeleteCartForm(id) {
  deleteOrderDetailId = id
  const item = orderDetails.find((item) => item.orderDetailsId === id)
  document
    .getElementById('delete-flower')
    .getAttribute('delete-cart-id') = item.flowerId
}

function _displayItemsforCategory(data) {
  categories = data
  let categoryHtml = ''
  for (let i = 0; i < categories.length; i++) {
    let catogoryName = categories[i].categoryName.toLowerCase()
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
                    <div class="seemore_bt"><a href="categories/${catogoryName}_category.html">See More</a></div>
                    </div>
            </div>
            </div>
            </div>
            `
  }
  document
    .querySelector('#category_list')
    .insertAdjacentHTML('afterbegin', categoryHtml)
}

function _displayItemsforCategoryDetail(data) {
  flowersByCategoryNo = data
  let categoryHtml = ''
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
            `
  }
  document
    .querySelector('#categoryDetail')
    .insertAdjacentHTML('afterbegin', categoryHtml)
}

function _displayItemsforCategoryDetailWedding(data) {
  flowersByCategoryNoWedding = data
  let categoryHtml = ''
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
            `
  }
  document
    .querySelector('#categoryDetail')
    .insertAdjacentHTML('afterbegin', categoryHtml)
}

function getFlowerFromCategory(categoryName) {
  console.log('flew' + books)
  for (let i = 0; i < books.length; i++) {
    if (getCategoryNameFromCategoryNo(books[i].catergoryNo) === categoryName) {
      console.log('bura' + books[i].flowerName)
    }
  }
}

function getSearchFlower(searchInput) {
  var uriSearch = 'https://localhost:7225/api/Flowers/search?flowerNameSearch'
  fetch(`${uriSearch}=${searchInput}`)
    .then((response) => response.json())
    .then((data) => _display(data))
    .catch((error) => console.error('Unable to get flowers.', error))
}

function searchFlower() {
  console.log('fffff')
  var searchInput = $('#searchId').val()
  getSearchFlower(searchInput)
}

function getLogin(email, password) {
  var uriLogin = `https://localhost:7225/api/Users/login?email=${email}&password=${password}`

  fetch(uriLogin)
    .then((res) => {
      return res.text()
    })
    .then((text) => {
      if (text == 'admin') {
        window.location.href = 'admin/flower_management.html'
      } else if (text == 'user') {
        window.location.href = 'index.html'
      } else {
        alert('Wrong email or password')
      }
    })
}

function login() {
  var email = $('#user_email').val()
  var password = $('#user_password').val()
  getLogin(email, password)
}

function _display(data) {
  console.log(data)
  var flowerUrl = `${data[0].flowerName}`
  flowerUrl = flowerUrl.toLowerCase()
  var url = `http://localhost:3000/flowers/${flowerUrl}`
  window.location.assign(url)
}

function _displayLogin(data) {
  console.log(data)
  var userUrl = `${data[0].email & data[0].password}`
  userUrl = userUrl.toLowerCase()
  var url = `http://localhost:3000/users/${userUrl}`
  window.location.assign(url)
}
