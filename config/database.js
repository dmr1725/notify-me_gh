const Sequelize = require('sequelize')
const sequelize = new Sequelize('rainsoftdb', 'root', '',{
    host: 'localhost',
    dialect: 'mysql', 
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
})

module.exports = sequelize
// se corre en el index
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


