const express = require("express");
const router = express.Router();
const Product = require("./models/product");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth")

const ProductsControllers = require('../controllers/products') 


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});



const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true)
  } else{
  //reject a file
  cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter
});

router.get("/", ProductsControllers.products_get_all);

router.post("/", checkAuth, upload.single("productImage"), ProductsControllers.products_create_product);

router.get("/:productId", ProductsControllers.products_get_product);

router.patch("/:productId",checkAuth, ProductsControllers.products_update_product);

// router.patch("/:productId", (req, res, next) => {
//   Product.findByIdAndUpdate(id, { $set: req.body }, { new: true})
//     .then(result => res.status(200).json(result))
//     .catch(err => res.status(500).json({ error: err}))
// })

//   Product.findByIdAndUpdate({ _id: id }, { $set: updateOps })
//     .exec()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

router.delete("/:productId",checkAuth, ProductsControllers.products_delete_product);

module.exports = router;
