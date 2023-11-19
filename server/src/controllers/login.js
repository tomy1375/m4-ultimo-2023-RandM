const{User} = require("../../DB_connection")

exports.login = async( req, res) =>{
    const{email, password}= req.query
    try {
        if(!email || !password){
            return res.status(400).json({error:"Faltan datos"})
        }
       const user= await User.findOne({
            where:{
                email
            }
        })
        if(!user){
            return res.status(404).json({error:"Usuario no encontrado"})
        }
        return user.password === password ?
        res.status(200).json({access:true})
        : res.status(403).json({error:"Contraseña incorrecta"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}








// const users = require('../utils/users')

// function login(req,res) {
//     const{email, password}= req.query
//     // const user = users.find(
//     //     (user) => user.email === email && user.password === password
//     // )
//     const user = users.some(user => user.email === email && user.password === password)
//      user ? res.json({access: true}) : res.json({access: false})
// }

// module.exports = login