// importamos el módulo express
const express = require('express');
// creamos la variable app 
var app = express();
// requerimos el módulo path
var path = require('path');
//modulo mongoose en vez de body-parser
var bodyParser = require('body-parser');
//rutas al api
var api = require('./api.js');
const fileUpload = require('express-fileupload');

app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);

// definimos las carpetas de archivos estáticos
app.use('/public', express.static('public'));
app.use('/gallery', express.static('gallery'));

// definimos el comportamiento del root
app.get('*', (req, res) => {
  // enviamos el archivo index.html
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// iniciamos el servidor en el puerto 3000
app.listen(3001, function () {
  console.log('Hablame : Localhost 3001')
});