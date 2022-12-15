const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { createToken } = require('../../helpers/create-token');

const { getAll, deleteUserById, updateUserById, getUserById, create, getByEmail } = require('../../model/users.model')

router.get('/', async (req, res) => {
    try {
        const [users] = await getAll('user')
        res.json(users)
    } catch (error) {
        res.json({ espabila: error.message })
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

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        const [user]= await getUserById(userId)
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

router.post('/new', async (req, res) => {
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
        });
    } catch (error) {
        res.json({ fatal: 'El email o la contraseña no existen' })
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