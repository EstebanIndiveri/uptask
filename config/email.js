require('dotenv').config()
const dotenv = require('dotenv')
dotenv.config({path: '.env'})

module.exports={
    user: `${process.env.USER_MAIL}`,
    pass: `${process.env.USER_PASS}`,
    host: `${process.env.USER_HOST}`,

    port: 587,
}