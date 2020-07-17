const Sequelize = require('sequelize')
const sequelize = require('../config/database')

module.exports = sequelize.define("users", {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number:{
        type: Sequelize.STRING,
        allowNull: false
    },
    role:{
        type: Sequelize.STRING,
        defaultValue: 'regular'
    },
    available:{
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    closing_rate: {
        type: Sequelize.DECIMAL(6,2),
        defaultValue: 0
    }
})

//crear tabla en la base de datos
// User.sync().then(()=>{
//     console.log('table created')
// })


// module.exports = User



// esto se corre en el index
// User.create({
//     name: 'Diego',
//     last_name: 'Mendez',
//     email: 'diegozmendez@gmail.com',
//     password: 'Diego1999$',
//     phone_number: '787-605-9719',
//     role: 'regular',
//     available: 0
// })
