const db = require('../config/db.config.js');
const Usuario = db.Usuario;

// Create a new Usuario
exports.create = (req, res) => {
    let usuario = {};

    try {
        // Building Usuario object from request's body
        usuario.nombre = req.body.nombre;
        usuario.correo = req.body.correo;
        usuario.contraseña = req.body.contraseña; // Assuming it's already hashed before being sent
        usuario.fecha_creacion = req.body.fecha_creacion || new Date();

        // Save to MySQL database
        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario created successfully with id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
};

// Get all Usuarios
exports.getAll = (req, res) => {
    Usuario.findAll()
        .then(usuarios => {
            res.status(200).json({
                message: "Retrieved all Usuarios successfully!",
                usuarios: usuarios
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

// Get Usuario by ID
exports.getById = (req, res) => {
    let usuarioId = req.params.id_usuario;

    Usuario.findByPk(usuarioId)
        .then(usuario => {
            if (usuario) {
                res.status(200).json({
                    message: "Successfully retrieved Usuario with id = " + usuarioId,
                    usuario: usuario
                });
            } else {
                res.status(404).json({
                    message: "Usuario not found with id = " + usuarioId
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

// Update a Usuario by ID
exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id_usuario;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "Not found: Usuario with id = " + usuarioId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                correo: req.body.correo,
                contraseña: req.body.contraseña // Assuming it's already hashed
            };
            let result = await Usuario.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });

            if (!result) {
                res.status(500).json({
                    message: "Error: Could not update Usuario with id = " + req.params.id_usuario,
                    error: "Update failed"
                });
            } else {
                res.status(200).json({
                    message: "Usuario updated successfully with id = " + usuarioId,
                    usuario: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not update Usuario with id = " + req.params.id_usuario,
            error: error.message
        });
    }
};

// Delete a Usuario by ID
exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id_usuario;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "Usuario not found with id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario deleted successfully with id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: Could not delete Usuario with id = " + req.params.id_usuario,
            error: error.message,
        });
    }
};

