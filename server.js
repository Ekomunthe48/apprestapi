const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//parse app/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routes
var routers = require('./routers');
routers(app);

app.listen(3000, () => {
    console.log(`Server started on port`);
});