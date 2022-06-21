const uriFlowers = 'https://localhost:7225/api/Flowers'
const uriOrders = 'https://localhost:7225/api/OrderLists'
const uriCategory = 'https://localhost:7225/api/Categories'

let editFlowerId = ''
let deleteFlowerId = ''
let flowers = []
let categories = []
let editorderListId = ''
let deleteorderListId = ''
let orders = []
let statuses = []


function getCategory() {
  fetch(uriCategory)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategory(data))
    .catch((error) => console.error('Unable to get category.', error))
  console.log(categories)
}
function _displayItemsforCategory(data) {
  categories = data
}



function getflowerItems() {
  fetch(uriFlowers)
    .then((response) => response.json())
    .then((data) => _displayItems(data))
    .catch((error) => console.error('Unable to get flowers.', error))
}

function getStatus(statusNo) {
  var uriStatus = 'https://localhost:7225/api/Status'  
  fetch(`${uriStatus}`)
    .then((response) => response.json())
    .then((data) => _displayStatus(data))
    .catch((error) => console.error('Unable to get status.', error))
    console.log("get status")
}

function getorderItems() {
  console.log("order")
  fetch(uriOrders)
    .then((response) => response.json())
    .then((data) => _displayOrdersItems(data))
    .catch((error) => console.error('Unable to get orders.', error))
}

function addflowerItem() {
  const flowerNameInputText = document.getElementById('add-name')
  const flowerPriceInputText = document.getElementById('add-price')
  const flowerImageInputText = document.getElementById('add-image')
  const flowerStockInputText = document.getElementById('add-stock')
  const flowerCategoryInputText = document.getElementById('add-category')
  const flowerDeliveryTimeInputText = document.getElementById('add-delivery')
  const flowerDescriptionInputText = document.getElementById('add-description')
  const item = {
    flowerName: flowerNameInputText.value.trim(),
    price: parseInt(flowerPriceInputText.value.trim()),
    image: flowerImageInputText.value.trim(),
    stock: parseInt(flowerStockInputText.value.trim()),
    categoryNo: parseInt(flowerCategoryInputText.value.trim()),
    deliveryTime: flowerDeliveryTimeInputText.value.trim(),
    flowerDescription: flowerDescriptionInputText.value.trim(),
  }
  fetch(uriFlowers, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then(() => {
      getflowerItems()
      flowerNameInputText.value = ''
      flowerPriceInputText.value = ''
      flowerImageInputText.value = ''
      flowerStockInputText.value = ''
      flowerCategoryInputText.value = ''
      flowerDeliveryTimeInputText.value = ''
      flowerDescriptionInputText.value = ''
    })
    .catch((error) => console.error('Unable to add flower.', error))
}

function deleteflowerItem() {
  //const element = document.getElementById('delete-flower');
  // let itemId = document.getElementById('delete-flower').getAttribute('delete-flower-id');
  let itemId = deleteFlowerId
  fetch(`${uriFlowers}/${itemId}`, {
    method: 'DELETE',
  })
    .then(() => getflowerItems())
    .catch((error) => console.error('Unable to delete flower.', error))
}

function deleteOrderItem() {
  //const element = document.getElementById('delete-flower');
  // let itemId = document.getElementById('delete-flower').getAttribute('delete-flower-id');
  let itemId = deleteorderListId
  fetch(`${uriFlowers}/${itemId}`, {
    method: 'DELETE',
  })
    .then(() => getorderItems())
    .catch((error) => console.error('Unable to delete order.', error))
}

function _displayStatus(data) {
  statuses = data
  console.log(data);
  console.log("status")
  var status = `${data[0].statusName}`;
  console.log(status);
  return data;
}

function displayDeleteForm(id) {
  deleteFlowerId = id
  const item = flowers.find((item) => item.flowerId === id)
  document
    .getElementById('delete-flower')
    .getAttribute('delete-flower-id') = item.flowerId
}

function displayOrderDeleteForm(id) {
  deleteorderListId = id
  const item = orders.find((item) => item.orderListId === id)
  document
    .getElementById('delete-order')
    .getAttribute('delete-order-id') = item.orderListId
}

function displayEditForm(id) {
  const item = flowers.find((item) => item.flowerId === id)
  editFlowerId = id

}

function displayOrderEditForm(id) {
  const item = orders.find((item) => item.orderListId === id)
  editorderListId = id
  console.log(item.orderListId)
  console.log("edirorderListId" + editorderListId)
  document.getElementById('edit-status').value = item.statusNo

}

function updateflowerItem() {
  //let itemId = "e2ebe33f-3877-499e-adea-005da351c160"
  //let itemId = document.getElementById('edit-flower').getAttribute('edit-flower-id');
  let itemId = editFlowerId
  const item = {
    flowerId: itemId,
    flowerName: document.getElementById('edit-name').value.trim(),
    price: parseInt(document.getElementById('edit-price').value.trim()),
    image: document.getElementById('edit-image').value.trim(),
    stock: parseInt(document.getElementById('edit-stock').value.trim()),
    categoryNo: parseInt(document.getElementById('edit-category').value.trim()),
    deliveryTime: document.getElementById('edit-delivery').value.trim(),
    flowerDescription: document.getElementById('edit-description').value.trim(),
  }

  
  
  fetch(`${uriFlowers}/${itemId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(() => getflowerItems())
    .catch((error) => console.error('Unable to update item.', error))

  return false
}


function updateorderItem() {
  let itemId = editorderListId
  var select = document.getElementById('edit-status');
  var statusValue = select.options[select.selectedIndex].text;
  var statusIndex = select.selectedIndex + 1;
  const order = orders.find((order) => order.orderListId === itemId)
  console.log(orders)
  console.log(order)

  const item = {
    orderListId: itemId,
    statusNo: statusIndex,
    orderNumber: order.orderNumber,
    userId: order.userId,
    orderDate: order.orderDate,
    orderTotalPrice: order.orderTotalPrice
  }

  console.log(JSON.stringify(item))

  fetch(`${uriOrders}/${itemId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(() => getorderItems())
    .catch((error) => console.error('Unable to update item.', error))

  return false
}




function _displayCount(itemCount) {
  const name = itemCount === 1 ? 'entry' : 'entries'
  document.getElementById(
    'counter',
  ).innerHTML = `Showing <b>${itemCount}</b> ${name}`
}

function _displayItems(data) {
  console.log(data)
  getCategory();
  const tBody = document.getElementById('flowers')
  tBody.innerHTML = ''
  _displayCount(data.length)
  const button = document.createElement('button')

  data.forEach((item) => {
    let editButton = document.createElement('a')
    editButton.href = '#editflowerModal'
    editButton.className = 'edit'
    editButton.id = 'edit-flower'
    editButton.setAttribute('onclick', `displayEditForm(${item.flowerId})`)
    editButton.addEventListener(
      'click',
      function () {
        displayEditForm(item.flowerId)
      },
      false,
    )

    editButton.setAttribute('data-toggle', 'modal')
    editButton.setAttribute('edit-flower-id', `${item.flowerId}`)

    editButton.innerHTML =
      "<i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i>"

    let deleteButton = document.createElement('a')
    deleteButton.href = '#deleteflowerModal'
    deleteButton.className = 'delete'
    deleteButton.id = 'delete-flower'
    deleteButton.setAttribute('onclick', `displayDeleteForm(${item.flowerId})`)
    deleteButton.addEventListener(
      'click',
      function () {
        displayDeleteForm(item.flowerId)
      },
      false,
    )

    deleteButton.setAttribute('data-toggle', 'modal')
    deleteButton.setAttribute('delete-flower-id', `${item.flowerId}`)

    deleteButton.innerHTML =
      "<i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i>"

    let tr = tBody.insertRow()

    let td1 = tr.insertCell(0)
    let textFlowerName = document.createTextNode(item.flowerName)
    td1.appendChild(textFlowerName)

    let td2 = tr.insertCell(1)
    let textFlowerPrice = document.createTextNode(item.price)
    td2.appendChild(textFlowerPrice)

    let td3 = tr.insertCell(2)
    let textFlowerImage = document.createTextNode(item.image)
    td3.appendChild(textFlowerImage)

    let td4 = tr.insertCell(3)
    let textFlowerStock = document.createTextNode(item.stock)
    td4.appendChild(textFlowerStock)

    let td5 = tr.insertCell(4)
    let categoryName = 'default'
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].catergoryNo == item.categoryNo) {
        categoryName = categories[i].categoryName
      }
    }
    let textFlowerCategory = document.createTextNode(categoryName)
    td5.appendChild(textFlowerCategory)

    let td6 = tr.insertCell(5)
    let textFlowerDeliveryTime = document.createTextNode(item.deliveryTime)
    td6.appendChild(textFlowerDeliveryTime)

    let td7 = tr.insertCell(6)
    let textFlowerDescription = document.createTextNode(item.flowerDescription)
    td7.appendChild(textFlowerDescription)

    let td8 = tr.insertCell(7)
    td8.appendChild(editButton)
    td8.appendChild(deleteButton)
  })

  flowers = data
}


function _displayOrdersItems(data) {
  console.log(data)
  getCategory();
  getStatus();
  const tBody = document.getElementById('orders')
  tBody.innerHTML = ''
  _displayCount(data.length)
  const button = document.createElement('button')

  data.forEach((item) => {
    let editButton = document.createElement('a')
    editButton.href = '#editorderModal'
    editButton.className = 'edit'
    editButton.id = 'edit-order'
    editButton.setAttribute('onclick', `displayEditForm(${item.orderListId})`)
    editButton.addEventListener(
      'click',
      function () {
        displayOrderEditForm(item.orderListId)
      },
      false,
    )

    editButton.setAttribute('data-toggle', 'modal')
    editButton.setAttribute('edit-order-id', `${item.orderListId}`)

    editButton.innerHTML =
      "<i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i>"

    let deleteButton = document.createElement('a')
    deleteButton.href = '#deleteorderModal'
    deleteButton.className = 'delete'
    deleteButton.id = 'delete-order'
    deleteButton.setAttribute('onclick', `displayDeleteForm(${item.orderListId})`)
    deleteButton.addEventListener(
      'click',
      function () {
        displayDeleteForm(item.orderListId)
      },
      false,
    )

    deleteButton.setAttribute('data-toggle', 'modal')
    deleteButton.setAttribute('delete-order-id', `${item.orderListId}`)

    deleteButton.innerHTML =
      "<i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i>"

    let tr = tBody.insertRow()

    let td1 = tr.insertCell(0)
    let textOrderNumber = document.createTextNode(item.orderNumber)
    td1.appendChild(textOrderNumber)

    let td2 = tr.insertCell(1)
    let textUserID = document.createTextNode(item.userId)
    td2.appendChild(textUserID)

    let td3 = tr.insertCell(2)
    let textOrderDate = document.createTextNode(item.orderDate)
    td3.appendChild(textOrderDate)


    
    let td4 = tr.insertCell(3)
   
    let statusName = 'default'

    console.log("tablo yeri" + statuses[0])

    for (let i = 0; i < statuses.length; i++) {

      if (statuses[i].statusNo == item.statusNo) {

        statusName = statuses[i].statusName

      }

    }

    let textOrderStatus = document.createTextNode(statusName)
    td4.appendChild(textOrderStatus)
    


    let td5 = tr.insertCell(4)
    let textOrderTotalPrice = document.createTextNode(item.orderTotalPrice)
    td5.appendChild(textOrderTotalPrice)

    let td6 = tr.insertCell(5)
    td6.appendChild(editButton)
    td6.appendChild(deleteButton)
  })

  orders = data
}
