const express = require("express");
const { addPackage, getPackages, getPackage, deletePackage, editPackage } = require("../controller/packageController");
const router = express.Router();

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.post('/:id/add_package', addPackage);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.get('/:id/get_packages', getPackages);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.get('/get_package/:package_id', getPackage);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.delete('/delete/:package_id', deletePackage);

//@route    GET /api/user/get_user/:id
//@desc     GET user data
//@access   Public
router.post('/update/:package_id', editPackage);

module.exports = router;