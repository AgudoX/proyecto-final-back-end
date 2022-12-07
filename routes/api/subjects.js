const router = require('express').Router();

const { getAll } = require('../../model/subjects.model')

router.get('/', async (req, res) => {
    try {
        const [subjects] = await getAll();
        res.json(subjects)
    } catch (error) {
        res.json({ espabila: error.message })
    }
})

module.exports = router;