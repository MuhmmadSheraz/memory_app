import nodemailer from "nodemailer"
interface Props {
    message: string,
    email: string

}
export const sendEmail = async ({ email, message }: Props) => {
    // Create Transporter 

    console.log(email, message)
    const transporter: any = nodemailer.createTransport({
        // @ts-ignore
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    })
    const mailOptions = {
        from: "admin@admin.com",
        to: email,
        text: message,
        subject: "Password reset procedure",
    }
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)

    }
}