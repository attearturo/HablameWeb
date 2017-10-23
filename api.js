var fs = require('fs');
var express = require('express');
var api = express.Router();
const client = require('mongodb').MongoClient;

api.get('/', (req, res) => {
	res.json({message: 'working'});
});

const url = 'mongodb://localhost/hablame';
var db = null;


client.connect(url, (err, database) => {
  if(!err){
   db = database;
   console.log('hablame : Conexión establecida a Mongo Database')
 } else {
  console.log('Error de conexión a Mongo Database')
}
});

api.route('/usuarios')
.get((req,res)=>{
  db.collection('usuarios')
  .find({})
  .toArray((err,usuarios)=>{
    res.json(usuarios);
    if(!err){
    }else{
      res.json({mensaje:'OK'});
    }
  });
})

.post((req,res)=>{
  db.collection('usuarios')
  .find({codigo:req.body.codigo})
  .toArray((err,usuarios) =>{
    if(!err && usuarios.length == 0){
      var nuevoUsuario={
        universidad: req.body.universidad,
        codigo: req.body.codigo,
        contrasena: req.body.contrasena,
      };
      db.collection('usuarios').insert(nuevoUsuario,(errInsert) => {
        res.json({ mensaje: 'Usuario suscrito exitosamente.' });
      });
    } else {
      res.json({mensaje:'Lo sentimos, este código ya se utiliza.'});
    }
  });
});

api.route('/login')
.post((req, res) => { 
  db.collection('usuarios')
  .find({ codigo:req.body.codigo, contrasena:req.body.contrasena})
  .toArray((err, usuarios) => {
    if(!err && usuarios.length > 0){
      res.json({
        mensaje: 'Acceso otorgado',
        usuario: usuarios[0]
      });
    } else {
      res.json({ mensaje: ' Usuario o contraseña incorrecto' });
    }
  });
});


module.exports = api;