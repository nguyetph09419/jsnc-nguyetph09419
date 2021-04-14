window.onload = () => {
  const $ = document.querySelector.bind(document);

  const categoryAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/categories';
  const productAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/products';

  const url = new URL(document.URL);
  const id = url.searchParams.get('id');
  var getCategories = () => {
    fetch(`${productAPI}`)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        const result = data.map((pro) => {
            return `
            <div class="my-3 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <article class="overflow-hidden  shadow-lg">
                <a href="product-detail.html?id=${pro.id}" class="hover:text-black hover:no-underline">
                  <img alt="Placeholder" class="block h-auto w-full" src="${pro.image}">
                  <p class="py-3 m-0 text-black text-center font-medium uppercase text-sm hover:text-black text-black ">${pro.name}</p>
                        <p class="font-medium text-center hover:text-black text-black ">${pro.price}<span>₫</span></p>
                      
                </a>
              </article>
            </div>
          `
        }).join("");
        $('#product').innerHTML = result;
        console.log(data);
      });
  }
  $('#keyword').onkeyup = function () {
    let keyword = $('#keyword').value;
    var expression = new RegExp(keyword, "i");
    fetch(`${productAPI}`)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        const result = data.map((pro) => {
          if (pro.name.search(expression) != -1) {
            return `
            <div class="my-3 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <article class="overflow-hidden  shadow-lg">
                <a href="product-detail.html?id=${pro.id}" class="hover:text-black hover:no-underline">
                  <img alt="Placeholder" class="block h-auto w-80 h-80" src="${pro.image}">
                  <p class="py-3 m-0 text-black text-center font-medium uppercase text-sm hover:text-black text-black ">${pro.name}</p>
                        <p class="font-medium text-center hover:text-black text-black ">${pro.price}<span>₫</span></p>
                      
                </a>
              </article>
            </div>
          `
          }
        }).join("");
        $('#product').innerHTML = result;
      })
  }

  getCategories();
  $('#a-z').onclick = function () {
    fetch(productAPI)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        data.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); 
          var nameB = b.name.toUpperCase(); 
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        
          
          return 0;
        });
        console.log(data);
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
          $('#product').innerHTML = result;
      });
  }
  $('#forPrice').onclick = function () {
    fetch(productAPI)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        data.sort(function (a, b) {
          return a.price-b.price;
        });
        console.log(data);
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
          $('#product').innerHTML = result;
      });
  }

}