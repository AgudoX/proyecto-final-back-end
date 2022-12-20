const router = require('express').Router();
const nodemailer = require('nodemailer')

router.post('/', (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'c09b26e96e3abd', // generated ethereal user
            pass: '03556c5887be42', // generated ethereal password
        },
    });

    // send mail with defined transport object
    return transporter.sendMail({
        from: '"Se ha registrado un nuevo usuario" <foo@example.com>', // sender address
        to: `${req.body.email}, baz@example.com`, // list of receivers
        subject: "Nuevo usuario ✔", // Subject line
        text: "Se ha registrado un nuevo usuario", // plain text body
        html: "<b>Se ha registrado un nuevo usuario</b>", // html body
    }, (err, info) => {
        if (err) res.status(200).send({ success: false, error: err })

        return res.status(200).send({
            success: true,
            message: 'email sent!'
        })
    });
})

module.exports = router;