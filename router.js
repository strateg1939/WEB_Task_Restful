const controller = require("./controller.js");
const router = require("express").Router();

router.get('/', controller.findAll);
router.post('/', controller.create);
router.get('/:id', controller.findById);
router.delete('/:id', controller.delete);
router.put('/:id', controller.put);
//find by author
router.get('/author/:author', controller.findByAuthor);

module.exports = router