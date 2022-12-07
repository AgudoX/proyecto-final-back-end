const router = require('express').Router();

const { getAll } = require('../../model/subjects.model')

router.get('/', async (req, res) => {
    try {
        const [response] = await getAll()
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

module.exports = router;