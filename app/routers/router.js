
let express = require('express');
let router = express.Router();

 //constasntes de rutas 

 const usuarios= require('../controllers/UsuarioController.js');

router.post('/usuarios', usuarioController.create);
router.get('/usuarios', usuarioController.getAll);
router.get('/usuarios/:id_usuario', usuarioController.getById);
router.put('/usuarios/:id_usuario', usuarioController.updateById);
router.delete('/usuarios/:id_usuario', usuarioController.deleteById);



module.exports = router;

