const jwt = require("jsonwebtoken");
const UserDB = require("../models/userDB.model");

const validateToken = (async(req, res, next)=>{
   let token;
   if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      try {
         token = req.headers.authorization.split(" ")[1];
         const decode = jwt.verify(token, process.env.JWT_SECRET);
         
         //?? DO WE NEED TO HAVE USER DATA ?
         req.userData = await UserDB.findOne({where: {id: decode.userId}});
         next();
      } catch (error) {
         res.status(401).json({msg: 'Not authorized, token failed, token expired'});
      }
   }
})

module.exports = validateToken;