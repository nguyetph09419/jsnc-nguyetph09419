const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let user = {};
const users = [];

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
      $('#msg').innerHTML = "Gửi Liên Hệ Thành Công";
  }})
