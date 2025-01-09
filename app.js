const express = require("express")
const app = express();
const port = 3008;
const router = require('./routers/index')
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'rahasiaaa dong huhuhuu', //this is important dude
    resave: false, // if there is no change in the session, don't save it or otherwise
    saveUninitialized: false,  
    cookie: { 
        secure: false,
        sameSite: true, // add for security from csrf attack
     } //for https
}))

app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

