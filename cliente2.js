'use strict'
const multer = require('multer');
const mimeTypes = require('mime-types');
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({ // Almacenamiento en disco
    destination: 'archives/', // Destino donde guardara los archivos
    filename: function(peticion, file, callback) {
        callback("", Date.now() + file.originalname );//Asigna el nombre al archivo
        // Date.now -> (TimeStamp) que brinda la fecha con milisegundos
    }
})

const fileFilter=(req, file, cb)=>{
    if(file.mimetype ==='text/plain' || file.mimetype ==='application/msword' || file.mimetype ==='application/vnd.openxmlformats-officedocument.presentationml.presentation'
    || file.mimetype ==='application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype ==='application/pdf'){
        cb(null,true);
        console.log("Es una archivo" );
    }else{
        cb(null, false);
        console.log("No es una archivo" );
    }
  
   }
  
const upload = multer({
    storage: storage,
    fileFilter:fileFilter
})

app.get("/",(req,res)=>{
    console.log(__dirname);
    res.sendFile(__dirname + "/views/cliente2.html");
});

app.post("/archivos", upload.single('archivo') ,(req, res) => {
 
    if (!req.file) {
    
        console.log("No se encontro un archivo compatible!");
        return res.send("No se encontro un archivo compatible!");

      } else {
        console.log('Se encontro un archivo compatible!');
        console.log(req.body.Date);
        console.log(req.files);
        return res.send('Se envio un archivo compatible!')
    
    } 
    
});

 //modificar el puerto para produccion
 var port = process.env.port || 8082;
app.listen(port, ()=> console.log("Server Started in port: " + port));