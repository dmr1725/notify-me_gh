const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const sequelize = require('../config/database')
const User = require('../models/users')
const Appointment = require('../models/appointments')
const Sale = require('../models/sales')
const auth = require('../middleware/auth')
const {getDate, getHour, oneHourFromNow} = require('../time/dateAndHours')


module.exports = (app)=>{
    /////////////////////////////////////////////////////////////
    app.post('/api/register', async(req, res)=>{

        const email = req.body.email 

        if(!validator.isEmail(email)){
            return res.send('Your email is not valid').status(400)
        }

        const findEmail = await User.findOne({
            where: {
                email: email
            }
        })

        if(findEmail){
            return res.send('You have registered with this email').status(400)
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 8)

        const user = await User.create({
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            phone_number: req.body.phone_number
        })

        const token = jwt.sign({user}, 'secretkey', {expiresIn: '1m'})


        res.send({
            user,
            token,
            msg: 'Registered successfully'
        })
    })

    /////////////////////////////////////////////////////////////
    app.post('/api/user/login', async(req, res)=>{
        // unhashed password 
        const unhashedPassword = req.body.password
        console.log(req.body.email)
        // hashed password from the table users
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!user){
            return res.send({message: 'Unable to log in'}).status(400)
        }


        const isMatch = await bcrypt.compare(unhashedPassword, user.password)

        if(!isMatch){
            return res.send({message: 'Unable to log in'}).status(400)
        }

        
        const token = jwt.sign({user}, 'secretkey', {expiresIn: '5m'})

        // const decodedToken = jwt.verify(token, 'secretkey')

        res.send({
            user: user,
            // name: user.name,
            token: token,
            // decodedToken: decodedToken,
            message: 'logged in'
        })
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/profile', auth,  async(req, res)=>{
        res.send({
            user: req.decodedToken
           
        })
    })

    app.get('/api/user/available', auth, async(req, res)=>{
        const user = await sequelize.query(
            `select available from users where email='${req.decodedToken.email}'`,
            {type: sequelize.QueryTypes.SELECT}
        )
        res.send(user)
    })

    /////////////////////////////////////////////////////////////
    app.patch('/api/user/disponiblidad', auth, async(req, res)=>{
        const user = await User.update(
            {available: 1},
            {where: {
                email: req.decodedToken.email
            }}
        )

        res.send({
            message: 'disponible',
            val: 1
        })
    })

    /////////////////////////////////////////////////////////////
    app.patch('/api/user/no_disponible', auth, async(req, res)=>{
        const user = await User.update(
            {available: 0},
            {where: {
                email: req.decodedToken.email
            }}
        )

        res.send({
            message: 'no disponible',
            val: 0
        })
    })

    /////////////////////////////////////////////////////////////
    app.patch('/api/user/demo_given', auth, async(req, res)=>{
        const user = await User.findOne(
            {where: {
                id: req.decodedToken.id
            }}
        )
        const appointment = await Appointment.findOne({
            where: {
                id: req.body.id,
                client_id: req.body.client_id,
                user_id: user.id
            }}
        )
       
        if(!appointment){
            res.send('Appointment not found').status(400)
        }

        // 1 = given demo
        await Appointment.update(
            {completed: 1},
            {where: {
                id: req.body.id,
                client_id: req.body.client_id,
                user_id: user.id
            }}
        )

         // vamos a darle update al closing rate
        // estos son la cantidad de appointments que los users han dado
        let userCountByAppointments = await Appointment.count({
            where: {
                user_id: req.decodedToken.id,
                completed: 1
            }
        })

        

        // estos son la cantidad de sales que los users han hecho
        let userCountBySales = await sequelize.query(
            `select appointment_id from sales where appointment_id in ( select id from appointments where user_id = ${req.decodedToken.id})`,
            {type: sequelize.QueryTypes.SELECT}
        )
        // buscando el length de este array es el count
        userCountBySales = userCountBySales.length
        
        let closing_rate = userCountBySales / userCountByAppointments
        console.log(closing_rate)

        await User.update(
            {closing_rate: `${closing_rate}`},
            {where: {
                id: req.decodedToken.id
            }}
            
        )
        
        res.send({message: 'Appointment Completed'}).status(200)
    })

    /////////////////////////////////////////////////////////////
    app.post('/api/user/make_sale', auth, async(req, res)=>{
        // solo puede haber venta si la demo se hizo
        const appointment_done = await Appointment.findOne({
            where: {
                id: req.body.appointment_id,
                completed: 1
            }
        })

        if(!appointment_done){
            return res.send({message: 'Appointment not found'}).status(400)
        }

        await Sale.create({
            appointment_id: req.body.appointment_id,
            pid: req.body.pid,
            date: req.body.date
        })

        // vamos a darle update al closing rate
        // estos son la cantidad de appointments que los users han dado
        let userCountByAppointments = await Appointment.count({
            where: {
                user_id: req.decodedToken.id,
                completed: 1
            }
        })

        

        // estos son la cantidad de sales que los users han hecho
        let userCountBySales = await sequelize.query(
            `select appointment_id from sales where appointment_id in ( select id from appointments where user_id = ${req.decodedToken.id})`,
            {type: sequelize.QueryTypes.SELECT}
        )
        // buscando el length de este array es el count
        userCountBySales = userCountBySales.length
        
        let closing_rate = userCountBySales / userCountByAppointments
        console.log(closing_rate)

        await User.update(
            {closing_rate: `${closing_rate}`},
            {where: {
                id: req.decodedToken.id
            }}
        )

        res.send({message: 'Sale was made!'}).status(200)
    })

    /////////////////////////////////////////////////////////////
    app.delete('/api/user/delete_sale', auth, async(req, res)=>{
         const toBeDeletedSale = await Sale.findOne({
             where:{
                 id: req.body.id,
                //  appointment_id: req.body.appointment_id,
                 status: 'Pending'
             }
         })

         if(!toBeDeletedSale){
             return res.send({message: 'Sale not found'}).status(400)
         }

         await toBeDeletedSale.destroy()


           // vamos a darle update al closing rate
        // estos son la cantidad de appointments que los users han dado
        let userCountByAppointments = await Appointment.count({
            where: {
                user_id: req.decodedToken.id,
                completed: 1
            }
        })

        

        // estos son la cantidad de sales que los users han hecho
        let userCountBySales = await sequelize.query(
            `select appointment_id from sales where appointment_id in ( select id from appointments where user_id = ${req.decodedToken.id})`,
            {type: sequelize.QueryTypes.SELECT}
        )
        // buscando el length de este array es el count
        userCountBySales = userCountBySales.length
        
        let closing_rate = userCountBySales / userCountByAppointments
        console.log(closing_rate)

        await User.update(
            {closing_rate: `${closing_rate}`},
            {where: {
                id: req.decodedToken.id
            }}
        )
        
        res.send('Sale was deleted').status(200)
    })

    /////////////////////////////////////////////////////////////
    // este son los appointments de hoy
    app.get('/api/user/appointments_today', auth, async(req, res)=>{
        const hour = getHour()
        const date = getDate()
        const user = req.decodedToken.id
        const appointment = await sequelize.query(
            `select a.id, a.client_id, c.name, c.last_name, a.date, a.hour from appointments a 
            inner join clients c on c.id = a.client_id where a.user_id = ${user} and a.date='${date}' 
            and a.completed=0 and a.id not in (select appointment_id from sales)
            `,
            {type: sequelize.QueryTypes.SELECT}
        )

        if(!appointment){
            return res.send('Appointment not found for user').status(404)
        }

        res.send(appointment).status(200)
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/appointments_not_given', auth, async(req, res)=>{
        const user = req.decodedToken.id 
        const appointments = await sequelize.query(
            `select a.id, c.name, c.last_name, a.date, a.hour from appointments a inner join clients c on c.id = a.client_id where a.user_id = ${user} and a.completed=0 `,
            {type: sequelize.QueryTypes.SELECT}
        )

        if(!appointments){
            return res.send('Appointment not found for user').status(404)
        }

        res.send(appointments).status(200)
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/appointments_given_not_sales', auth, async(req, res)=>{
        const user = req.decodedToken.id 
        const appointments = await sequelize.query(
            `select a.id, c.name, c.last_name, a.date, a.hour from appointments a inner join clients c on c.id = a.client_id where a.user_id = ${user} and a.completed=1 and a.id not in (select s.appointment_id from sales s) `,
            {type: sequelize.QueryTypes.SELECT}
        )

        if(!appointments){
            return res.send({message: 'Appointments not found for user'}).status(404)
        }

        res.send(appointments).status(200)
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/allSales', auth, async(req, res)=>{
        const user = req.decodedToken.id   
        const sales = await sequelize.query(
            `select s.id, c.name, c.last_name, p.pname, s.date, s.status, p.price from sales s inner join appointments a on a.id = s.appointment_id inner join clients c on c.id = a.client_id inner join products p on p.id = s.pid where a.user_id = ${user}`,
            {type: sequelize.QueryTypes.SELECT}
        )

        if(!sales){
            return res.send('Sales not found for user').status(404)
        }

        res.send(sales).status(200)
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/appointments_assigned_quantity', auth, async(req, res)=>{
        const appointmentsAssigned = await Appointment.count({
            where:{
                user_id: req.decodedToken.id
            }
        })

        console.log(appointmentsAssigned)

        if(appointmentsAssigned === 0){
            return res.send('Appointments not found').status(404)
        }

        // no puedes res.send() numeric values
        res.send(String(appointmentsAssigned)).status(200)
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/appointments_given_quantity', auth, async(req, res)=>{
        const appointmentsGiven = await Appointment.count({
            where:{
                user_id: req.decodedToken.id,
                completed: 1
            }
        })

        console.log(appointmentsGiven)

        if(appointmentsGiven === 0){
            return res.send('Appointments not found').status(404)
          
        }

        // no puedes res.send() numeric values
        res.send(String(appointmentsGiven)).status(200)
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/sales_quantity', auth, async(req, res)=>{
        const user = req.decodedToken.id
        const sales_quantity = await sequelize.query(
            `select * from appointments where user_id=${user} and id in (select appointment_id from sales)`,
            {type: sequelize.QueryTypes.SELECT}
        )

        if(!sales_quantity){
            return res.send('Sales not found').status(404)
        }

        res.send(String(sales_quantity.length)).status(200)
    })

     /////////////////////////////////////////////////////////////
    app.get('/api/user/last5_sales', auth, async(req, res)=>{
        const user = req.decodedToken.id   
        const sales = await sequelize.query(
            `select c.name, c.last_name, p.pname, s.date, s.status, p.price from sales s inner join appointments a on a.id = s.appointment_id inner join clients c on c.id = a.client_id inner join products p on p.id = s.pid where a.user_id = ${user} order by s.id DESC LIMIT 3`,
            {type: sequelize.QueryTypes.SELECT}
        )

        if(!sales){
            return res.send('Sales not found for user').status(404)
        }

        res.send(sales).status(200)
    })

    /////////////////////////////////////////////////////////////
    // estas son las demos que no se dieron, pero contactaste al cliente para coordinar la cita para otra fecha
    app.patch('/api/user/update_date_appointment', auth, async(req, res)=>{
        const appointment = await Appointment.findOne({
            where: {
                id: req.body.id,
                user_id: req.decodedToken.id, 
                completed: 0
            }
        })

        if(!appointment){
            return res.send({message: 'Appointment not found'}).status(404)
        }

        await Appointment.update(
            {date: req.body.date, hour: req.body.hour},
            {where: {
                id: req.body.id, 
                user_id: req.decodedToken.id
            }}
        )

        res.send({
            hour: req.body.hour,
            date: req.body.date,
            message: 'Appointment updated'
        }).status(200)
    })



}
