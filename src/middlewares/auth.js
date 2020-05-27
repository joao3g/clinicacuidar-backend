const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJWT (req, res, next){
    var BearerToken = req.headers.authorization;
    if(!BearerToken) return res.status(400).json({ error: "No token provided" });

    BearerToken = BearerToken.split(" ");
    if(BearerToken[0] !== "Bearer") return res.status(400).json({ error: "Is not a Bearer token" });
    
    const auth = jwt.verify(BearerToken[1], process.env.SECRET, function(err, decoded){ 
        if(err) return res.status(400).json({ error: err.message });

        next();
    });
}

module.exports = verifyJWT;
