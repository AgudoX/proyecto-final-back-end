const router = require('express').Router();

const { getAll, deleteTeacherById } = require('../../model/teachers.model')

router.get('/', async (req, res) => {
    try {
        const [teachers] = await getAll('teacher')
        res.json(teachers)
    } catch (error) {
        res.json({ espabila: error.message })
    }

})

router.delete('/:teacherId', async (req, res) => {
    try {
        const { teacherId } = req.params;
        const [response] = await deleteTeacherById(teacherId);
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

module.exports = router;