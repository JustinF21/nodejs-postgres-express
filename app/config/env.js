const env = {
    database : 'antigua_umg2024_542_nut1',
    username : 'antigua_umg2024_542_nut1_user',
    password : 'ut1PQfw0rIgpaFFyPImZXaeBvDaWppyz',
    host : 'dpg-crke7s9u0jms73bkmgsg-a.oregon-postgres.render.com',
    port:'5432',
    dialect : 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    

    }
}
module.exports = env;