const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const customerRoutes = require('./routes/customerRoutes')
const vehicleRoutes = require('./routes/vehicleRoutes')
const serviceRoutes = require('./routes/serviceRoutes')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use(express.static('public'))

app.use('/', [customerRoutes, vehicleRoutes, serviceRoutes])

app.get('/', (req, res) => {
    res.render('home')
})

conn
    .sync()
    .then(() => {
        app.listen(3000)
        console.log('Server ON!')
    })
    .catch((err) => console.log(err))