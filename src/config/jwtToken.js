const jwt = require('jsonwebtoken');

const createToken = ( user )=>{

    try {
        const key = process.env.JWT_SECRET;
        console.log(key);
        
        const newToken = jwt.sign( user, key,{expiresIn: "7d"});
        return newToken;
    } 
    catch (error) {
         console.log('not able to create token');
         throw error;    
    }
}

module.exports= { createToken}