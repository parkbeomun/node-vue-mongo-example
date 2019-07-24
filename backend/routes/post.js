const express = require('express');
const router = express.Router();

const postController = require('../controller/postController');

//READ
router.get('/', postController.index);
//CREATE
router.post('/create', postController.create);
//EDIT
router.get('/edit/:id', postController.edit);
//UPDATE
router.put('/:id', postController.update);
//DELETE
router.delete('/:id', postController.delete);

module.exports = router;