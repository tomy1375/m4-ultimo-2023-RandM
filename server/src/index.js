const express = require('express');
const router = require('./routes')
const server = express();
const PORT = 3001;
const { conn } = require('../DB_connection');

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
 });

 server.use(express.json())
 server.use("/rickandmorty", router)// ---->   localhost:3001/rickandmorty/login ..es un prepath //  routes: de esta forma utiliza toda la logica interna de cada una ellas

// conn.sync({
//    force:true
// }).then(()=>{
//    server.listen(PORT, () => {
//       console.log('Server raised in port: ' + PORT);
//    });

// }).catch((error)=>console.log(error))

try {
   server.listen(PORT,async()=>{
      console.log("server raiser in port:"+PORT)
      await conn.sync({})
   })
} catch (error) {
   console.log(error)
}
// const http = require('http') ;
// // const characters = require('./utils/data');

// const PORT = 3001;
// const {getCharById} = require('./controllers/getCharById')
// const server = http.createServer((req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
    
//     const { url } = req
    
//     // if (req.url.startsWith("/rickandmorty/character/")) {
//     //     const id = req.url.substring(req.url.lastIndexOf("/") + 1);
//     //     const characterId = parseInt(id);

//     //     const character = data.characters.find(char => char.id === characterId);

//     if (url.includes("/rickandmorty/character")) {
//         // const id = url.split("/").pop();
//         const id = +req.url.split('/').pop();
//         getCharById(res,id);
//         // const character = characters.find(char => char.id === id);
//         // res.writeHead(200, {"Content-Type":"application/json"});
//         // if(character) {
//         //     return res.end(JSON.stringify(character));
//         // } else {
//         //     return res.end(JSON.stringify({"error":"Character not found"}));
//         // }
//     } else{
//         res.writeHead(404, { 'Content-Type': 'application/json' })
//         res.end(JSON.stringify({error:"not found"}))
//     }
// });

// server.listen(PORT, () => {console.log(`server levantado en el puerto ${PORT}`)});

