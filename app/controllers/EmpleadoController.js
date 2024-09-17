const db = require('../config/db.config.js');
const Empleado = db.Empleado;

// Create a new Empleado
exports.create = (req, res) => {
    let empleado = {};

    try {
        // Assigning values from the request body to the empleado object
        empleado.id_empleado = req.body.id_empleado;
        empleado.primer_nombre = req.body.primer_nombre;
        empleado.segundo_nombre = req.body.segundo_nombre;
        empleado.primer_apellido = req.body.primer_apellido;
        empleado.segundo_apellido = req.body.segundo_apellido;
        empleado.nit = req.body.nit;
        empleado.salario = req.body.salario;
        empleado.estatus = req.body.estatus;
        empleado.id_departamento = req.body.id_departamento;

        // Create a new Empleado record
        Empleado.create(empleado).then(result => {
            res.status(200).json({
                message: "Upload Successfully an Empleado with id = " + result.id_empleado,
                empleado: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

// Retrieve all Empleados
exports.getAll = (req, res) => {
    Empleado.findAll()
        .then(empleadoInfos => {
            res.status(200).json({
                message: "Get all Empleados' Infos Successfully!",
                empleados: empleadoInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

// Retrieve an Empleado by ID
exports.getById = (req, res) => {
    let empleadoId = req.params.id;
    Empleado.findByPk(empleadoId)
        .then(empleado => {
            if (!empleado) {
                return res.status(404).json({
                    message: "Empleado not found with id = " + empleadoId,
                    empleado: null
                });
            }
            res.status(200).json({
                message: "Successfully Get an Empleado with id = " + empleadoId,
                empleado: empleado
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

// Update an Empleado by ID
exports.updateById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "Not Found for updating an Empleado with id = " + empleadoId,
                empleado: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                primer_nombre: req.body.primer_nombre,
                segundo_nombre: req.body.segundo_nombre,
                primer_apellido: req.body.primer_apellido,
                segundo_apellido: req.body.segundo_apellido,
                nit: req.body.nit,
                salario: req.body.salario,
                estatus: req.body.estatus,
                id_departamento: req.body.id_departamento
            }
            let result = await Empleado.update(updatedObject, { returning: true, where: { id_empleado: empleadoId } });

            if (result[0] === 0) { // result[0] is the number of affected rows
                return res.status(500).json({
                    message: "Error -> Can not update an Empleado with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully an Empleado with id = " + empleadoId,
                empleado: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update an Empleado with id = " + req.params.id,
            error: error.message
        });
    }
}

// Delete an Empleado by ID
exports.deleteById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "Does Not exist an Empleado with id = " + empleadoId,
                error: "404",
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Delete Successfully an Empleado with id = " + empleadoId,
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete an Empleado with id = " + req.params.id,
            error: error.message,
        });
    }
}
