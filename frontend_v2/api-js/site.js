
const uriCategory = 'https://localhost:7225/api/Categories'

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


function getCategory() {
  fetch(uriCategory)
    .then((response) => response.json())
    .then((data) => _displayItemsforCategory(data))
    .catch((error) => console.error('Unable to get books.', error))
  console.log(categories)
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