
var express = require('express');
var wagner = require('wagner-core');

require('./model/models')(wagner);

var app = express();

//wagner.invoke(require('./router/auth'), {app: app});

app.use('/api/v1', require('./router/api')(wagner));

app.use("/test", function (req, res) {
    res.send("Hello word");
});

app.use("/", function (req, res) {
    res.sendfile("client/index.html");
});
app.listen(3000, function () {
    console.log("app is listening on port 3000");
});
