
let express = require('express');
let router = express.Router();

 //constasntes de rutas 

 const usuarios= require('../controllers/UsuarioController.js');
 const libros= require('../controllers/LibroController.js');
 const autores= require('../controllers/AutorController.js');
 
 
router.post('/api/usuarios/create', usuarios.create);
router.get('/api/usuarios/all', usuarios.getAll);
router.get('/api/usuarios/onebyid/:id_departamento', usuarios.getById);
router.put('/api/usuarios/update/:id_departamento', usuarios.updateById);
router.delete('/api/usuarios/delete/:id_departamento', usuarios.deleteById);








module.exports = router;

