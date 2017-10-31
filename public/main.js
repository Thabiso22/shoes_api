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
var $myStock = $("#myStock");
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
//Add Button
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
            display();
        }
    })
    ////////////////////////
     boxColour.value="";
     boxSize.value="";
     boxBrand.value="";
     boxPrice.value="";
     boxStock.value="";
    ///////////////////
});
//End of Add Button
//AddEventListener Button
//Filter by Brand
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
    //End of Filter by Brand
    //Filter By Size
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
//End of Filter by Size
//End of EventListener
//Buy Button
function buy(id) {

    $.ajax({
        type: "post",
        url: "/api/shoes/sold/" + id,
        success: function(shoeId) {
            display();
        }
    });
}
//////////////////////xxxxxxxxxxxx//////////////////////
$("#myStock").on("click", function() {
  display();
});

//////////////////////
$.ajax({
    type: "post",
    url: "/api/shoes/brand/:brandname/size/"+size,
    success: function(shoeId) {
        display();
    }
});
