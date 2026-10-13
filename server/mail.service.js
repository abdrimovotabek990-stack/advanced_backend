require("dotenv/config")
const nodemailer = require ("nodemailer")


class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }

    async sendActivationMail(email, activationLink) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Quyidagi link orqali accountni aktivatsiya qiling ${activationLink}`,
            html: `
                <div>
                    <a href="${activationLink}">Aktivatsiya uchun shu yerga bosing</a>
                </div>
                `,
        })
    }

    async sendForgetPasswordMail(email, activationLink) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Forgot password`,
            html: `
                <div>
                    <h1>Time to hacking. If you wnat to recover your account just click the below.<h1>
                    <a href="${activationLink}">Link to recovery account</a>

                    <b>This link will work during 15 minutes</b>
                </div>
                `,
        })
    }


}

module.exports = new MailService()