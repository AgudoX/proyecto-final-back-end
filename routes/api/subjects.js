const router = require('express').Router();

const { getAll, deleteSubjectById, updateSubjectById, getSubjectById, create, getSubjectDistinct, getSubjectByName, createUserHasSubject } = require('../../model/subjects.model');
const { getTeacherIdByEmail } = require('../../model/teachers.model');

router.get('/', async (req, res) => {
    try {
        const [subjects] = await getAll();
        res.json(subjects)
    } catch (error) {
        res.json({ espabila: error.message })
    }
})

router.get('/distinct', async (req, res) => {
    try {
        const [subjects] = await getSubjectDistinct();
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

router.put('/:subjectId', async (req, res) => {
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

router.post('/teachers', async (req, res) => {
    try {
        const { user_email, subject } = req.body
        const [user_id] = await getTeacherIdByEmail(user_email)
        const [subjectId] = await getSubjectByName(subject)
        const [userHasSubject] = await createUserHasSubject(user_id[0].id, subjectId[0].id)
        res.json(userHasSubject)
    } catch (error) {
        res.json({ fatal: error.message })

    }
}
)

module.exports = router;