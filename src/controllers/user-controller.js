const userModel =  require('../models/userModel');
const { createToken } = require('../config/jwtToken');


const createuser =  async( req, res )=>{

    try {
         
        const newUser = await userModel.create( req.body );

        return res.status(201).json({
            success: true,
            message: 'user Created successfully',
            data: {
                email: newUser.email,
                mobile: newUser.mobile,
                name: newUser.firstname
            }
        })
    } 
    catch (error) {
        
        console.log('not able to create user')
        return res.status(500).json({
            success: false,
            message: 'not able to create user',
            error: error
        })
    }
};

const loginUser = async( req, res )=>{

    try {
       
        const User = await userModel.findOne( {email: req.body.email } );
        console.log(User)
        if( User == null )throw   "user does not exist";
      
        const ispasswordEqual = await  User.isPasswordMatch( req.body.password );
       
        if( !ispasswordEqual ) throw {message: "please enter correct password"};

        const newToken = await createToken( {id: User.id, email: User.email });

        return res.status(200).json({
            success: true,
            message: 'user loged in successfully And Token created succesfully',
            data: {
                email: User.email,
                mobile: User.mobile,
                name: User.firstname,
                token: newToken
            }
        })
    } 
    catch (error) {
        
        console.log('not able to log-in',error)
        return res.status(500).json({
            success: false,
            message: 'not able to log in',
            Error: error
        })
    }
};

const getUser =   async( req, res )=>{

    try {
         
        const User = await userModel.findById( req.params.id );

        return res.status(200).json({
            success: true,
            message: 'user Fetched successfully',
            data: {
                email: User.email,
                mobile: User.mobile,
                name: User.firstname
            }
        })
    } 
    catch (error) {
        
        console.log('not able to Fetched user')
        return res.status(500).json({
            success: false,
            message: 'not able to Fetched user',
            error: error
        })
    }
};

const updateUser =   async( req, res )=>{

    try {
   
         
        const User = await userModel.findByIdAndUpdate( req.user.id , req.body );

        return res.status(200).json({
            success: true,
            message: 'user updated successfully',
            data: {
                email: User.email,
                mobile: User.mobile,
                name: User.firstname
            }
        })
    } 
    catch (error) {
        
        console.log('not able to update  the user')
        return res.status(500).json({
            success: false,
            message: 'not able to update the  user',
            error: error
        })
    }
};

const getAllUser =   async( req, res )=>{

    try {
         
        const Users = await userModel.find();

        return res.status(200).json({
            success: true,
            message: 'user fetched successfully',
            data: Users
        })
    } 
    catch (error) {
        
        console.log('not able to fetched  the users')
        return res.status(500).json({
            success: false,
            message: 'not able to fetched the  users',
            error: error
        })
    }
};

const deleteUser =   async( req, res )=>{

    try {
         
        const User = await userModel.findByIdAndDelete( req.params.id );

        return res.status(200).json({
            success: true,
            message: 'user deleted successfully',
            data: {
                email: User.email,
                mobile: User.mobile,
                name: User.firstname
            }
        })
    } 
    catch (error) {
        
        console.log('not able to fetched  the users')
        return res.status(500).json({
            success: false,
            message: 'not able to fetched the  users',
            error: error
        })
    }
};

module.exports = {
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    createuser,
    loginUser
}