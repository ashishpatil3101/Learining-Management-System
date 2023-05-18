const mongoose =  require('mongoose');
const DbUrl = process.env.MONGO_DB_URL;

const DbConnect = async ()=>{

    try {

        
        console.log(DbUrl)
         
        await mongoose.connect( DbUrl );
        console.log('Db connnection has made');
    } 
    catch (error) {
        
        console.log('failed to connect mongoDb sever');
        throw error;
    }
}

module.exports = DbConnect;