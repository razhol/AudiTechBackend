const express = require('express')
const gitHubpullRouter = require('./routers/gitHubpullRouter');
const cors = require('cors');

let app = express();
//Allowing get POST and PUT request
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended : false}));

require('./configs/database')


app.use('/', gitHubpullRouter);


app.listen(8000);