const router = require('express').Router();

const { getAll, deleteUserById, create } = require('../../model/users.model')

router.get('/', async (req, res) => {
    try {
        const [users] = await getAll('user')
        res.json(users)
    } catch (error) {
        res.json({ espabila: error.message })
    }

})

router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [response] = await deleteUserById(userId)
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.post('/new', async (req, res) => {
    try {
        const [response] = await create(req.body)
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

module.exports = router;