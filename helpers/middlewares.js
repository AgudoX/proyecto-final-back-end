const checkToken = async (req, res, next) => {
    //Comprobamos si el token viene incluido en la cabecera, que se pasa como segundo parámetro de la petición post.
    if (!req.headers.authorization) {
        return res.json('Debes incluir el token')
    }

    const token = req.headers.authorization
    //Comprobamos si el token es correcto. Es decir decodificar el token con jsonwebtoken y ver si es igual al que pusimos al hacer jwt.sign .

    //Almacenará el payload que creamos en utils
    let obj
    //Esto necesita un try catch pq sino peta
    try {
        //Si el token está bien  continuaría la petición
        obj = jwt.verify(token, 'test1234')
        /* return res.json('A disfrutar') */
    } catch (error) {
        //Si el token es incorrecto devuelve el espabila, es importante poner el return siempre que la función continue después del catch para que no pete la app       .
        return res.json({ espabila: 'Token incorrecto' });
    }
    //console.log(obj) // Devuleve el obj con la información del usuario que le dimos en el payload de createtoken.:
    /*
    {
        user_id: 2,
        user_role: 'regular',
        exp_at: 1669369678, 
        iat: 1669369378 //Hora en formato unix en la que se ha hecho login
      }
       */
    //Comprobamos si el token está caducado.
    if (dayjs().unix() > obj.exp_at) {
        return res.json({ espabila: 'El token está caducado' })
    };

    //console.log(obj.user_id) Tiene el id del usuario logeado.
    const [user] = await getById(obj.user_id); //Recuperamos el usuario
    console.log(user); // Array con el usuario logeado

    req.user = user[0];

    next(); //Si pasa el checkToken tengo disponible el req.user

}
