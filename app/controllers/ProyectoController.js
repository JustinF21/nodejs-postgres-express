const db = require('../config/db.config.js');
const Proyecto = db.Proyecto; // Asegúrate de que este sea el nombre correcto del modelo

// Create a new Proyecto
exports.create = (req, res) => {
    let proyecto = {};

    try {
        // Building Proyecto object from request's body
        proyecto.nombre = req.body.nombre;
        proyecto.descripcion = req.body.descripcion;
        proyecto.id_usuario = req.body.id_usuario; // Asegúrate de que el usuario existe y es válido
        proyecto.fecha_creacion = req.body.fecha_creacion || new Date();

        // Save to MySQL database
        Proyecto.create(proyecto).then(result => {
            res.status(200).json({
                message: "Proyecto created successfully with id = " + result.id_proyecto,
                proyecto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Get all Proyectos
exports.getAll = (req, res) => {
    Proyecto.findAll()
        .then(proyectos => {
            res.status(200).json({
                message: "Retrieved all Proyectos successfully!",
                proyectos: proyectos
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

// Get Proyecto by ID
exports.getById = (req, res) => {
    let proyectoId = req.params.id_proyecto;

    Proyecto.findByPk(proyectoId)
        .then(proyecto => {
            if (proyecto) {
                res.status(200).json({
                    message: "Successfully retrieved Proyecto with id = " + proyectoId,
                    proyecto: proyecto
                });
            } else {
                res.status(404).json({
                    message: "Proyecto not found with id = " + proyectoId
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

// Update a Proyecto by ID
exports.updateById = async (req, res) => {
    try {
        let proyectoId = req.params.id_proyecto;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "Not found: Proyecto with id = " + proyectoId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                id_usuario: req.body.id_usuario // Asegúrate de que el usuario existe
            };
            let result = await Proyecto.update(updatedObject, { returning: true, where: { id_proyecto: proyectoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error: Could not update Proyecto with id = " + req.params.id_proyecto,
                    error: "Update failed"
                });
            } else {
                res.status(200).json({
                    message: "Proyecto updated successfully with id = " + proyectoId,
                    proyecto: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not update Proyecto with id = " + req.params.id_proyecto,
            error: error.message
        });
    }
};

// Delete a Proyecto by ID
exports.deleteById = async (req, res) => {
    try {
        let proyectoId = req.params.id_proyecto;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "Proyecto not found with id = " + proyectoId,
                error: "404",
            });
        } else {
            await proyecto.destroy();
            res.status(200).json({
                message: "Proyecto deleted successfully with id = " + proyectoId,
                proyecto: proyecto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not delete Proyecto with id = " + req.params.id_proyecto,
            error: error.message,
        });
    }
};
