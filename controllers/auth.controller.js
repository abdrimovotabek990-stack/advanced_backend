const authService = require("../server/auth.service")

class AuthController {
    async register(req, res, next) {
        try {
            const { email, password } = req.body
            const data = await authService.register(email, password) 
            res.cookie('token', data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
            
            return res.json({data})
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        }
    }

    async activation(req, res, next) {
        try {
            const userId = req.params.id
            await authService.activation(userId)
            return res.redirect('https://Yuriii.ac')
        } catch (error) {
            console.log(error)
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body
            const data = await authService.login(email, password)
            res.cookie('token', data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
            
            return res.json({data})
        } catch (error) {
            console.log(error)
        }
    }

    async logout(req, res, next){
        try {
            const refreshToken = req.cookies
             const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json({token})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new AuthController