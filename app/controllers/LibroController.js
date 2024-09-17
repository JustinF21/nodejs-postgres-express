const db = require('../config/db.config.js');
const Libro = db.Libro;

// Create a new Libro
exports.create = (req, res) => {
    let libro = {};

    try {
        // Building Libro object from request's body
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.isbn = req.body.isbn;
        libro.editorial = req.body.editorial;
        libro.anio_publicacion = req.body.anio_publicacion;
        libro.categoria = req.body.categoria;
        libro.cantidad_disponible = req.body.cantidad_disponible || 0;
        libro.ubicacion = req.body.ubicacion;

        // Save to MySQL database
        Libro.create(libro).then(result => {
            res.status(200).json({
                message: "Libro created successfully with id = " + result.id_libro,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Get all Libros
exports.getAll = (req, res) => {
    Libro.findAll()
        .then(libros => {
            res.status(200).json({
                message: "Retrieved all Libros successfully!",
                libros: libros
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

// Get Libro by ID
exports.getById = (req, res) => {
    let libroId = req.params.id_libro;

    Libro.findByPk(libroId)
        .then(libro => {
            if (libro) {
                res.status(200).json({
                    message: "Successfully retrieved Libro with id = " + libroId,
                    libro: libro
                });
            } else {
                res.status(404).json({
                    message: "Libro not found with id = " + libroId
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

// Update a Libro by ID
exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id_libro;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "Not found: Libro with id = " + libroId,
                error: "404"
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,
                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_disponible: req.body.cantidad_disponible,
                ubicacion: req.body.ubicacion
            };
            let result = await Libro.update(updatedObject, { returning: true, where: { id_libro: libroId } });

            if (!result) {
                res.status(500).json({
                    message: "Error: Could not update Libro with id = " + req.params.id_libro,
                    error: "Update failed"
                });
            } else {
                res.status(200).json({
                    message: "Libro updated successfully with id = " + libroId,
                    libro: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not update Libro with id = " + req.params.id_libro,
            error: error.message
        });
    }
};

// Delete a Libro by ID
exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id_libro;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "Libro not found with id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro deleted successfully with id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not delete Libro with id = " + req.params.id_libro,
            error: error.message,
        });
    }
};
