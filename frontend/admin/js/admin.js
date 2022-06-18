const uriFlowers = 'https://localhost:7225/api/Flowers'
const uriCategory = 'https://localhost:7225/api/Categories'
let editFlowerId = ''
let deleteFlowerId = ''
let flowers = []
let categories = []


function getCategory() {
  fetch(uriCategory)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategory(data))
    .catch((error) => console.error('Unable to get books.', error))
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

function displayDeleteForm(id) {
  deleteFlowerId = id
  const item = flowers.find((item) => item.flowerId === id)
  document
    .getElementById('delete-flower')
    .getAttribute('delete-flower-id') = item.flowerId
}

function displayEditForm(id) {
  const item = flowers.find((item) => item.flowerId === id)
  editFlowerId = id

  document.getElementById('edit-name').value = item.flowerName
  document.getElementById('edit-price').value = item.price
  document.getElementById('edit-image').value = item.image
  document.getElementById('edit-stock').value = item.stock
  document.getElementById('edit-category').value = item.categoryNo
  document.getElementById('edit-delivery').value = item.deliveryTime
  document.getElementById('edit-description').value = item.flowerDescription
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
