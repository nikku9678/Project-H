const jwt = require("jsonwebtoken")

const generateToken = async(userId)=>{
   const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '10m'})
   return token;
}

module.exports = generateToken