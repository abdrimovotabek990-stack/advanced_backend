const UserDto = require("../dtos/user.dto")
const userModel = require("../models/user.model")
const bcrypt = require('bcrypt')
const tokenService = require("./token.service")
const mailService = require("./mail.service")


class AuthService {
    async register(email, password) {
        const existUser = await userModel.findOne({ email })

        if(existUser) {
            throw new Error(`Bu email: ${email} dan allaqachon register qilingan`)
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({email, password: hashPassword})
        const userDto = new UserDto(user)

        await mailService.sendMail(email, `${process.env.API_URL}/api/auth/activation/${userDto.id}`)

        const tokens = tokenService.generateToken({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {user: userDto, ...tokens}
    }


    async activation(userId){
        const user = await userModel.findById(userId)
        if(!user) {
            throw new Error('User topilmadi')
        }

        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await userModel.findOne({email})

        if(!user) {
            throw new Error("Foydalanuvchi topilmadi")
        }

        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword){
            throw new Error("Parol xato")
        }

        const userDto = new UserDto(user)

        const tokens = tokenService.generateToken({...userDto})

        await tokenService.saveToken(userDto.id, tokenService.refreshToken)

        return {user: userDto, ...tokens}
    }
} 


module.exports = new AuthService()
