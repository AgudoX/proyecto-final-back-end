const router = require('express').Router();

const { getAll, deleteSubjectById } = require('../../model/subjects.model')

router.get('/', async (req, res) => {
    try {
        const [subjects] = await getAll();
        res.json(subjects)
    } catch (error) {
        res.json({ espabila: error.message })
    }
})

router.delete('/:subjectId', async (req, res) => {
    try {
        const { subjectId } = req.params
        const [response] = await deleteSubjectById(subjectId)
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

module.exports = router;