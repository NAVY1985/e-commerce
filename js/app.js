var form = $('#search-form');

var search = $('#searchProducts');
var searchedForText;

form.click(function(e) {
    e.preventDefault();
    searchedForText = search.val();
    $('#searchProducts').val("");
    if (searchedForText.length !== 0) {
        $('#content').empty();
        $('#tittle').empty();
    }
    getData();
});

function getData() {
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?q=${searchedForText}`,
        contentType: 'application/json',
        method: 'GET',
        crossDomain: true,
        success: function(response) {
            // console.log(response.results);

            var tempTittle = `<h3>${searchedForText}</h3>`
            $('#tittle').append(tempTittle);

            for (var i = 0; i < response.results.length; i++) {
                var photo = response.results[i].thumbnail;
                var titleProduct = response.results[i].title;
                var priceProduct = response.results[i].price;


                var template = `<div class="card mt-2" style="width: 18rem;">
                         <div class="card-body text-center">
                             <img class="card-img-top img-fluid" src="${photo}" alt="Card image cap">
                             <h5 class="card-title mt-2">${titleProduct}</h5>
                             <p class="card-text h5 mt-2"><strong>Precio: $ ${priceProduct}</strong></p>
                             <a href="#" class="btn btn-primary mt-2">Add To Car</a>
                         </div>
                      </div>`;

                $('#content').append(template);
            };
        }
    });
};

function getAll() {
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/categories`,
        type: 'GET',
        datatype: 'json',
        crossDomain: true
    }).done(
        function(response) {
            console.log(response);

            for (var i = 0; i < response.length; i++) {
                var nameCategories = response[i].name;

                var idCategories = response[i].id;
                var templateCategories = `<div class="card mt-4" style="width:18rem;" >
                                    <div class="card-body text-center">
                                        <a href="#"data-categorie="${idCategories}" id="${nameCategories}"class="card-title template">${nameCategories} </a>
                                    </div>
                                </div>`;

                $('#content').append(templateCategories);

            }

            $('.template').click(function(e) {

                var element = e.target;
                var cateData = $(element).attr('data-categorie');
                var nameData = $(element).attr('id');

                var tempTittle = `<h3 class="mt-4">${nameData}</h3>`
                $('#tittle').append(tempTittle);
                $('#content').empty();

                productCategories(cateData);

            });
        }
    ).fail(error);

}

$('#home').click(function() {
    if (searchedForText.length !== 0) {
        $('#content').empty();
        $('#tittle').empty();
    }

    getAll();


});

function error() {
    alert("No se pueden cargar los datos");
}

function productCategories(cateData) {

    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?category=${cateData}`,
        type: 'GET',
        datatype: 'json',
        crossDomain: true
    }).done(getOne).fail(error);

    function getOne(response) {

        for (var i = 0; i < response.results.length; i++) {
            var photoProduct = response.results[i].thumbnail;
            var nameProduct = response.results[i].title;
            var costProduct = response.results[i].price;
            //   var shipping = response.results[i].address.state_name + ',' + response.results[i].address.city_name;

            var template = `<div class="card" style="width: 18rem;">
                                    <div class="card-body text-center">
                                        <img class="card-img-top" src="${photoProduct}" alt="Card image cap">
                                        <h5 class="card-title mt-2">${nameProduct}</h5>
                                        <p class="card-text h5 mt-2"><strong>Precio: $ ${costProduct}</strong></p>
                                         <a href="#" class="btn btn-primary mt-2">comprar</a>
                                    </div>
                                </div>`;

            $('#content').append(template);

        }
    }
};


function error() {
    alert("No se pueden cargar los datos");
};


$(document).ready(function() {
    getAll();



});