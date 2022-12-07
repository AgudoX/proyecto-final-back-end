const router = require('express').Router();

const { getAll, deleteSubjectById, updateSubjectById, getSubjectById,create } = require('../../model/subjects.model')

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
        const [response] = await getSubjectById(subjectId)
        await deleteSubjectById(subjectId)
        res.json(response[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.put('/:subjectId', async (req,res)=>{
    try {
        const { subjectId } = req.params;
        const [response] = await getSubjectById(subjectId)
        await updateSubjectById(subjectId, req.body)
        res.json(response[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.post('/new', async (req, res) => {

    try {
        //Le pasamos el objeto que queremos añadir por el req.body, y lo mete en la base de datos
        const [response] = await create(req.body)
        const [subject] = await getSubjectById(response.insertId)
        res.json(subject[0])

    } catch (error) {
        res.json({ espabila: error.message })
    }
})

module.exports = router;