const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const isSignedIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')
const router = express.Router();

const port = process.env.PORT ? process.env.PORT : '3000'

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.use(passUserToView)


const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/food.js');

const authCtrl = require('./controllers/auth')
const userCtrl = require('./controllers/users')

const Food = require('./models/user.js')

app.get('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-up', authCtrl.addUser)
app.get('/auth/sign-in', authCtrl.signInForm)
app.post('/auth/sign-in', authCtrl.signIn)
app.get('/auth/sign-out', authCtrl.signOut)

app.use(isSignedIn)


app.get('/users/:userId/foods', foodsController.index)


app.get('/users/:userId/foods/new', foodsController.newFood)
app.post('/users/:userId/foods/', foodsController.foodCreate)
app.get('/users/:userId/foods/:foodId', foodsController.show) 
app.delete('/users/:userId/foods/:foodId', foodsController.deleteFood)
app.get('/users/:userId/foods/:foodId/edit', foodsController.edit)
app.put('/users/:userId/foods/:foodId', foodsController.update)
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);


app.listen(port, () => {
    console.log(`The express app is ready on port ${port}`)
})