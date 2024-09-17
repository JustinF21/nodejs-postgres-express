
let express = require('express');
let router = express.Router();

 //constasntes de rutas 

 const usuarios= require('../controllers/UsuarioController.js');
 const libros= require('../controllers/LibroController.js');
 
 
 
 

router.post('/api/usuarios/create', usuarios.create);
router.get('/api/usuarios/all', usuarios.getAll);
router.get('/api/usuarios/onebyid/:id_departamento', usuarios.getById);
router.put('/api/usuarios/update/:id_departamento', usuarios.updateById);
router.delete('/api/usuarios/delete/:id_departamento', usuarios.deleteById);

router.post('/api/libros/create', libros.create);
router.get('/api/libros/all', libros.getAll);
router.get('/api/libros/onebyid/:id_libro', libros.getById);
router.put('/api/libros/update/:id_libro', libros.updateById);
router.delete('/api/libros/delete/:id_libro', libros.deleteById);






module.exports = router;

