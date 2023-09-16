const express = require('express')
const{getCharById,postFav,deleteFav,login} = require('../controllers')

const router = express.Router()

router.get("/character/:id",getCharById)
router.get("/login",login)
router.post("/fav",postFav)
router.delete("/fav/:id",deleteFav)
//esto seria una mini modularizacion
module.exports= router