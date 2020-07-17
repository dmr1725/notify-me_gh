const Sequelize = require('sequelize')
const sequelize = require('../config/database')

module.exports = sequelize.define("products", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    // client_id y user_id son foreign keys. Estos foreign keys se crearon en phpmyadmin
    pname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: false
    }
})

//crear tabla en la base de datos
// Product.sync().then(()=>{
//     console.log('table created')
// })
 


// esto se corre en el index
// Product.create({
//     pname: 'RO COMBO EC5',
//     price: 4999.99,
// })
