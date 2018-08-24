var search = $('.search');
var searchProducts = $('#searchProducts');
var searchText;


search.click(function(e) {
    e.preventDefault();
    searchText = searchProducts.val();
    $('#searchProducts').val("");
    if (searchText.length !== 0) {
        $('#content').empty();
        $('#tittle').empty();
    }
    getData();
});

function getData() {
    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?q=${searchText}`,
        contentType: 'application/json',
        method: 'GET',
        crossDomain: true,
        success: function(response) {

            var temTittleCat = `<h3>${searchText}</h3>`
            $('#tittle').append(temTittleCat);


            for (var i = 0; i < 15; i++) {
                var photo = response.results[i].thumbnail;
                var titleProduct = response.results[i].title;
                var priceProduct = response.results[i].price;


                var temProducts = `<div class="card mt-2" style="width: 18rem;">
                         <div class="card-body text-center">
                             <img class="card-img-top img-fluid" src="${photo}" alt="Card image cap">
                             <h5 class="card-title mt-2">${titleProduct}</h5>
                             <p class="card-text h5 mt-2"><strong>Precio: $${priceProduct}</strong></p>
                             <button type="button" class="btn btn-primary mt-2 car" data-product="${titleProduct}" data-price="${priceProduct}">Add To Car</button>
                         </div>
                      </div>`;

                $('#content').append(temProducts);
            };
            $('.car').click(getElementsCart);
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

            for (var i = 0; i < response.length; i++) {

                var nameCategories = response[i].name;
                var idCategories = response[i].id;
                var temCategories = `<div class="card mt-4" style="width:18rem;" >
                                    <div class="card-body text-center">
                                        <a href="#"data-categorie="${idCategories}" id="${nameCategories}" class="card-title template">${nameCategories} </a>
                                    </div>
                                </div>`;

                $('#content').append(temCategories);

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
    $('#content').empty();
    $('#tittle').empty();

    getAll();


});

function productCategories(cateData) {

    $.ajax({
        url: `https://api.mercadolibre.com/sites/MLM/search?category=${cateData}`,
        type: 'GET',
        datatype: 'json',
        crossDomain: true
    }).done(getOne).fail(error);

    function getOne(response) {

        for (var i = 0; i < 15; i++) {
            var photoProduct = response.results[i].thumbnail;
            var nameProduct = response.results[i].title;
            var costProduct = response.results[i].price;

            var temProductsCat = `<div class="card" style="width: 18rem;">
                                    <div class="card-body text-center">
                                        <img class="card-img-top" src="${photoProduct}" alt="Card image cap">
                                        <h5 class="card-title mt-2">${nameProduct}</h5>
                                        <p class="card-text h5 mt-2"><strong>Precio: $${costProduct}</strong></p>
                                         <button type="button" class="btn btn-primary mt-2 car" data-product="${nameProduct}" data-price= "${costProduct}">Add To Car</button>
                                    </div>
                                </div>`;

            $('#content').append(temProductsCat);

        }
        $('.car').click(getElementsCart);
    }
};



var count = 0;
var numeros = [];
var larray = [];

function deleteCart(e) {

    $(e).closest('tr').remove();
    count--;

    $('#count').text(` ${count}`);
};



function getElementsCart(e, nameProductCar, priceProductCar) {

    var elem = e.target;
    var nameProductCar = $(elem).attr('data-product');
    var priceProductCar = $(elem).attr('data-price');
    var templateModal =
        `   <tr>
        <td id="price-modal" class="total">$${priceProductCar}</td>
        <td id="product-modal">${nameProductCar}</td>
        <td id="product-modal"><button type="button" class="close closer delete" aria-label="Close" onclick="deleteCart(this)" data-delete="${count}" data-price="${priceProductCar}">
        <span aria-hidden="true" >&times;</span></button></td>

    </tr>`;

    $('#tbody').append(templateModal);

    count += 1;

    $('#count').text(`  ${count}`);


    numeros.push(parseFloat(priceProductCar));




    $('#total').html(`<strong>TOTAL: 
                    $${sumarArray(numeros)}</strong>`);

};


function sumarArray(array) {

    var suma = 0;

    array.forEach(function(numero) {
        suma += numero;
    });
    return suma;
}


function error() {
    alert("No se pueden cargar los datos");
    throw "No se pueden cargar los datos";
}




$(document).ready(function() {
    getAll();


});