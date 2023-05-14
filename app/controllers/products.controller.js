const { products } = require("../models");
const db = require("../models");
const Products = db.products;

// Create and Save a new product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const product = new Products({
    name: req.body.name,
    description: req.body.description,
    price:req.body.price,
    
  });

  product
    .save(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product."
      });
    });
};


// Get all Products from the database.
exports.findAll = (req, res) => {
  Products.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while fetching products."
      });
    });
};

// Get a single Product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Products.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Product with id: " + id});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error fetching Product with id: " + id });
      });
};

// Update a Product by the id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Product with id: ${id}`
            });
          } else res.send({ message: "Product was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Product with id: " + id
          });
        });
};

// Delete a Product with the specific id
exports.delete = (req, res) => {
    const id = req.params.id;

    Products.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Product with id: ${id}.`
          });
        } else {
          res.send({
            message: "Product was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Product with id: " + id
        });
      });
};
