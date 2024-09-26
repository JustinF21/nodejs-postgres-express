
 const express = require('express');
 const router = express.Router();
 
 // Importar el controlador
 const usuarioController = require('../controllers/UsuarioController'); // Verifica que la ruta sea correcta
 
 // Definir las rutas
 router.post('/usuarios', usuarioController.create);
 router.get('/usuarios', usuarioController.getAll);
 router.get('/usuarios/:id_usuario', usuarioController.getById);
 router.put('/usuarios/:id_usuario', usuarioController.updateById);
 router.delete('/usuarios/:id_usuario', usuarioController.deleteById);
 
 module.exports = router;
 
module.exports = router;

