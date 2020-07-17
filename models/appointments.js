const Sequelize = require('sequelize')
const sequelize = require('../config/database')

module.exports = sequelize.define("appointments", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    // client_id y user_id son foreign keys. Estos foreign keys se crearon en phpmyadmin
    client_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        // dummy user tiene id 1. Todas las citas tendran este defaultValue. Pero si tienen ese default value significa que hay que asignarle 
        // una cita a un usuario
        defaultValue: 1
    },
    date:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    hour: {
        type: Sequelize.INTEGER(3),
        allowNull: false
    },
    completed:{
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    }
})

//crear tabla en la base de datos
// Appointment.sync().then(()=>{
//     console.log('table created')
// })
 


// esto se corre en el index
// Appointment.create({
//     client_id: 3,
//     date: '2020-06-26',
//     hour: 1
// })

