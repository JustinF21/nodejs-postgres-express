module.exports = (sequelize, Sequelize) => {
	const Empleado = sequelize.define('empleado', {
		id_empleado: {
			type: Sequelize.INTEGER, 
			autoIncrement: true, 
			primaryKey: true
		},
		primer_nombre: {
			type: Sequelize.STRING(100)
		},
		segundo_nombre: {
			type: Sequelize.STRING(100)
		},
		primer_apellido: {
			type: Sequelize.STRING(100)
		},
		segundo_apellido: {
			type: Sequelize.STRING(100)
		},
		nit: {
			type: Sequelize.STRING(10)
		},
		salario: {
			type: Sequelize.DECIMAL
		},
		estatus: {
			type: Sequelize.DECIMAL
		},
		id_departamento: {
			type: Sequelize.DECIMAL
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

	return Empleado;
}
