const express =  require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config();

//db Connection 
const DbConnect =  require('./config/dbConnect');
const UserRouts = require('./routes/userRoute');

const startAndSetupServer = async () =>{

    const App =  express();
    const PORT = process.env.PORT;

    App.use( bodyparser.json());
    App.use( bodyparser.urlencoded({ extended: true}));

     App.use('/Api/user' , UserRouts );

    App.listen( PORT , ()=>{
         
        console.log('main sever has started successfully' );
        DbConnect();
        
    } )
};

startAndSetupServer();