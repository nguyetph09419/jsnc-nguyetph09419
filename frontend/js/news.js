window.onload = () => {
  const $ = document.querySelector.bind(document);

  const newsAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/news';
  const productAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/products';

  const url = new URL(document.URL);
  const id = url.searchParams.get('id');
  var getCategories = () => {
    fetch(`${newsAPI}`)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        const result = data.map((post) => {
            return `
                    <div class="bg-white overflow-hidden border-b-4 border-blue-500 my-3" style="width:350px">
                      <a href="news-detail.html?id=${post.id}"><img src="${post.image}" alt="People" class="w-full object-cover h-32 sm:h-48 md:h-64"></a>
                      
                      <div class="p-4 md:p-6">
                        <p class="text-blue-500 font-semibold text-xs mb-1 leading-none">Tin mới</p>
                        <a href="news-detail.html?id=${post.id}" class="hover:no-underline text-black hover:text-black"><h3 class="font-semibold mb-2 text-xl leading-tight sm:leading-normal">${post.name}</h3></a>
                        <div class="text-sm flex items-center">
                          <svg class="opacity-75 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            version="1.1" id="Capa_1" x="0px" y="0px" width="12" height="12" viewBox="0 0 97.16 97.16"
                            style="enable-background:new 0 0 97.16 97.16;" xml:space="preserve">
                            <path
                              d="M48.58,0C21.793,0,0,21.793,0,48.58s21.793,48.58,48.58,48.58s48.58-21.793,48.58-48.58S75.367,0,48.58,0z M48.58,86.823    c-21.087,0-38.244-17.155-38.244-38.243S27.493,10.337,48.58,10.337S86.824,27.492,86.824,48.58S69.667,86.823,48.58,86.823z" />
                            <path
                              d="M73.898,47.08H52.066V20.83c0-2.209-1.791-4-4-4c-2.209,0-4,1.791-4,4v30.25c0,2.209,1.791,4,4,4h25.832    c2.209,0,4-1.791,4-4S76.107,47.08,73.898,47.08z" />
                          </svg>
                          <p class="leading-none">${post.date_add}</p>
                        </div>
                      </div>
                    </div>
                    `
        }).join("");
        $('#product').innerHTML = result;
        console.log(data);
      });
  }
  // $('#keyword').onkeyup = function () {
  //   let keyword = $('#keyword').value;
  //   var expression = new RegExp(keyword, "i");
  //   fetch(`${productAPI}`)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then(data => {
  //       const result = data.map((pro) => {
  //         if (pro.name.search(expression) != -1) {
  //           return `
  //           <div class="my-3 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
  //             <article class="overflow-hidden  shadow-lg">
  //               <a href="product-detail.html?id=${pro.id}" class="hover:text-black hover:no-underline">
  //                 <img alt="Placeholder" class="block h-auto w-80 h-80" src="${pro.image}">
  //                 <p class="py-3 m-0 text-black text-center font-medium uppercase text-sm hover:text-black text-black ">${pro.name}</p>
  //                       <p class="font-medium text-center hover:text-black text-black ">${pro.price}<span>₫</span></p>
                      
  //               </a>
  //             </article>
  //           </div>
  //         `
  //         }
  //       }).join("");
  //       $('#product').innerHTML = result;
  //     })
  // }

  getCategories();

}