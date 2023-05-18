const express =  require('express');
const bodyparser = require('body-parser');


const startAndSetupServer = async () =>{

    const App =  express();
    const PORT = process.env.PORT;

    App.use( bodyparser.json());
    App.use( bodyparser.urlencoded({ extended: true}));

    // App.use('/Api' , );

    App.listen( PORT , ()=>{
         
        console.log('main sever has started successfully');
    } )
};

startAndSetupServer();