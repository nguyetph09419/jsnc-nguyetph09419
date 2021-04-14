window.onload = () => {
  const $ = document.querySelector.bind(document);

  const categoryAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/categories';
  const productAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/products';

  const url = new URL(document.URL);
  const id = url.searchParams.get('id');
  var getCategories = () => {
    fetch(`${categoryAPI}/${id}`)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        $('#name-category').innerHTML = data.name;
      });
    fetch(`${productAPI}`)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        const result = data.map((pro) => {
          if (pro.category_id == id) {
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
          }

        }).join("");
        $('#categorydetail').innerHTML = result;
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
                  <img alt="Placeholder" class="block h-auto w-full" src="${pro.image}">
                  <p class="py-3 m-0 text-black text-center font-medium uppercase text-sm hover:text-black text-black ">${pro.name}</p>
                        <p class="font-medium text-center hover:text-black text-black ">${pro.price}<span>₫</span></p>
                      
                </a>
              </article>
            </div>
          `
          }
        }).join("");
        $('#categorydetail').innerHTML = result;
      })
  }

  getCategories();

}