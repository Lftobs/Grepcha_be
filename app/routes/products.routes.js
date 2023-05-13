module.exports = app => {
    const products = require("../controllers/products.controller.js");
  
    var router = require("express").Router();
  
    // Create
    router.post("/add", products.create);
  
    // Retrieve all 
    router.get("/", products.findAll);
  
    // Retrieve a single Product
    router.get("/:id", products.findOne);
  
    // Update a product with id
    router.put("/:id", products.update);
  
    // Delete a product with id
    router.delete("/:id", products.delete);

  
    app.use('/api/products', router);
  };