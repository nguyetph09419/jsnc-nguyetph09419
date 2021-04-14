
window.onload = () => {
  const $ = document.querySelector.bind(document);

  const categoryAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/categories';
  $('#add').onclick = () => {
    showForm();
    handleCreateForm();
  };

  var getCategories = (callback) => {
    fetch(categoryAPI)
      .then((response) => {
        return response.json();
      })
      .then(callback);
  }

  var renderCategories = (cates) => {
    const result = cates.map((cate) => {
      return `
    <tr class = "cate-id-${cate.id}">
      <td> ${cate.id}</td>
      <td> ${cate.name}</td>
      <td><img src = "${cate.image}" alt="" width="70"></td>
      <td> 
          <button class="btn btn-primary btn-sm" onclick ="EditCategory(${cate.id})" >Sửa</button> 
          <button class="btn btn-danger btn-sm" onclick ="deleteCategory(${cate.id})">Xóa</button>
      </td>
    </tr>
    `
    }).join("");
    $('#tbody').innerHTML = result;

    $('#close-form-create-cate').onclick = () => {
      hiddenForm();
    }
    $(('#overlay')).onclick = () => {
      hiddenForm();

    }
  }
  getCategories(renderCategories);
  function showForm() {
    $('#form-create-cate').classList.remove('hidden');
    $('#overlay').classList.remove('hidden');

  }
  // function showFormEdit() {
  //   $('#form-edit-cate').classList.remove('hidden');
  //   $('#Editoverlay').classList.remove('hidden');

  // }
  function hiddenForm() {
    $('#form-create-cate').classList.add('hidden');
    $('#overlay').classList.add('hidden');

  }


  var createCategory = (data, callback) => {
    var option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch(categoryAPI, option)
      .then((response) => {
        return response.json();
      })
      .then(callback);
  }

  function handleCreateForm() {

    $('#form').onsubmit = function (e) {
      e.preventDefault();
      const name = $('#name').value;
      const image = $('#image').value;
      const newCate = {
        name: name,
        image: image
      }
      createCategory(newCate, () => {
        $('#form').reset();
        getCategories(renderCategories);
        hiddenForm();
        $('#cate-success').classList.remove('hidden');
        $('#cate-success').innerHTML = "Tạo Thành Công";
      })
    }


  }

  window.EditCategory = (id) => {
    showForm();
    // Lấy ra thông tin danh mục
    fetch(categoryAPI + '/' + id, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',

      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        $('#name').value = data.name,
          $('#image').value = data.image
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // Sửa thông tin danh mục
    $('#form').onsubmit = function (e) {
      e.preventDefault();
      editCate = {
        name: $('#name').value,
        image: $('#image').value
      }
      fetch(categoryAPI + '/' + id, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editCate)
      })
        .then((response) => response.json())
        .then((data) => {
          $('#form').reset();
          getCategories(renderCategories);
          hiddenForm();
          $('#cate-success').classList.remove('hidden');
          $('#cate-success').innerHTML = "Sửa Thành Công";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  window.deleteCategory = (id) => {
    swal({
      title: "Bạn có muốn xóa không?",
      text: "Khi xóa bạn không thể khôi phục lại",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        fetch(`${categoryAPI}/${id}`, {
          method: "DELETE" // or 'PUT'
        })
          .then((response) => response.json())
          .then((data) => {
              $(`.cate-id-${id}`).remove();
              $('#cate-success').classList.remove('hidden');
              $('#cate-success').innerHTML = "Xóa Thành Công";
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


}






