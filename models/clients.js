const Sequelize = require('sequelize')
const sequelize = require('../config/database')

module.exports = sequelize.define("clients", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number:{
        type: Sequelize.STRING,
        allowNull: false
    },
    city:{
        type: Sequelize.STRING,
        defaultValue: 'regular'
    },
    zip_code:{
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    }
})

//crear tabla en la base de datos
// Client.sync().then(()=>{
//     console.log('table created')
// })
 


// esto se corre en el index
// Client.create({
//     name: 'Orlando',
//     last_name: 'Marquez',
//     phone_number: '787-605-9719',
//     city: 'Trujillo Alto',
//     zip_code: '00976'
// })
