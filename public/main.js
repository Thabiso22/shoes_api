var $data = $("#data");
var $colour = $("#colour");
var $price = $("#price");
var $in_stock = $("#in_stock");
var $size = $("#size");
var $boxColour = $("#boxColour");
var $boxSize = $("#boxSize");
var $boxBrand = $("#boxBrand");
var $boxPrice = $("#boxPrice");
var $boxStock = $("#boxStock");
var $filterSize = $("#filterSize");
var $filterBran = $("#filterBrand");
var $buyButton = $("#buyButton");

var tableComp = Handlebars.compile(document.querySelector("#templateTable").innerHTML);

function display() {


    $.ajax({
        type: "get",
        url: "/api/shoes",
        success: function(data) {

            document.querySelector("#tbody").innerHTML = tableComp({
                shoes: data
            });
        }
    });
}
display();
$("#addButt").on("click", function() {
    var addStock = {
        colour: $boxColour.val(),
        size: $boxSize.val(),
        brand: $boxBrand.val(),
        price: $boxPrice.val(),
        in_stock: $boxStock.val()
    }

    $.ajax({
        type: "POST",
        url: "/api/shoes",
        data: addStock,
        success: function(newShoes) {

            $data.append("<li>" + newShoes.brand + "</li>");
            $colour.append("<li>" + newShoes.colour + "</li>");
            $size.append("<li>" + newShoes.size + "</li>");
            $price.append("<li>" + newShoes.price + "</li>");
            $in_stock.append("<li>" + newShoes.in_stock + "</li>");
        }
    })

});


$("#filterButt").on("click", function() {


    brand = $filterBran.val();

    $.ajax({
        type: "get",
        url: "/api/shoes/brand/" + brand,
        // data: brand,
        success: function(search) {

            document.querySelector("#tbody").innerHTML = tableComp({
                shoes: search
            });



        }
    })
    //////////////////////////////////////////////////
    size = $filterSize.val();

    $.ajax({
        type: "get",
        url: "/api/shoes/size/" + size,
        // data: brand,
        success: function(searchSize) {

            document.querySelector("#tbody").innerHTML = tableComp({
                shoes: searchSize
            });



        }
    })


});

//////////////////Buy Button/////////////////////

function buy(id) {
    console.log(id);
    $.ajax({
        type: "post",
        url: "/api/shoes/sold/" + id,

        success: function(shoeId) {
            display();
            console.log(shoeId);


        }
    });
}
/////////////////////////////////////////////////
