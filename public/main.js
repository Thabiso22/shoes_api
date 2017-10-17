$(function() {
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

    $.ajax({
        type: "get",
        url: "/api/shoes",
        success: function(data) {
            $.each(data, function(i, shoes){

                $data.append("<li>" + shoes.brand + "</li>");
                $colour.append("<li>" + shoes.colour + "</li>");
                $price.append("<li>" + shoes.price + "</li>");
                $in_stock.append("<li>" + shoes.in_stock + "</li>");
                $size.append("<li>" + shoes.size + "</li>");
            });

          },
          });
/////////////////////////////////////////////////
$("#addButt").on("click", function() {
  var addStock = {
                  colour: $boxColour.val(),
                  size: $boxSize.val(),
                  brand: $boxBrand.val(),
                   price:$boxPrice.val(),
                   in_stock:$boxStock.val()
                 }

                  $.ajax({
                      type: "POST",
                      url: "/api/shoes",
                      data: addStock,
                      success: function(newShoes) {
                        console.log(newShoes);

                          $data.append("<li>" + newShoes.brand + "</li>");
                          $colour.append("<li>" + newShoes.colour + "</li>");
                          $size.append("<li>" + newShoes.size + "</li>");
                           $price.append("<li>" + newShoes.price + "</li>");
                           $in_stock.append("<li>" + newShoes.in_stock + "</li>");
                      }
                  })

});




        });
