const express = require('express');
const {signupUser, loginUser, getUsers,getUserById, updateUser, deleteUser, addToCart, updateCart, removeFromCart} = require('../controllers/userController')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

// router.get('/getusers',requireAuth('Admin'), getUsers);
router.get('/getusers', getUsers);

router.get('/getuserbyid/:id', getUserById);

router.put('/updateuser/:id', updateUser)

// router.delete('/deleteuser/:id',requireAuth('Admin'), deleteUser)
router.delete('/deleteuser/:id', deleteUser)

router.post('/addtocart/:userId', requireAuth('User'), addToCart)

router.put('/updatecart/:userId', requireAuth('User'), updateCart)

router.delete('/removefromcart/:userId', requireAuth('User'), removeFromCart)

module.exports = router;
