const Package = require("../models/Package");

const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({ laundry: req.params.id });
    res.json(packages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getPackage = async (req, res) => {
  try {
    const package = await Package.findOne({ _id: req.params.package_id });
    // console.log(package);
    res.json(package);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const addPackage = async (req, res) => {
  try {
    //Create Package
    const package = new Package({
      name: req.body.name,
      price: req.body.price,
      laundry: req.params.id,
    });
    await package.save();
    res.json(package);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deletePackage = async (req, res) => {
    try {
      const package = await Package.findByIdAndDelete(req.params.package_id);
      res.json(package);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };
  
  const editPackage = async (req, res) => {
    const { name, price } = req.body;
    try {
      let package = await Package.findById(req.params.package_id);
      if (package) {
        package = await Package.findOneAndUpdate(
          { _id: req.params.package_id },
          { $set: { name: name, price: price } },
          { new: true }
        );
        return res.json(package);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

module.exports = { getPackages, getPackage, addPackage, deletePackage, editPackage };
