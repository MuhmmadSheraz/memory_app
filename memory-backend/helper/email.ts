import nodemailer from "nodemailer"

export const sendEmail =async(options:any)=>{
    // Create Transporter 

    const transporter:any =nodemailer.createTransport({
        // @ts-ignore
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD,
        }
    })
    const mailOptions={
        from :"admin@admin.com",
        to:options.email,
        text:options.message
    }
    await transporter.sendEmail(mailOptions)
}