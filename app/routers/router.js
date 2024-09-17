
let express = require('express');
let router = express.Router();

 //constasntes de rutas 
 const departamentos = require('../controllers/departamentoController.js');
 const empleados= require('../controllers/EmpleadoController.js');
 const clientes = require('../controllers/ClienteController.js');
 const proveedores = require('../controllers/ProveedorController.js');
 const productos = require('../controllers/ProductoController.js');
 const facturas = require('../controllers/FacturaController.js');
 const facturaDetalleController = require('../controllers/facturaDetalleController');
 
 
router.post('/api/departamentos/create', departamentos.create);
router.get('/api/departamentos/all', departamentos.getAll);
router.get('/api/departamentos/onebyid/:id_departamento', departamentos.getById);
router.put('/api/departamentos/update/:id_departamento', departamentos.updateById);
router.delete('/api/departamentos/delete/:id_departamento', departamentos.deleteById);

router.post('/api/empleados/create', empleados.create);
router.get('/api/empleados/all', empleados.getAll);
router.get('/api/empleados/onebyid/:id', empleados.getById);
router.put('/api/empleados/update/:id', empleados.updateById);
router.delete('/api/empleados/delete/:id', empleados.deleteById);

router.post('/api/clientes/create', clientes.create);
router.get('/api/clientes/all', clientes.getAll);
router.get('/api/clientes/onebyid/:id_cliente', clientes.getById);
router.put('/api/clientes/update/:id_cliente', clientes.updateById);
router.delete('/api/clientes/delete/:id_cliente', clientes.deleteById);

router.post('/api/proveedores/create', proveedores.create);
router.get('/api/proveedores/all', proveedores.getAll);
router.get('/api/proveedores/onebyid/:id_proveedor', proveedores.getById);
router.put('/api/proveedores/update/:id_proveedor', proveedores.updateById);
router.delete('/api/proveedores/delete/:id_proveedor', proveedores.deleteById);

router.post('/api/productos/create', productos.create);
router.get('/api/productos/all', productos.getAll);
router.get('/api/productos/onebyid/:id_producto', productos.getById);
router.put('/api/productos/update/:id_producto', productos.updateById);
router.delete('/api/productos/delete/:id_producto', productos.deleteById);

router.post('/api/facturas/create', facturas.create);
router.get('/api/facturas/all', facturas.getAll);
router.get('/api/facturas/onebyid/:id_factura', facturas.getById);
router.put('/api/facturas/update/:id_factura', facturas.updateById);
router.delete('/api/facturas/delete/:id_factura', facturas.deleteById);

router.post('/api/facturaDetalles/create', facturaDetalleController.create);
router.get('/api/facturaDetalles/all', facturaDetalleController.getAll);
router.get('/api/facturaDetalles/onebyid/:id_factura', facturaDetalleController.getById);
router.put('/api/facturaDetalles/update/:id_factura', facturaDetalleController.updateById);
router.delete('/api/facturaDetalles/delete/:id_factura', facturaDetalleController.deleteById);




module.exports = router;

