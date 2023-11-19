const{Favorite}= require("../../DB_connection")

exports.deleteFav= async(req, res)=>{
    const {id} = req.params
    try {
        if(!id){
            return res.status(401).json({error:"Faltan el ID"})
        }
        await Favorite.destroy({
            where:{id}
        })

        const charsFavs = await Favorite.findAll()
        return res.status(200).json(charsFavs)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}