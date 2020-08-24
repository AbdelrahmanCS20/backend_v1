var express = require('express');
var app = express();
var session = require('express-session');
var { v4: uuid4 } = require('uuid');
var monggose = require('mongoose');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var AdminAPI = require('./API/AdminAPI');
var UserAPI = require('./API/userAPI');
app.use(express.json());

app.use(session({
    genid: uuid4,
    secret: 'secret'
}));
app.use(cors({ origin: true }));
app.use(cookieParser());
AdminAPI(app);
UserAPI(app);


/*function formatSID(sid) {
    sid = sid.split(":")[1].split(".")[0];
    return sid;
}

function authenticate(req, resp, next) {
    let requestSID = formatSID(req.cookies["connect.sid"]);
    let backendSID = req.session.id;
    if (requestSID === backendSID) {
        next();
    } else {
        resp.json({ message: "authentication error" });
    }
}*/

monggose.connect('mongodb+srv://Abdo:1234@cluster0-h011g.mongodb.net/test?retryWrites=true&w=majority');

app.listen(4000)