const router = require('express').Router();

const { getAll } = require('../../model/users.model')

router.get('/', async (req, res) => {
    try {
        const [users] = await getAll('user')
        res.json(users)
    } catch (error) {
        res.json({ espabila: error.message })
    }

})


module.exports = router;