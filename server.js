
var express = require('express');
var wagner = require('wagner-core');

require('./model/models')(wagner);

var app = express();

//app.use('/api/v1', require('./api')(wagner));

app.use("/test", function (req, res) {
    res.send("Hello word");
});

app.listen(3000, function () {
    console.log("app is listening on port 3000");
});
