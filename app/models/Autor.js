module.exports = (sequelize, Sequelize) => {
	const Autor = sequelize.define('autor', {
		id_autor: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true // Esto asegura que es la clave primaria y auto-incremental
		},
		nombre: {                                                                 
			type: Sequelize.STRING(100),
			allowNull: false
		},
		apellido: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		nacionalidad: {
			type: Sequelize.STRING(50),
			allowNull: false
		},
		fecha_nacimiento: {
			type: Sequelize.DATE,
			allowNull: false
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

	return Autor;
}
