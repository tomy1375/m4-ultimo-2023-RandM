const express = require('express')
const{getCharById} = require('../controllers')
const { postUsers } = require('../controllers/postUser')
const { login } = require('../controllers/login')
const { postFav } = require('../controllers/postFav')
const { deleteFav } = require('../controllers/deleteFav')

const router = express.Router()

router.get("/character/:id",getCharById)
router.get("/login",login)
router.post("/login", postUsers)

router.post("/fav",postFav)
router.delete("/fav/:id",deleteFav)
//esto seria una mini modularizacion
module.exports= router