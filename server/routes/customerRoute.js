const express = require("express");
const { addCustomer , getCustomers, getCustomer, deleteCustomer, editCustomer } = require("../controller/customerController");
const router = express.Router();

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.post('/:id/add_customer', addCustomer);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.get('/:id/get_customers', getCustomers);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.get('/get_customer/:customer_id', getCustomer);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.delete('/delete/:customer_id', deleteCustomer);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.post('/update/:customer_id', editCustomer);

module.exports = router;