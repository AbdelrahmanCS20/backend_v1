function formatSID(sid) {
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
}
module.exports = authenticate;