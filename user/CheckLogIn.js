
const jwt = require('jsonwebtoken')
const checkLogIn = (async (req, res, next) => {
    try {
        const { authorization } = req.headers

        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const { name } = decoded;
        req.name = name
        next()

    }
    catch (err) {
        console.log(err.message)
    }

})

module.exports = checkLogIn;