const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');

const userSchema = new mongoose.Schema({

    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    }
    ,
    email:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    mobile:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user'
    },
    isblocked:{
        type: Boolean,
        default: false
    },
    stripe_account_id: String,
    stripe_seller: {},
    stripesessrion: {}

}, {timestamps: true});

userSchema.pre( 'save', function (next){

    const salt=  bcrypt.genSaltSync(8);
    this.password =   bcrypt.hashSync( this.password , salt );
    next();
});

userSchema.methods.isPasswordMatch = function( inputPass ){
    try {
     
        return  bcrypt.compareSync( inputPass, this.password );
    } 
    catch (error) {
      
        throw new error({message: 'bcrypt is unable to ecrypt password'})
    }
   
}

const userModel = mongoose.model( 'User', userSchema );

module.exports = userModel;