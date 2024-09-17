const db = require('../config/db.config.js');
const Autor = db.Autor;

// Create a new Autor
exports.create = (req, res) => {
    let autor = {};

    try {
        // Building Autor object from request's body
        autor.nombre = req.body.nombre;
        autor.apellido = req.body.apellido;
        autor.nacionalidad = req.body.nacionalidad;
        autor.fecha_nacimiento = req.body.fecha_nacimiento || new Date();

        // Save to MySQL database
        Autor.create(autor).then(result => {
            res.status(200).json({
                message: "Autor created successfully with id = " + result.id_autor,
                autor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Get all Autores
exports.getAll = (req, res) => {
    Autor.findAll()
        .then(autores => {
            res.status(200).json({
                message: "Retrieved all Autores successfully!",
                autores: autores
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

// Get Autor by ID
exports.getById = (req, res) => {
    let autorId = req.params.id_autor;

    Autor.findByPk(autorId)
        .then(autor => {
            if (autor) {
                res.status(200).json({
                    message: "Successfully retrieved Autor with id = " + autorId,
                    autor: autor
                });
            } else {
                res.status(404).json({
                    message: "Autor not found with id = " + autorId
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

// Update an Autor by ID
exports.updateById = async (req, res) => {
    try {
        let autorId = req.params.id_autor;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "Not found: Autor with id = " + autorId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacionalidad: req.body.nacionalidad,
                fecha_nacimiento: req.body.fecha_nacimiento
            };
            let result = await Autor.update(updatedObject, { returning: true, where: { id_autor: autorId } });

            if (!result[0]) {
                res.status(500).json({
                    message: "Error: Could not update Autor with id = " + req.params.id_autor,
                    error: "Update failed"
                });
            } else {
                res.status(200).json({
                    message: "Autor updated successfully with id = " + autorId,
                    autor: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not update Autor with id = " + req.params.id_autor,
            error: error.message
        });
    }
};

// Delete an Autor by ID
exports.deleteById = async (req, res) => {
    try {
        let autorId = req.params.id_autor;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "Autor not found with id = " + autorId,
                error: "404",
            });
        } else {
            await autor.destroy();
            res.status(200).json({
                message: "Autor deleted successfully with id = " + autorId,
                autor: autor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not delete Autor with id = " + req.params.id_autor,
            error: error.message,
        });
    }
};
