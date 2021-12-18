const express = require('express');
const { addPaymentType, deletePayment, editPayment, getPayments, getPayment } = require('../controller/paymentController');
const router = express.Router();

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.post('/:id/add_payment', addPaymentType);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.get('/:id/get_payments', getPayments);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.get('/get_payment/:payment_id', getPayment);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.delete('/delete/:payment_id', deletePayment);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.post('/update/:payment_id', editPayment);





module.exports = router;