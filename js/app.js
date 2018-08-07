var form = $('#search-form');

var search = $('#searchProducts');
var searchedForText;

form.submit(function(ev) {
    ev.preventDefault();
    searchedForText = search.val();
    $('#searchProducts').val("");

    getData();
});

function getData() {
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?q=${searchedForText}`,
        contentType: 'application/json',
        method: 'GET',
        crossDomain: true,
        success: function(response) {
            console.log(response);
            var tempTittle = `<h3>${searchedForText}</h3>`
            $('#tittle').append(tempTittle);

            for (var i = 0; i <= 5; i++) {
                var photo = response.results[i].thumbnail;
                var titleProduct = response.results[i].title;
                var priceProduct = response.results[i].price;


                var template = `<div class="card mt-4" style="width: 16rem;">
                         <div class="card-body text-center">
                             <img class="card-img-top" src="${photo}" alt="Card image cap">
                             <h5 class="card-title mt-2">${titleProduct}</h5>
                             <p class="card-text"><strong>Precio: $ ${priceProduct}</strong></p>
                             <a href="#" class="btn btn-primary">Add To Car</a>
                         </div>
                      </div>`;


                $('#content').append(template);


            };

        }
    });


};