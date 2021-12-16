// ************ Require's ************
const createError = require('http-errors');
//const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const cookies = require("cookie-parser");

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
//app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE



//*****Session ****///
app.use(session({
  secret: "Secreto",
  resave: false,
  saveUninitialized: false,
}));

// Middlewares
app.use(cookies());
const userLoggedMiddleware = require("./src/middlewares/userLoggedMiddleware")
app.use(userLoggedMiddleware);



const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.set("view engine", "ejs");
app.set("views", "views");


app.listen(process.env.PORT || 3000, function () {
  console.log("TODO FUNCIONAAAAAAAAAA 3000");
})


const mainRoutes = require("./src/routes/mainRoutes");
const productsRoutes = require('./src/routes/productsRoutes');
const userRoutes = require("./src/routes/userRoutes")

app.use("/", mainRoutes);
app.use('/products', productsRoutes);
app.use("/user", userRoutes)




// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
