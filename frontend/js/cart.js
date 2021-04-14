window.onload = () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);


  const categoryAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/categories';
  const productAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/products';


  const url = new URL(document.URL);
  const id = url.searchParams.get('id');

  let check = false;

  var proArr = [];
  if (typeof (Storage) !== "undefined") {
    proArr = JSON.parse(localStorage.getItem('cart-list'));
  }


  function toJSON(object) {
    var json = JSON.stringify(object);
    return json;
  }
  if (typeof (Storage) !== "undefined") {
    const localProductAPI = JSON.parse(localStorage.getItem('cart-list'));
  }

  const localProductAPI = JSON.parse(localStorage.getItem('cart-list'));
  console.log(localProductAPI);
  const result = localProductAPI.map(element => {
    return `    <input type="hidden" value="${element.id}" 
    class="idInput w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />

                 <tr>
                   <td class="hidden pb-4 md:table-cell">
                     <a href="#">
                       <img src="${element.image}"
                         class="w-20 rounded" alt="Thumbnail" >
                     </a>
                   </td>
                   <td>
                     <a href="#">
                       <p class="mb-2 md:ml-4" >${element.name}</p>
                       <form action="" method="POST">
                         <button type="submit" class="text-gray-700 md:ml-4" >
                           <small>(Remove item)</small>
                         </button>
                       </form>
                     </a>
                   </td>
                   <td class="justify-center md:justify-end md:flex mt-6">
                     <div class="w-20 h-10">
                       <div class="relative flex flex-row w-full h-8" >
                         <input type="number" value="${element.qty}" 
                           class="qtyInput w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                       </div>
                     </div>
                   </td>
                   <td class="hidden text-right md:table-cell">
                     <span class="text-sm lg:text-base font-medium" >
                     ${element.old_price}VNĐ
                     </span>
                   </td>
                   <td class="text-right">
                     <span class="text-sm lg:text-base font-medium price">
                     ${element.price.toFixed(2)}VNĐ
                     </span>
                   </td>
                   <td class="text-right">
                     <span class="text-sm lg:text-base font-medium totaldetail">
                     ${(element.price * element.qty).toFixed(2)}VNĐ
                     </span>
                   </td>
                 </tr>
               `
  }).join('');
  $('#tbody').innerHTML = result;


  function totalPrice() {
    const total = localProductAPI.reduce((accumulator, currentValue) => {
      return (accumulator + currentValue.qty * currentValue.price);
    }, 0);
    return total;
  }
  $('#total').innerHTML = totalPrice().toFixed(2) + 'VNĐ';



  for (let i = 0; i < $$('.qtyInput').length; i++) {
    $$('.qtyInput')[i].onkeyup = function () {
      var price = parseFloat($$('.price')[i].innerHTML);
      console.log($$('.qtyInput')[i].value);
      localProductAPI[i].qty = $$('.qtyInput')[i].value;
      $$('.totaldetail')[i].innerHTML = ($$('.qtyInput')[i].value * price).toFixed(2) + 'VNĐ';
      //  ($$('.qtyInput')[i].value *price).reduce((accumulator, currentValue) => {
      //   return (accumulator + currentValue.qty * currentValue.price);
      // }, 0);
      // if (typeof (Storage) !== "undefined") {idInput
      //   proArr = JSON.parse(localStorage.getItem('cart-list'));
      // }
      proArr.map(pro => {
        if ($$('.idInput')[i].value == pro.id) {
          // pro.qty = parseInt(pro.qty) + 1;
          pro.qty = ($$('.qtyInput')[i].value);
          check = true;
        }
      })
      if (!check) {
        proArr.push(localProductAPI[i]);
      }
      localStorage.setItem(`cart-list`, toJSON(proArr));
      console.log(localProductAPI[i]);
      const total = localProductAPI.reduce((accumulator, currentValue) => {
        return (accumulator + currentValue.qty * currentValue.price);
      }, 0);
      $('#total').innerHTML = total.toFixed(2)  + 'VNĐ';
    }
  };

  
  
  var nameRegex = /^[a-zA-Z\s]{2,32}$/;
  let userRegex = /^[a-zA-Z0-9]{1,32}$/;
  let passwordRegex = /^[a-zA-Z0-9]{6,20}$/;
  let emailRegex = /[a-z][a-z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/;
  let regexPhone = /(([+849]|[+843]|[+847]|[+848]|[+845]|09|03|07|08|05)+([0-9]{8})\b)/;
  
  const checkEmpty = (feild, message) => {
    if (feild == "") {
      message.innerHTML = "Không được để trống";
    }
  }
  
  function checkValid(feild, message, regex) {
    if (regex.test(feild) === false) {
      message.innerHTML = " Không hợp lệ!";
      checkEmpty(feild, message);
      return false;
    }
    if (regex.test(feild) === true) {
      message.innerHTML = "";
      return true;
    }
  }
  
  const checkPassword = (password, cfpassword, message) => {
    if (password === cfpassword) {
      return true;
    }
    else {
      message.innerHTML = "Mật Khẩu Không Trùng Khớp";
      return false;
    }
  }
  
  $('#add-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const nameCheck = checkValid($('#firstname').value, $('#message_error1'), nameRegex);
    const emailCheck = checkValid($('#email').value, $('#message_error5'), emailRegex);
    const phone_numberCheck = checkValid($('#phone_number').value, $('#message_error6'), regexPhone);
  
    if (nameCheck == true &&  emailCheck == true && phone_numberCheck == true) {
      
        $('#msg').classList.remove("hidden");
        $('#msg').innerHTML = "Thanh toán thành công";
    }})
  

}