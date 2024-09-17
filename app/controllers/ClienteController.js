const db = require('../config/db.config.js');
const Cliente = db.Cliente;

// Create a new Cliente
exports.create = (req, res) => {
    let cliente = {};

    try {
        cliente.id_cliente = req.body.id_cliente;
        cliente.nombre = req.body.nombre;
        cliente.apellido = req.body.apellido;
        cliente.razon_social = req.body.razon_social;
        cliente.nit = req.body.nit;
        cliente.direccion = req.body.direccion;
        cliente.telefono = req.body.telefono;
        cliente.email = req.body.email;
        cliente.fecha_ingreso = req.body.fecha_ingreso;
        cliente.estatus = req.body.estatus;

        // Save to MySQL database
        Cliente.create(cliente).then(result => {
            res.status(200).json({
                message: "Cliente created successfully with id = " + result.id_cliente,
                cliente: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Get all Clientes
exports.getAll = (req, res) => {
    Cliente.findAll()
        .then(clientes => {
            res.status(200).json({
                message: "Retrieved all Clientes successfully!",
                clientes: clientes
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

// Get Cliente by ID
exports.getById = (req, res) => {
    let clienteId = req.params.id_cliente;

    Cliente.findByPk(clienteId)
        .then(cliente => {
            if (cliente) {
                res.status(200).json({
                    message: "Successfully retrieved Cliente with id = " + clienteId,
                    cliente: cliente
                });
            } else {
                res.status(404).json({
                    message: "Cliente not found with id = " + clienteId
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

// Update a Cliente by ID
exports.updateById = async (req, res) => {
    try {
        let clienteId = req.params.id_cliente;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "Not found: Cliente with id = " + clienteId,
                error: "404"
            });
        } else {
            let updatedObject = {
                descripcion: req.body.descripcion
            };
            let result = await Cliente.update(updatedObject, { returning: true, where: { id_cliente: clienteId } });

            if (!result) {
                res.status(500).json({
                    message: "Error: Could not update Cliente with id = " + req.params.id_cliente,
                    error: "Update failed"
                });
            } else {
                res.status(200).json({
                    message: "Cliente updated successfully with id = " + clienteId,
                    cliente: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not update Cliente with id = " + req.params.id_cliente,
            error: error.message
        });
    }
};

// Delete a Cliente by ID
exports.deleteById = async (req, res) => {
    try {
        let clienteId = req.params.id_cliente;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "Cliente not found with id = " + clienteId,
                error: "404",
            });
        } else {
            await cliente.destroy();
            res.status(200).json({
                message: "Cliente deleted successfully with id = " + clienteId,
                cliente: cliente,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not delete Cliente with id = " + req.params.id_cliente,
            error: error.message,
        });
    }
};
