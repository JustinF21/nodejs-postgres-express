
 const express = require('express');
 const router = express.Router();
 
 // Importar el controlador
 const usuarioController = require('../controllers/UsuarioController'); // Verifica que la ruta sea correcta
 

router.post('/api/usuarios/create', usuarioController.create);
router.get('/api/usuarios/all', usuarioController.getAll);  // Cambié retrieveAllUsuarios a getAll
router.get('/api/usuarios/onebyid/:id_usuario', usuarioController.getById);// Cambié getUsuarioById a getById
router.put('/api/usuarios/update/:id_usuario', usuarioController.updateById); // Asegúrate de usar id_usuario, no solo id
router.delete('/api/usuarios/delete/:id_usuario', usuarioController.deleteById);// También aquí id_usuario

module.exports = router;
