const localhost = 'http://localhost:8080/api/'


const uriOrders = localhost + 'OrderLists'
var uriStatus = localhost + 'Status'

let orders = []
let statuses = []

let editOrderId = ''
let deleteOrderId = ''

function getStatus(statusNo) {
  var uriStatus = localhost+ 'Status'  
  fetch(`${uriStatus}`)
    .then((response) => response.json())
    .then((data) => _displayStatus(data))
    .catch((error) => console.error('Unable to get status.', error))
}

function getorderItems() {
  fetch(uriOrders)
    .then((response) => response.json())
    .then((data) => _displayOrdersItems(data))
    .catch((error) => console.error('Unable to get orders.', error))
}

function _displayStatus(data) {
  statuses = data
  console.log(data);
  console.log("status")
  var status = `${data[0].statusName}`;
  console.log(status);
  return data;
}

function displayOrderDeleteForm(id) {
  deleteorderListId = id
  const item = orders.find((item) => item.orderListId === id)
  document
    .getElementById('delete-order')
    .getAttribute('delete-order-id') = item.orderListId
}

function displayOrderEditForm(id) {
  const item = orders.find((item) => item.orderListId === id)
  editorderListId = id
  console.log(item.orderListId)
  console.log("edirorderListId" + editorderListId)
  document.getElementById('edit-status').value = item.statusNo

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

function _displayOrdersItems(data) {
  console.log(data)
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
