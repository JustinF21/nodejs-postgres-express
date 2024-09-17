module.exports = (sequelize, Sequelize) => {
    return sequelize.define('libro', {
        id_libro: {
            type: Sequelize.INTEGER,
            autoIncrement: true
        },
        titulo: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        autor: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        isbn: {
            type: Sequelize.STRING(13),
            allowNull: false,
            unique: true
        },
        editorial: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        anio_publicacion: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        categoria: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        cantidad_disponible: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        ubicacion: {
            type: Sequelize.STRING(255),
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
};
