window.onload = () => {
  const $ = document.querySelector.bind(document);
  const categoryAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/categories';
  const productAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/products';

  var getProducts = () => {
    fetch(productAPI)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        const result = data.map((pro) => {
          return `
        <tr class = "pro-id-${pro.id}">
          <td> ${pro.id}</td>
          <td> ${pro.name}</td>
          <td> ${pro.category_id}</td>
          <td><img src = "${pro.image}" alt="" width="70"></td>
          <td> ${pro.price}</td>
          <td> ${pro.desc}</td>
          <td> ${pro.status}</td>
          <td> 
              <button class="btn btn-primary btn-sm" onclick ="EditProduct(${pro.id})" data-toggle="modal"
              data-target="#editForm" >Sửa</button> 
              <button class="btn btn-danger btn-sm" onclick ="deleteProduct(${pro.id})">Xóa</button>
          </td>
        </tr>
        `
        }).join("");
        $('#tbody').innerHTML = result;


      });

  }

  getProducts();

  function Create() {
    fetch(categoryAPI)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        const result = data.map(cate => {
          return `<option value="${cate.id}">${cate.name}</option>`
        }).join("");
        $('#category_id').innerHTML = result;

        $('#form').onsubmit = function (e) {
          e.preventDefault();
          const name = $('#name').value;
          const category_id = $('#category_id').value;
          const image = $('#image').value;
          const price = $('#price').value;
          const desc = $('#desc').value;
          const status = $('#status').value;

          const newProduct = {
            name: name,
            category_id: category_id,
            image: image,
            price: price,
            desc: desc,
            status: status,
          }
          
          var option = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
          }
          fetch(productAPI, option)
            .then((response) => {
              return response.json();
            })
            .then(data => {
              console.log(data);
              getProducts();
              $('#success').classList.remove('hidden');
              $('#success').innerHTML = "Tạo Thành Công";
            }).then(() => {
              window.$("#exampleModal").modal('hide');
              window.$('body').removeClass('modal-open');
              window.$('.modal-backdrop').remove();
            })
            .then(() => {
              successAlert('Thêm');
            });
            
        }
      })
  }

  $('#add').onclick = () => {
    Create();
  };

  window.EditProduct = (id) => {
    // Lấy ra thông tin danh mục
    fetch(productAPI + '/' + id, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetch(categoryAPI)
          .then((response) => {
            return response.json();
          })
          .then(categorydata => {
            console.log(categorydata);
            const result = categorydata.map(cate => {

              return `<option value="${cate.id}" class="option-checked-${cate.id}">${cate.name}</option>`
            }).join("");
            $('#category_id_edit').innerHTML = result;

            $('#name_edit').value = data.name;
            $('#category_id_edit').value = data.category_id;
            $('#image_edit').value = data.image;
            $('#price_edit').value = data.price;
            $('#desc_edit').value = data.desc;
            $('#status_edit').value = data.status;
          })

      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // Sửa thông tin danh mục
    $('#formEdit').onsubmit = function (e) {
      e.preventDefault();
      editProduct = {
        name: $('#name_edit').value,
        category_id: $('#category_id_edit').value,
        image: $('#image_edit').value,
        price: $('#price_edit').value,
        desc: $('#desc_edit').value,
        status: $('#status_edit').value,
      }
      fetch(productAPI + '/' + id, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editProduct)
      })
        .then((response) => response.json())
        .then((data) => {
          getProducts();

          $('#success').classList.remove('hidden');
          $('#success').innerHTML = "Sửa Thành Công";
        }).then(() => {
          window.$("#editForm").modal('hide');
          window.$('body').removeClass('modal-open');
          window.$('.modal-backdrop').remove();
        })
        .then(() => {
          successAlert('Sửa');
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  window.deleteProduct = (id) => {
    swal({
      title: "Bạn có muốn xóa không?",
      text: "Khi xóa bạn không thể khôi phục lại",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`${productAPI}/${id}`, {
            method: "DELETE" // or 'PUT'
          })
            .then((response) => response.json())
            .then((data) => {
              $(`.pro-id-${id}`).remove();
              $('#success').classList.remove('hidden');
              $('#success').innerHTML = "Xóa Thành Công";
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          swal("Xóa Thành Công", {
            icon: "success",
          });
        } else {
          swal("Xóa Không Thành Công");
        }
      });

  };

  function loadingAlert(text) {
    swal({
      title: "Đang thực thi...",
      text: text,
      closeOnEsc: false,
      closeOnClickOutside: false,
      buttons: false,
      icon: "info"
    })
  }
  function successAlert(text) {
    swal({
      title: "Thực thi hành công",
      text: `Bạn đã ${text} sản phẩm thành công`,
      icon: "success",
      timer: 1500,
      buttons: false
    });
  }
}
