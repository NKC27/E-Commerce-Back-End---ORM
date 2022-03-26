const router = require('express').Router();
const {
  Category,
  Product
} = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{
        model: Product
      }]
    });
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
});
// find one CATEGORY by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{model: Product
    }] }
    );

    if (!categories) {
      res.status(400).json({
        message: 'Sorry there is an error with the id! Please try again.'
      });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(error);
  }
});
// CREATE a new category
router.post('/', async (req, res) => {

  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const categories = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categories = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;


// req.params.Product, {
//   include: [{ model: , through: , as: ' }]