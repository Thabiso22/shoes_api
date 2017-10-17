var express = require('express');
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var model = require("./shoeDataBase");
var app = express();
// var id = require("mongodb").ObjectId;

//body Parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

//expose express static folder
app.use(express.static('public'));

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: "handlebars"
}));
app.set('view engine', 'handlebars');


//List all shoes in stock
app.get("/api/shoes", function(req, res) {
    model.find({}, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json(results);
        }
    })


});


//List all shoes for a given brand
app.get("/api/shoes/brand/:brandname", function(req, res) {
    var brandInp = req.params.brandname;
    model.find({
        brand: brandInp
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json(results);
        }
    })
});

// 	List all shoes for a given size
app.get("/api/shoes/size/:size", function(req, res) {
    var sizeInp = req.params.size;
    model.find({
        size: sizeInp
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json(results);
        }
    })
});


//List all shoes for a given brand and size
app.get("/api/shoes/brand/:brandname/size/:size", function(req, res) {
        var brandInp = req.params.brandname;
        var sizeInp = req.params.size;
        model.find({
            brand: brandInp,
            size: sizeInp
        }, function(err, results) {
            if (err) {
                console.log(err);
            } else {
                res.json(results);
            }
        })

    }),

    //Update the stock levels when a shoe is sold
    app.post("/api/shoes/sold/:id"
    , function(req, res) {
        var itemId = req.params.id;


        model.findOneAndUpdate({
            _id: itemId
        }, {
            $inc: {
                in_stock: -1
            }
        }, {
            upsert: false
        }, function(err, results) {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        })
    });

// 	Add a new new shoe to his stock.
app.post("/api/shoes", function(req, res) {

    var newShoe = new model(req.body);

    newShoe.save({}, function(err, results) {
        if (err) {
            console.log(err);
        } else {

            res.send(results);
        }
    })



});

// });


app.set("port", (process.env.PORT || 4000));
app.set("host", (process.env.HOST || "http://localhost"));
app.listen(app.get("port"), function(err) {
    console.log('node app is running on port ' + app.get("host") + ":" + app.get('port'));
});
