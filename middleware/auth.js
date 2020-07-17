const jwt = require('jsonwebtoken')
const User = require('../models/users')


const auth = (req, res, next) => {
   try{
    const header = req.headers['authorization'];
    // console.log(header)

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        
        const decodedToken = jwt.verify(token, 'secretkey')
      
        const user = User.findOne({
            where: {
                email: decodedToken.user.email
            }
        })
        // console.log(user.email)

        if(user){
            req.token = token
            req.decodedToken = decodedToken.user
            // req.decodedToken = decodedToken
            // req.user = user
            next();
        }
        
    } 

   } catch(e){
       // expire el token o no hay un token o no hay un usuario
        res.status(401).send({error: 'Please authenticate'})
   }
}


module.exports = auth