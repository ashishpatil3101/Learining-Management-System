const express =  require('express');
const route = express.Router();

const {
    getAllUser,
    updateUser,
    getUser,
    deleteUser,
    createuser,
    loginUser
} =  require('../controllers/user-controller');

const { 
    authMiddleware,
    isAdmin

} = require('../middlewares/authMiddleware')

route.post('/' , createuser );
route.post('/login', loginUser )

route.get('/:id', getUser );
route.get('/', authMiddleware,isAdmin, getAllUser );

route.put('/:id', authMiddleware, updateUser );

route.delete('/:id' ,authMiddleware, deleteUser );//user can delete himself

module.exports = route;

