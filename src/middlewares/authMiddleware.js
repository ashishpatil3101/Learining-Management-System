const jwt = require('jsonwebtoken');
const userModel  =  require('../models/userModel')

const authMiddleware= async (req,res , next )=>{


    try {
        
        const token = req.headers['x-access-token'];
        if( token == null) throw 'token is empty';
        
        const seceretKey = process.env.JWT_SECRET;

        const decoded = await jwt.verify( token , seceretKey );
        const userDetail = await userModel.findById( decoded.id );
        req.user = userDetail;
        next();

    } 
    catch (error) {
        
        res.status(500).json({
            success: false,
            error: 'token has expired'

        })
    }
}

const isAdmin =  async (req,res , next )=>{


    try {
        
        
        const userDetail = await userModel.findById( req.user.id );

        if( userDetail.role != "Admin") throw { message: 'user is not admin'};
        req.user = userDetail;
        next();

    } 
    catch (error) {
        console.log( error)
        res.status(500).json({
            success: false,
           error: error

        })
    }
}

const isInstructor =  async (req,res , next )=>{


    try {
        
        
        const userDetail = await userModel.findById( req.user.id );

        if( userDetail.role != "Instructor") throw { message: 'user is not Instructor'};
        req.user = userDetail;
        next();

    } 
    catch (error) {
        console.log( error)
        res.status(500).json({
            success: false,
            error: error

        })
    }
}


module.exports = {authMiddleware ,isAdmin ,isInstructor };