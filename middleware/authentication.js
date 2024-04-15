import { config } from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { checkuser } from '../models/database.js'

config()

const authenticate = (req, res, next) => {
    let { cookie } = req.headers
    let tokenInHeader = cookie && cookie.split('=')[1]

    if (!tokenInHeader) {
        return res.sendStatus(401)
    }

    jwt.verify(tokenInHeader, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

const auth = async (req, res, next) => {
    const { password, email } = req.body
    const hashedPassword = await checkuser(email)

    bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
            throw err
        }
        if (result === true) {
            const {email}=req.body
            const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' })
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 })

            res.send({
                token: token,
                msg: 'i have logged in!!! YAY!!!',
            })
            next()
        } else {
            res.send({ msg: 'The email or password is incorrect' })
        }
    })
}

export { auth, authenticate }
