module.exports = (sequelize, Sequelize) => {
	const Proyecto = sequelize.define('proyecto', {
		id_proyecto: {
			type: Sequelize.INTEGER,
			autoIncrement: true, // Solo este campo debería ser autoincremental
			primaryKey: true // Especifica que es la clave primaria
		},
		id_usuario: {
			type: Sequelize.INTEGER,
			// No es autoincremental
		},
		nombre: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		descripcion: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		fecha_creacion: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
			allowNull: false
		}
	}, {
		timestamps: false // Si no deseas usar createdAt y updatedAt
	});

	return Proyecto;
};

