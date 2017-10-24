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
    var $filterColour = $("#filterColour");
    var $filterSize = $("#filterSize");
    var $filterBran = $("#filterBrand");
    // console.log(document.querySelector("#templateTable").innerHTML);
    var tableComp = Handlebars.compile(document.querySelector("#templateTable").innerHTML);
    //var tableTemp =""+""{{colour}}""
    $.ajax({
        type: "get",
        url: "/api/shoes",
        success: function(data) {
          console.log(data);
              document.querySelector("#tbody").innerHTML = tableComp({shoes:data});
            }
          });

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

$.ajax({
    type: "get",
    url: "",
    success: function(data) {

        $.each(data, function(i, brand){
            $data.append("<li>" + shoes.brand + "</li>");
            $colour.append("<li>" + shoes.colour + "</li>");
            $price.append("<li>" + shoes.price + "</li>");
            $in_stock.append("<li>" + shoes.in_stock + "</li>");
            $size.append("<li>" + shoes.size + "</li>");
        });
}
});
$("#filterButt").on("click", function() {


                  brand = $filterBran.val();
                  console.log(brand);
                  $.ajax({
                      type: "get",
                      url: "/api/shoes/brand/"+brand,
                      // data: brand,
                      success: function(search) {

document.querySelector("#tbody").innerHTML = tableComp({shoes:search});



                      }
                  })
//////////////////////////////////////////////////
size = $filterSize.val();
console.log(size);
$.ajax({
    type: "get",
    url: "/api/shoes/size/"+size,
    // data: brand,
    success: function(searchSize) {

document.querySelector("#tbody").innerHTML = tableComp({shoes:searchSize});



    }
})

/////////////////////////////////////////////////

size = $filterColour.val();
console.log(colour);
$.ajax({
    type: "get",
    url: "/api/shoes/size/"+colour,
    // data: brand,
    success: function(searchSize) {

document.querySelector("#tbody").innerHTML = tableComp({shoes:searchSize});



    }
})


////////////////////////////////////////////////

});

});
