
 const express = require('express');
 const router = express.Router();

 const usuarioController = require('../controllers/UsuarioController');
 const proyectoController = require('../controllers/ProyectoController');
 

router.post('/api/usuarios/create', usuarioController.create);
router.get('/api/usuarios/all', usuarioController.getAll);  
router.get('/api/usuarios/onebyid/:id_usuario', usuarioController.getById);
router.put('/api/usuarios/update/:id_usuario', usuarioController.updateById); 
router.delete('/api/usuarios/delete/:id_usuario', usuarioController.deleteById);

router.post('/api/proyectos/create', proyectoController.create);
router.get('/api/proyectos/all', proyectoController.getAll);
router.get('/api/proyectos/onebyid/:id_proyecto', proyectoController.getById);
router.put('/api/proyectos/update/:id_proyecto', proyectoController.updateById);
router.delete('/api/proyectos/delete/:id_proyecto', proyectoController.deleteById);

module.exports = router;
