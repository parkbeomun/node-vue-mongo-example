const express = require('express');
const router = express.Router();

const todoController = require('../controller/todoController');

//READ
router.get('/', todoController.index);
//CREATE
router.post('/create', todoController.create);
//EDIT
router.get('/edit/:id', todoController.edit);
//UPDATE
router.put('/:id', todoController.update);
//DELETE
router.delete('/:id', todoController.delete);

module.exports = router;