const dayjs = require("dayjs");
const jwt = require("jsonwebtoken")

const createToken = (usuario) => {
    const payload = {
        user_id: usuario.id,
        user_role: usuario.type,
        //Solemos dar una fecha de caducidad del token.
        //Con la libreria dayjs y su método add() podemos añadirle a la fecha actual una cantidad de tiempo, esa será la fecha de caducidad del token.
        //Con el método unix pasamos la fecha a formato unix()
        exp_at: dayjs().add(1, 'days').unix()
    }
    return jwt.sign(payload, 'test1234'); //Esto es un token codificado con datos
}

module.exports = {
    createToken,
}