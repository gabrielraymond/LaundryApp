const express = require('express');
const router = express.Router()
const { getUser, addUser, editUser, login, getEmployees, deleteEmployee } = require('../controller/authController');
const auth = require('../middleware/auth');

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.get('/get_user', auth, getUser)

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.get('/get_employees', auth, getEmployees)

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.delete('/delete_employee/:id', deleteEmployee)

//@route    POST /api/user/register
//@desc     POST user data
//@access   Public
router.post('/register/:id', addUser)

//@route    POST /api/user/edit_user/:id
//@desc     POST user data
//@access   Public
router.post('/edit_user/:id', editUser)

//@route    POST /api/user/edit_user/:id
//@desc     POST user data
//@access   Public
router.post('/login', login)


module.exports = router;