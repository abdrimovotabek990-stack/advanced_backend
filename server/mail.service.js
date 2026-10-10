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

    async sendMail(email, activationLink) {
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
}

module.exports = new MailService()