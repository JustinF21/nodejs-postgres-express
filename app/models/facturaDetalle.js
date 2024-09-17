module.exports = (sequelize, Sequelize) => {
    return sequelize.define('facturaDetalle', {
        id_factura: {
            type: Sequelize.NUMERIC
        },
        id_linea: {
            type: Sequelize.NUMERIC
        },
        id_producto: {
            type: Sequelize.NUMERIC
        },
        cantidad: {
            type: Sequelize.NUMERIC
        }
    });
}
