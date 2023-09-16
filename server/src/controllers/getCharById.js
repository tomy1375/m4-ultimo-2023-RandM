const axios = require("axios")
const URL = "https://rickandmortyapi.com/api/character/"

async function getCharById(req, res){
    try {
        const{ id: charId } = req.params 
        const response= await axios.get(URL + charId)
        
            const {id , name ,gender, species, status, origin, image} = response.data
            res.status(200).json({id , name ,gender, species, status, origin, image})
      
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    // axios.get(URL+id)
    // .then((response)=>{
    //     if(response.status === 200){
    //         const {id , name ,gender, species, status, origin, image} = response.data
    //         res.json({id , name ,gender, species, status, origin, image})
    //     } else{
    //         res.status(404).send('Not found')
    //     }
    // })
    // .catch((error)=> res.status(500).json({message: error.message}))
}

// function getCharById(res, id) {
//     axios(`https://rickandmortyapi.com/api/character/${id}`)
//     .then((response)=>{
//         console.log(response.data)
//         debugger
//         const{id, name, image,gender,species,origin,status}= response.data;
//         res.writeHead(200,{'Content-Type': 'application/json'})
//         res.end(JSON.stringify({id , name ,gender, species, status, origin, image}))
//     })
//     .catch((error)=>{
//         res.writeHead(500,{'Content-Type': 'text/plain'})
//         res.end(error.message)
//     })
// }

module.exports = 
    getCharById
