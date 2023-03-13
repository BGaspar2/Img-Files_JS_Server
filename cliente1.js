
'use strict'

const multer = require('multer');
const mimeTypes = require('mime-types');
const express = require('express');
const app = express();

const storage = multer.diskStorage({ // Almacenamiento en disco
    destination: 'images/', // Destino donde guardara los archivos
    filename: function(peticion, file, callback) {
        callback("", Date.now() + file.originalname );//Asigna el nombre al archivo
        // Date.now -> (TimeStamp) que brinda la fecha con milisegundos
    }
})

const fileFilter=(req, file, cb)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
        cb(null,true);
        console.log("Es una imagen" );
    }else{
        cb(null, false);
        console.log("No es una imagen" );
    }
  
   }
  
const upload = multer({
    storage: storage,
    fileFilter:fileFilter
})

app.get("/",(req,res)=>{
    console.log(__dirname);
    res.sendFile(__dirname + "/views/cliente1.html");
});
app.post("/imagenes", upload.single('imagen') ,(req, res) => {
 
    if (!req.file) {
        console.log("No se encontro un archivo compatible!");
        return res.send("No se encontro un archivo compatible!");
      } else {
        console.log('Se encontro un archivo compatible!');
        return res.send('Se envio un archivo compatible!')} 
    
});


 //modificar el puerto para produccion
 var port = process.env.port || 8082;
app.listen(port, ()=> console.log("Server Started in port: " + port));