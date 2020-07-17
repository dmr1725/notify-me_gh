require('dotenv').config()
const User = require('../models/users')
const {getDate, getHour, oneHourFromNow} = require('../time/dateAndHours')
const sequelize = require('../config/database')
const twilio = require('twilio')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
let sendMsg = new twilio(accountSid, authToken)


const asignarCitas = async () =>{
    const today = getDate()
    const hour = getHour()
    const oneHour = oneHourFromNow(hour)

    let order = ''
    let len = 0

    if(hour === 12 || hour === 3){
        // de menor a mayor
        order = 'ASC'
    }
    else{
        // de mayor a menor
        order = 'DESC'
    }

    // get available users with their email, phone number and closing_rate
    // email for identification
    // phone_number for sending the appointments by message
    // closing_rate: order availableUsers by closing_rate. The highest closing_rate gets the first appointment and so on
    let availableUsers = await User.findAll({
        attributes: ['id','name','email', 'phone_number'],
        where: {
            available: 1
        },
        order: [
            ['closing_rate', `${order}`]
        ]
    })

    // console.log(availableUsers)

    // clients with appointment without user
    let clientsApp = await sequelize.query(
        `SELECT id, name, last_name, phone_number, city, zip_code from clients where id in (SELECT client_id from appointments where date='${today}' and hour=${oneHour} and user_id=1)`,
        {type: sequelize.QueryTypes.SELECT}
    )

    // console.log(clientsApp)
  

    if(!availableUsers || !clientsApp){
        return 
    } 

    if(availableUsers.length <= clientsApp.length){
        len = availableUsers.length
    }

    else{
        len = clientsApp.length
    }

    // console.log(clientsApp[0].id)

    // asignando citas
    for(let i = 0; i < len; i++){
        let user_id = availableUsers[i].dataValues.id 
        let user_phone = availableUsers[i].dataValues.phone_number
        let user_name = availableUsers[i].dataValues.name


        let client_id = clientsApp[i].id 
        let client_name = clientsApp[i].name 
        let client_lname = clientsApp[i].last_name
        let client_phone = clientsApp[i].phone_number
        let client_city = clientsApp[i].city 
        let client_zip = clientsApp[i].zip_code


        await sequelize.query(
            `UPDATE appointments
             set user_id=${user_id}
             where client_id=${client_id} and user_id=1`
        )
        
       
        sendMsg.messages.create({
            body: `${user_name}, tienes cita a las ${oneHour}. Cliente se llama ${client_name} ${client_lname}. Número de teléfono: ${client_phone}. Dirección: ${client_city}, ${client_zip}`,
            to: `'${user_phone}'`,
            from: '17039726896'
        }).then((message)=>{
            console.log(message.sid)
        })

        // los users que tienen citas, ponerlos "no disponibles"
        await sequelize.query(
            `UPDATE users 
             set available=0
             where id=${user_id}`
        )
    }

   
}

module.exports = asignarCitas