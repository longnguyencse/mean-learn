var express = require('express');
var wagner = require('wagner-core');

require('./models')(wagner);
require('./dependencies')(wagner);

var app = express();

wagner.invoke(require('./auth'), {app: app});

app.use('/api/v1', require('./api')(wagner));

app.use("/test", function (req, res) {
    res.send("Hello word");
});

app.use(express.static('../', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));

app.listen(3000, function () {
    console.log("app is listening on port 3000");
});
