const { json } = require("sequelize")
const {User} =require("../../DB_connection")

exports.postUsers=async(req,res)=>{
    const{email, password} =req.body

try {
    
    if(!email || !password){
        return res.status(400).json({error:"faltan datos"})
    }
    const[user, created] = await User.findOrCreate({
        where:{email},
        defaults:{
            password
        }
    })
    if(!created){
        return res.status(409).json({error:"el email ya esta registrado"})
    }
    return res.status(200).json(user)
} catch (error) {
    res.status(500).json({error:error.message})
}

}