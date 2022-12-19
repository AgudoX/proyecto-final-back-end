const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { createToken } = require('../../helpers/create-token');
const multer = require('multer')
//Indicamos en que ruta queremos colocar las imágenes, normalmente en public/images
const upload = multer({ dest: 'public/images' });
const fs = require('fs');

const { getAll, deleteUserById, updateUserById, getUserById, create, getByEmail, getInactiveUsers, updateActiveById, createOpinion } = require('../../model/users.model');
const { checkToken } = require('../../helpers/middlewares');

router.get('/', async (req, res) => {
    try {
        const [users] = await getAll('user')
        res.json(users)
    } catch (error) {
        res.json({ espabila: error.message })
    }

})

router.get('/inactive', async (req, res) => {
    try {
        const [users] = await getInactiveUsers()
        res.json(users)
    } catch (error) {
        res.json({ espabila: error.message })
    }

})


router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        const [user] = await getUserById(userId)
        res.json(user[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [user] = await getUserById(userId)
        res.json(user[0])
        await deleteUserById(userId)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.post('/email', async (req, res) => {
    try {
        const { email } = req.body;
        const [users] = await getByEmail(email)
        res.json(users[0])
    } catch (error) {
        res.json({ espabila: error.message })
    }

})

router.post('/new', upload.single('avatar'), async (req, res) => {
    /* multer */
    if (req.file) {
        const extension = '.' + req.file.mimetype.split('/')[1];
        // Obtengo el nombre de la nueva imagen
        const newName = req.file.filename + extension;
        // Obtengo la ruta donde estará, adjuntándole la extensión
        const newPath = req.file.path + extension;
        // Muevo la imagen para que resiba la extensión
        fs.renameSync(req.file.path, newPath);
        req.body.avatar = newName;
    }

    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        const [response] = await create(req.body)
        const [user] = await getUserById(response.insertId)
        res.json(user[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        /* Continuar con el login */
        const { email, password } = req.body;

        const [usuario] = await getByEmail(email)

        if (usuario === 0) {
            return res.json({ fatal: 'No hay ningún usuario con ese email o contraseña' });
        }

        const user = usuario[0]

        //Devuelve un boolean
        const comparacion = bcrypt.compareSync(password, user.password)
        //Comparamos las contraseñas para ver que sean iguales.
        if (!comparacion) {
            return res.json({ fatal: 'El email o la contraseña no existen' })
        }

        //Si hace bien el login le devolvemos un objeto con dos claves, una de ellas el token.
        res.json({
            success: 'Enhorabuena',
            token: createToken(user),
            type: user.type
        });
    } catch (error) {
        res.json({ fatal: 'El email o la contraseña no existen' })
    }
})

router.post('/activation', checkToken, async (req, res) => {
    try {
        const { id, active } = req.body;
        const [users] = await updateActiveById(id, active)
        console.log(users)
        res.json(users[0])
    } catch (error) {
        res.json({ espabila: error.message })
    }

})

router.put('/opinion', checkToken, async (req, res) => {
    try {
        const { id, opinion, score } = req.body
        const userOpinion = await createOpinion(id, score, opinion)
        res.json(userOpinion)

    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.put('/update/:userId', upload.single('avatar'), async (req, res) => {
    /* multer */
    if (req.file) {
        const extension = '.' + req.file.mimetype.split('/')[1];
        // Obtengo el nombre de la nueva imagen
        const newName = req.file.filename + extension;
        // Obtengo la ruta donde estará, adjuntándole la extensión
        const newPath = req.file.path + extension;
        // Muevo la imagen para que resiba la extensión
        fs.renameSync(req.file.path, newPath);
        req.body.avatar = newName;
    }

    try {
        const { userId } = req.params;
        const userUpdate = await updateUserById(userId, req.body)
        res.json(userUpdate)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})


router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        await updateUserById(userId, req.body)
        const [user] = await getUserById(userId)
        res.json(user[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

module.exports = router;