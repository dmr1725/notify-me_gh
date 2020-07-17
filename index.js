// el tutorial que hice de passport fue un blog en medium
// blog: https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314

const express = require('express')
const bodyParser = require('body-parser')
var CronJob = require('cron').CronJob
const asignarCitas = require('./services/asignarCitas')
const nadieDisponible = require('./services/nadieDisponible')
const cors = require('cors')

require('./config/database')




// corre de lunes a viernes, 9:00 AM - 10:00 PM en el minuto 5
// let job = new CronJob('00 23 9-18 * * 1-5 ', asignarCitas)
// job.start()

// let job1 = new CronJob('00 00 23 * * 1-5', nadieDisponible)
// job1.start()


// const Appointment = require('./models/appointments')
// Appointment.create({
//     client_id: 10,
//     user_id: 3,
//     date: '2020-06-29',
//     hour: 4
// })




const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))



app.use(bodyParser.json())

require('./routes/authRoutes')(app)


app.listen(5000, ()=>{
    console.log('running the server')
})
