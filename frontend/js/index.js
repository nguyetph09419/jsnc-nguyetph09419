window.onload = () => {
  const $ = document.querySelector.bind(document);

  const categoryAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/categories';
  const productAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/products';
  var getCategories = () => {
    fetch(categoryAPI)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        const result = data.map((cate) => {
          return `
                  <div class="my-3 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                    <article class="overflow-hidden  shadow-lg">
                      <a href="cate-detail.html?id=${cate.id}">
                        <img alt="Placeholder" class="block h-auto w-full" src="${cate.image}">
                      </a>
                    </article>
                  </div>
                `
        }).join("");
        $('#category').innerHTML = result;
      });
  }
  getCategories();
  function getNewProduct() {
    fetch(productAPI)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        data.sort(function (a, b) {
          return new Date(a.add_date).getTime() - new Date(b.add_date).getTime();
        });
        return data;
      })
      .then(data=>{
        const result = data.map((product) => {
          for (let i = 0; i < 5; i++) {
            return `
                    <a href="product-detail.html?id=${product.id}" class="hover:no-underline">
                      <div class=" text-left">
                        <img src="${product.image}" alt="" class="w-80 h-80 " >
                        <p class="py-3 m-0 text-black text-center font-medium uppercase text-sm hover:text-black text-black ">${product.name}</p>
                        <p class="font-medium text-center hover:text-black text-black ">${product.price}<span>₫</span></p>
                      </div>
                    </a>
              `
          }}).join("");
          $('#new-product').innerHTML = result;
      });
  }
  getNewProduct();

  function highSell() {
    fetch(productAPI)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        data.sort(function (a, b) {
          return a.high_sell - b.high_sell;
        });
        return (data) ;
      })
      .then(data=>{
        const result = data.map((product) => {
          for (let i = 0; i < 5; i++) {
            return `
                  <a href="product-detail.html?id=${product.id}" class="hover:no-underline">
                    <div class=" text-left">
                      <img src="${product.image}" alt="" class="w-80 h-80 " >
                      <p class="py-3 m-0 text-black text-center font-medium uppercase text-sm hover:text-black text-black ">${product.name}</p>
                      <p class="font-medium text-center hover:text-black text-black ">${product.price}<span>₫</span></p>
                    </div>
                  </a>
                  `
          }}).join("");
          $('#high-sell-product').innerHTML = result;
      });
  }
  highSell();
}