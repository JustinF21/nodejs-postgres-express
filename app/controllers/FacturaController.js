const db = require('../config/db.config.js');
const Factura = db.Factura;

// Create a new Factura
exports.create = (req, res) => {
    let factura = {};

    try {
        // Building Factura object from request's body
        factura.id_factura = req.body.id_factura;
        factura.no_fact = req.body.no_fact;
        factura.serie = req.body.serie;
        factura.id_cliente = req.body.id_cliente;
        factura.id_empleado = req.body.id_empleado;
        factura.fecha_fac = req.body.fecha_fac;

        // Save to MySQL database
        Factura.create(factura).then(result => {
            res.status(200).json({
                message: "Factura created successfully with id = " + result.id_factura,
                factura: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Get all Facturas
exports.getAll = (req, res) => {
    Factura.findAll()
        .then(facturas => {
            res.status(200).json({
                message: "Retrieved all Facturas successfully!",
                facturas: facturas
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

// Get Factura by ID
exports.getById = (req, res) => {
    let facturaId = req.params.id_factura;

    Factura.findByPk(facturaId)
        .then(factura => {
            if (factura) {
                res.status(200).json({
                    message: "Successfully retrieved Factura with id = " + facturaId,
                    factura: factura
                });
            } else {
                res.status(404).json({
                    message: "Factura not found with id = " + facturaId
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

// Update a Factura by ID
exports.updateById = async (req, res) => {
    try {
        let facturaId = req.params.id_factura;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "Not found: Factura with id = " + facturaId,
                error: "404"
            });
        } else {
            let updatedObject = {
                no_fact: req.body.no_fact,
                serie: req.body.serie,
                id_cliente: req.body.id_cliente,
                id_empleado: req.body.id_empleado,
                fecha_fac: req.body.fecha_fac
            };
            let result = await Factura.update(updatedObject, { returning: true, where: { id_factura: facturaId } });

            if (!result) {
                res.status(500).json({
                    message: "Error: Could not update Factura with id = " + req.params.id_factura,
                    error: "Update failed"
                });
            } else {
                res.status(200).json({
                    message: "Factura updated successfully with id = " + facturaId,
                    factura: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not update Factura with id = " + req.params.id_factura,
            error: error.message
        });
    }
};

// Delete a Factura by ID
exports.deleteById = async (req, res) => {
    try {
        let facturaId = req.params.id_factura;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "Factura not found with id = " + facturaId,
                error: "404",
            });
        } else {
            await factura.destroy();
            res.status(200).json({
                message: "Factura deleted successfully with id = " + facturaId,
                factura: factura,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not delete Factura with id = " + req.params.id_factura,
            error: error.message,
        });
    }
};
