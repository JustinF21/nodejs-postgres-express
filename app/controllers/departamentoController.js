const db = require('../config/db.config.js');
const Departamento = db.Departamento;

// Create a new Departamento
exports.create = (req, res) => {
    let departamento = {};

    try {
        // Building Departamento object from request's body
        departamento.id_departamento = req.body.id_departamento;
        departamento.descripcion = req.body.descripcion;

        // Save to MySQL database
        Departamento.create(departamento).then(result => {
            res.status(200).json({
                message: "Departamento created successfully with id = " + result.id_departamento,
                departamento: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Get all Departamentos
exports.getAll = (req, res) => {
    Departamento.findAll()
        .then(departamentos => {
            res.status(200).json({
                message: "Retrieved all Departamentos successfully!",
                departamentos: departamentos
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

// Get Departamento by ID
exports.getById = (req, res) => {
    let departamentoId = req.params.id_departamento;

    Departamento.findByPk(departamentoId)
        .then(departamento => {
            if (departamento) {
                res.status(200).json({
                    message: "Successfully retrieved Departamento with id = " + departamentoId,
                    departamento: departamento
                });
            } else {
                res.status(404).json({
                    message: "Departamento not found with id = " + departamentoId
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

// Update a Departamento by ID
exports.updateById = async (req, res) => {
    try {
        let departamentoId = req.params.id_departamento;
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "Not found: Departamento with id = " + departamentoId,
                error: "404"
            });
        } else {
            let updatedObject = {
                descripcion: req.body.descripcion
            };
            let result = await Departamento.update(updatedObject, { returning: true, where: { id_departamento: departamentoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error: Could not update Departamento with id = " + req.params.id_departamento,
                    error: "Update failed"
                });
            } else {
                res.status(200).json({
                    message: "Departamento updated successfully with id = " + departamentoId,
                    departamento: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not update Departamento with id = " + req.params.id_departamento,
            error: error.message
        });
    }
};

// Delete a Departamento by ID
exports.deleteById = async (req, res) => {
    try {
        let departamentoId = req.params.id_departamento;
        let departamento = await Departamento.findByPk(departamentoId);

        if (!departamento) {
            res.status(404).json({
                message: "Departamento not found with id = " + departamentoId,
                error: "404",
            });
        } else {
            await departamento.destroy();
            res.status(200).json({
                message: "Departamento deleted successfully with id = " + departamentoId,
                departamento: departamento,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not delete Departamento with id = " + req.params.id_departamento,
            error: error.message,
        });
    }
};
