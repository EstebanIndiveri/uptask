require('dotenv').config()
const dotenv = require('dotenv')
dotenv.config({path: '.env'})

module.exports={
    user: `${process.env.USER_MAIL}`,
    // user: "1abdd1ee324289",
    pass: `${process.env.USER_PASS}`,
    // pass: "745e736fa05400",
    // host: "smtp.mailtrap.io",
    host: `${process.env.USER_HOST}`,

    port: 587,
}