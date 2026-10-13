const express = require ('express')
const postModel = require('../models/post.model')
const postController = require('../controllers/post.controller')
const logger = require('../middlewares/logger')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/', postController.getAll)
router.post('/create', authMiddleware, logger, postController.create)
router.delete('/delete/:id',authMiddleware, postController.delete)
router.put('/edit/:id',authMiddleware, postController.edit)
router.get('/get-one/:id', postController.getOne)

module.exports = router