const express = require('express');
const { addLaundry, editLaundry, getLaundry, deleteLaundry } = require('../controller/laundryController');
const router = express.Router();

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.get('/get_laundry/:id', getLaundry);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.post('/add_laundry', addLaundry);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.post('/edit_laundry/:id', editLaundry);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.delete('/delete_laundry/:id', deleteLaundry);





module.exports = router;