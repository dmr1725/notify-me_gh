const sequelize = require('../config/database')

const nadieDisponible = ()=>{
    sequelize.query(
        `update users set available = 0`
    )
}

module.exports = nadieDisponible