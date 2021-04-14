window.onload = () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const btn_product_size = $$('.product-size');
  const categoryAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/categories';
  const productAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/products';
  var product_size = "";
  const url = new URL(document.URL);
  const id = url.searchParams.get('id');
  var proArr = [];
  if (typeof (Storage) !== "undefined") {
    proArr = JSON.parse(localStorage.getItem('cart-list'));
  }
  let check = false;
  function toJSON(object) {
    var json = JSON.stringify(object);
    return json;
  }
  var getProduct = () => {
    fetch(`${productAPI}/${id}`)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        $('#title').innerHTML = data.name;
        $('#old-price').innerHTML = data.price;
        $('#desc').innerHTML = data.desc;
        $('#sale').innerHTML = data.sale + "%";
        $('#img').src = data.image;
        $('#price').innerHTML = (data.price * (1 - data.sale / 100)).toFixed(2);
        for (let i = 0; i < btn_product_size.length; i++) {
          btn_product_size[i].addEventListener('click', () => {
            product_size = btn_product_size[i].value;

          })

        }
        $('#btn_add_to_cart').onclick = function () {

          const product = {
            id: data.id,
            image:data.image,
            name: data.name,
            old_price: data.price,
            price: (data.price * (1 - data.sale / 100)),
            qty: $('#qty-input-number').value,
            size: product_size,
          }
          proArr.map(pro => {
            if (product.id == pro.id) {
              // pro.qty = parseInt(pro.qty) + 1;
              pro.qty = $('#qty-input-number').value,
                check = true;
            }
          })
          if (!check) {
            proArr.push(product);
          }
          console.log(proArr)
          localStorage.setItem(`cart-list`, toJSON(proArr))
          window.location.href = 'cart.html';
        }
      });

  }

  if (id) {
    getProduct();
  }
  else {
    $('#product-detail-content').innerHTML = 'Không tìm thấy sản phẩm';
  }


}