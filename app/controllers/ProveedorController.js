const db = require('../config/db.config.js');
const Proveedor = db.Proveedor;

// Create a new Proveedor
exports.create = (req, res) => {
    let proveedor = {};

    try {
        proveedor.id_proveedor = req.body.id_proveedor;
        proveedor.empresa = req.body.empresa;
        proveedor.direccion = req.body.direccion;
        proveedor.telefono = req.body.telefono;
        proveedor.nit = req.body.nit;
        proveedor.ciudad = req.body.ciudad;
        proveedor.pais = req.body.pais;
        proveedor.contacto = req.body.contacto;
        proveedor.email = req.body.email;
        proveedor.telefono_contacto = req.body.telefono_contacto;
        proveedor.estatus = req.body.estatus;

        // Save to MySQL database
        Proveedor.create(proveedor).then(result => {
            res.status(200).json({
                message: "Proveedor created successfully with id = " + result.id_proveedor,
                proveedor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Get all Proveedores
exports.getAll = (req, res) => {
    Proveedor.findAll()
        .then(proveedores => {
            res.status(200).json({
                message: "Retrieved all Proveedores successfully!",
                proveedores: proveedores
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

// Get Proveedor by ID
exports.getById = (req, res) => {
    let proveedorId = req.params.id_proveedor;

    Proveedor.findByPk(proveedorId)
        .then(proveedor => {
            if (proveedor) {
                res.status(200).json({
                    message: "Successfully retrieved Proveedor with id = " + proveedorId,
                    proveedor: proveedor
                });
            } else {
                res.status(404).json({
                    message: "Proveedor not found with id = " + proveedorId
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

// Update a Proveedor by ID
exports.updateById = async (req, res) => {
    try {
        let proveedorId = req.params.id_proveedor;
        let proveedor = await Proveedor.findByPk(proveedorId);

        if (!proveedor) {
            res.status(404).json({
                message: "Not found: Proveedor with id = " + proveedorId,
                error: "404"
            });
        } else {
            let updatedObject = {
                empresa: req.body.empresa,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                nit: req.body.nit,
                ciudad: req.body.ciudad,
                pais: req.body.pais,
                contacto: req.body.contacto,
                email: req.body.email,
                telefono_contacto: req.body.telefono_contacto,
                estatus: req.body.estatus
            };
            let result = await Proveedor.update(updatedObject, { returning: true, where: { id_proveedor: proveedorId } });

            if (!result) {
                res.status(500).json({
                    message: "Error: Could not update Proveedor with id = " + req.params.id_proveedor,
                    error: "Update failed"
                });
            } else {
                res.status(200).json({
                    message: "Proveedor updated successfully with id = " + proveedorId,
                    proveedor: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not update Proveedor with id = " + req.params.id_proveedor,
            error: error.message
        });
    }
};

// Delete a Proveedor by ID
exports.deleteById = async (req, res) => {
    try {
        let proveedorId = req.params.id_proveedor;
        let proveedor = await Proveedor.findByPk(proveedorId);

        if (!proveedor) {
            res.status(404).json({
                message: "Proveedor not found with id = " + proveedorId,
                error: "404",
            });
        } else {
            await proveedor.destroy();
            res.status(200).json({
                message: "Proveedor deleted successfully with id = " + proveedorId,
                proveedor: proveedor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not delete Proveedor with id = " + req.params.id_proveedor,
            error: error.message,
        });
    }
};
