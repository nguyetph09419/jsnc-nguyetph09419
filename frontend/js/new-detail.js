window.onload = () => {
  const $ = document.querySelector.bind(document);

  const newsAPI = 'https://5faccf982ec98b00160477b2.mockapi.io/news';

  const url = new URL(document.URL);
  const id = url.searchParams.get('id');
  var getProduct = () => {
    fetch(`${newsAPI}/${id}`)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        $('#title').innerHTML = data.name;
        $('#desc').innerHTML = data.description;
        $('#img').src = data.image;
        $('#date_add').innerHTML = data.date_add;
      });
  }
  getProduct();


}