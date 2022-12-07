const router = require('express').Router();

const { getAll, deleteSubjectById, updateSubjectById, getSubjectById } = require('../../model/subjects.model')

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

module.exports = router;