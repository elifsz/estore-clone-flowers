
const uriCategory = 'https://localhost:7225/api/Categories'
const uriflowersByCategoryNo = 'https://localhost:7225/api/Flowers/filter?categoryNo=2'
const uriflowersByCategoryNoWedding = 'https://localhost:7225/api/Flowers/filter?categoryNo=1'
const uriFlower = "https://localhost:7225/api/Flowers/8d179247-897f-45d6-95e3-1786f74462b3"
/*let categories = [
  {
    catergoryNo: 1,
    categoryName: 'Wedding',
    categoryImage: null,
    categoryDescription: 'Wedding Flowers',
  },
  {
    catergoryNo: 2,
    categoryName: 'Birthday',
    categoryImage: null,
    categoryDescription: 'Birthday Flowers',
  },
  {
    catergoryNo: 3,
    categoryName: 'Birthday',
    categoryImage: null,
    categoryDescription: 'Birthday Flowers',
  },
]*/
let categories = []
let flowersByCategoryNo = []
let flowersByCategoryNoWedding = []

function getFlower() {
  fetch(uriFlower)
  .then((response) => response.json())
<<<<<<< Updated upstream
  .then((data) => _displayItemsforCategoryDetail(data))
  .catch((error) => console.error('Unable to get flowers.', error))
  console.log(data)
=======
  .then((data) => _displayFlower(data))
  .catch((error) => console.error('Unable to get books.', error))
  
>>>>>>> Stashed changes
}

function getflowersByCategoryNo() {
  fetch(uriflowersByCategoryNo)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategoryDetail(data))
    .catch((error) => console.error('Unable to get items.', error))
  console.log(flowersByCategoryNo)
}

function getflowersByCategoryNoWedding() {
  fetch(uriflowersByCategoryNoWedding)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategoryDetail(data))
    .catch((error) => console.error('Unable to get items.', error))
  console.log(flowersByCategoryNoWedding)
}

function getCategory() {
  fetch(uriCategory)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategory(data))
    .catch((error) => console.error('Unable to get items.', error))
  console.log(categories)
}

function _displayFlower(data) {
  let flowerInfo = data;
  let flowerHtml =  `
  <div class="col-lg-25 col-sm-5">
  <div class="box_main" >
      <div class="electronic_img">
      <img src="../images/gul.jpg" />
      </div>
      <div class="btn_main">
      <div class="buy_bt"><a href="#">Buy Now</a></div>
      </div>
</div>
</div>
   <div class="col-lg-25 col-sm-5">
         
   <h4 class="shirt_text">${flowerInfo.flowerName}</h4>
   <p class="price_text"> <br/>
   ${flowerInfo.flowerDescription} <br/> <br/>
   ${flowerInfo.price} $ <br/> <br/>
 Delivery Time:  ${flowerInfo.deliveryTime} 

   </p>
   </div>
</div>
`

document
.querySelector('#flower')
.insertAdjacentHTML('afterbegin', flowerHtml)
}

function _displayItemsforCategory(data) {
  categories = data
  let categoryHtml =''
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
            `
  }
  document
    .querySelector('#category_list')
    .insertAdjacentHTML('afterbegin', categoryHtml)
}



function _displayItemsforCategoryDetail(data) {
  flowersByCategoryNo = data
  let categoryHtml =''
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
  let categoryHtml =''
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
  console.log("flew"+books)
  for (let i = 0; i < books.length; i++) {
    if (
      getCategoryNameFromCategoryNo(books[i].catergoryNo) === categoryName
    ) {
      console.log('bura' + books[i].flowerName)
    }
  }
}

function getSearchFlower(searchInput){
  var uriSearch = "https://localhost:7225/api/Flowers/search?flowerNameSearch";
  fetch(`${uriSearch}=${searchInput}`)
  .then((response) => response.json())
  .then((data) => _display(data))
  .catch((error) => console.error('Unable to get flowers.', error))
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
