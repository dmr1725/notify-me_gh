const Sequelize = require('sequelize')
const sequelize = require('../config/database')

module.exports = sequelize.define("sales", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    // appointment_id y pid son foreign keys. Estos foreign keys se crearon en phpmyadmin
    appointment_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    pid: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    date:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    // instalation_date:{
    //     type: Sequelize.DATE,
    //     allowNull: true
    // },
    status:{
        type: Sequelize.STRING,
        defaultValue: 'Pending'
    }
})

//crear tabla en la base de datos
// Sale.sync().then(()=>{
//     console.log('table created')
// })
 


// esto se corre en el index
// Sale.create({
//     client_id: 1,
//     user_id: 1,
//     date: '2020-06-29 1:45:00',
// })
