module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define('usuario', {
		id_usuario: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true // Set as the primary key
		},
		nombre: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		correo: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		contraseña: {
			type: Sequelize.STRING(255),
			allowNull: false // Contraseña encriptada
		},
		fecha_creacion: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
			allowNull: false
		}
	}, {
		timestamps: false // Opción para eliminar el manejo automático de timestamps
	});

	return Usuario;
};
