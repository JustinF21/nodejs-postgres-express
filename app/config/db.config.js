

const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 //para mandar al servidor 
db.Departamento = require('../models/Departamento.js')(sequelize, Sequelize);
db.Repartidor = require('../models/Empleado.model.js')(sequelize, Sequelize);
db.Cliente = require('../models/Cliente.js')(sequelize, Sequelize);
db.Proveedor = require('../models/Proveedor.js')(sequelize, Sequelize);
db.Producto = require('../models/Producto.js')(sequelize, Sequelize);
db.Factura = require('../models/Factura.js')(sequelize, Sequelize);
db.facturaDetalle = require('../models/facturaDetalle.js')(sequelize, Sequelize);
module.exports = db;