
const {Favorite} = require("../../DB_connection")

exports.postFav = async (req, res)=>{

    try {
        const{ id,name, origin, status, image, species ,gender}= req.body
        if(!name || !origin|| !status|| !image|| !species||!gender){
            return res.status(401).json({error:"Faltan datos"})
        }
        const[charFav, created]=  await Favorite.findOrCreate({
            where:{name},
            defaults:{id,origin, status, image, species ,gender}
        })
        if(!created){
            return res.status(409).json({error:"El personaje ya se encuentra en favoritos"})
        }
        const allFav= await Favorite.findAll()

        return res.status(200).json(allFav)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}