const express = require("express");
const {
  addTransaction,
  getTransactions,
  getTransaction,
  deleteTransaction,
  editTransaction,
} = require("../controller/transactionController");
const router = express.Router();

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.post("/:id/add_transaction", addTransaction);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.get("/:id/get_transactions", getTransactions);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.get("/get_transaction/:transaction_id", getTransaction);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.delete("/delete/:transaction_id", deleteTransaction);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.post("/update/:transaction_id", editTransaction);

module.exports = router;
