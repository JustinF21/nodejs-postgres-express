module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define('usuario', {
		id_usuario: {
			type: Sequelize.INTEGER
		},
		nombre: {
			type: Sequelize.STRING(100)
		},
		apellido: {
			type: Sequelize.STRING(100)
		},
		email: {
			type: Sequelize.STRING(100),
			allowNull: false,
			unique: true
		},
		telefono: {
			type: Sequelize.STRING(15)
		},
		direccion: {
			type: Sequelize.STRING(255)
		},
		fecha_registro: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
			allowNull: false
		},
		estado: {
			type: Sequelize.ENUM('activo', 'inactivo', 'suspendido'),
			defaultValue: 'activo'
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
			allowNull: false
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
			allowNull: false
		}
	});

	return Usuario;
}
