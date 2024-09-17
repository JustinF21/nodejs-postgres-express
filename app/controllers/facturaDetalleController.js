const db = require('../config/db.config.js');
const FacturaDetalle = db.facturaDetalle; // Asegúrate de que 'facturaDetalle' coincide con el nombre exportado en el modelo

// Create a new FacturaDetalle
exports.create = (req, res) => {
    let facturaDetalle = {};

    try {
        // Building FacturaDetalle object from request's body
        facturaDetalle.id_factura = req.body.id_factura;
        facturaDetalle.id_linea = req.body.id_linea;
        facturaDetalle.id_producto = req.body.id_producto;
        facturaDetalle.cantidad = req.body.cantidad;

        // Save to MySQL database
        FacturaDetalle.create(facturaDetalle).then(result => {
            res.status(200).json({
                message: "FacturaDetalle created successfully with id_linea = " + result.id_linea,
                facturaDetalle: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Get all FacturaDetalles
exports.getAll = (req, res) => {
    FacturaDetalle.findAll()
        .then(facturaDetalles => {
            res.status(200).json({
                message: "Retrieved all FacturaDetalles successfully!",
                facturaDetalles: facturaDetalles
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

// Get FacturaDetalle by ID
exports.getById = (req, res) => {
    let idLinea = req.params.id_linea;

    FacturaDetalle.findOne({ where: { id_linea: idLinea } })
        .then(facturaDetalle => {
            if (facturaDetalle) {
                res.status(200).json({
                    message: "Successfully retrieved FacturaDetalle with id_linea = " + idLinea,
                    facturaDetalle: facturaDetalle
                });
            } else {
                res.status(404).json({
                    message: "FacturaDetalle not found with id_linea = " + idLinea
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

// Update a FacturaDetalle by ID
exports.updateById = async (req, res) => {
    try {
        let idLinea = req.params.id_linea;
        let facturaDetalle = await FacturaDetalle.findOne({ where: { id_linea: idLinea } });

        if (!facturaDetalle) {
            res.status(404).json({
                message: "Not found: FacturaDetalle with id_linea = " + idLinea,
                error: "404"
            });
        } else {
            let updatedObject = {
                id_factura: req.body.id_factura,
                id_producto: req.body.id_producto,
                cantidad: req.body.cantidad
            };
            let result = await FacturaDetalle.update(updatedObject, { returning: true, where: { id_linea: idLinea } });

            if (!result) {
                res.status(500).json({
                    message: "Error: Could not update FacturaDetalle with id_linea = " + req.params.id_linea,
                    error: "Update failed"
                });
            } else {
                res.status(200).json({
                    message: "FacturaDetalle updated successfully with id_linea = " + idLinea,
                    facturaDetalle: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not update FacturaDetalle with id_linea = " + req.params.id_linea,
            error: error.message
        });
    }
};

// Delete a FacturaDetalle by ID
exports.deleteById = async (req, res) => {
    try {
        let idLinea = req.params.id_linea;
        let facturaDetalle = await FacturaDetalle.findOne({ where: { id_linea: idLinea } });

        if (!facturaDetalle) {
            res.status(404).json({
                message: "FacturaDetalle not found with id_linea = " + idLinea,
                error: "404",
            });
        } else {
            await facturaDetalle.destroy();
            res.status(200).json({
                message: "FacturaDetalle deleted successfully with id_linea = " + idLinea,
                facturaDetalle: facturaDetalle,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not delete FacturaDetalle with id_linea = " + req.params.id_linea,
            error: error.message,
        });
    }
};
