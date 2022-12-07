const router = require('express').Router();

const { getAll, deleteSubjectById, create } = require('../../model/subjects.model')

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

router.post('/new', async (req, res) => {

    try {
        //Le pasamos el objeto que queremos añadir por el req.body, y lo mete en la base de datos
        const [subject] = await create(req.body)
        res.json(subject)

    } catch (error) {
        res.json({ espabila: error.message })
    }
})

module.exports = router;