const db = require('../config/db.config.js');
const Producto = db.Producto;

// Create a new Producto
exports.create = (req, res) => {
    let producto = {};

    try {
        // Building Producto object from request's body
        producto.descripcion = req.body.descripcion;
        producto.stock = req.body.stock;
        producto.stock_minimo = req.body.stock_minimo;
        producto.precio_unitario = req.body.precio_unitario;
        

        // Save to MySQL database
        Producto.create(producto).then(result => {
            res.status(200).json({
                message: "Producto created successfully with id = " + result.id_producto,
                producto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Get all Productos
exports.getAll = (req, res) => {
    Producto.findAll()
        .then(productos => {
            res.status(200).json({
                message: "Retrieved all Productos successfully!",
                productos: productos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Get Producto by ID
exports.getById = (req, res) => {
    let productoId = req.params.id_producto;

    Producto.findByPk(productoId)
        .then(producto => {
            if (producto) {
                res.status(200).json({
                    message: "Successfully retrieved Producto with id = " + productoId,
                    producto: producto
                });
            } else {
                res.status(404).json({
                    message: "Producto not found with id = " + productoId
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Update a Producto by ID
exports.updateById = async (req, res) => {
    try {
        let productoId = req.params.id_producto;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "Not found: Producto with id = " + productoId,
                error: "404"
            });
        } else {
            let updatedObject = {
                descripcion: req.body.descripcion,
                stock: req.body.stock,
                stock_minimo: req.body.stock_minimo,
                precio_unitario: req.body.precio_unitario,
                id_proveedor: req.body.id_proveedor
            };
            let result = await Producto.update(updatedObject, { returning: true, where: { id_producto: productoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error: Could not update Producto with id = " + req.params.id_producto,
                    error: "Update failed"
                });
            } else {
                res.status(200).json({
                    message: "Producto updated successfully with id = " + productoId,
                    producto: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not update Producto with id = " + req.params.id_producto,
            error: error.message
        });
    }
};

// Delete a Producto by ID
exports.deleteById = async (req, res) => {
    try {
        let productoId = req.params.id_producto;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "Producto not found with id = " + productoId,
                error: "404",
            });
        } else {
            await producto.destroy();
            res.status(200).json({
                message: "Producto deleted successfully with id = " + productoId,
                producto: producto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not delete Producto with id = " + req.params.id_producto,
            error: error.message,
        });
    }
};
