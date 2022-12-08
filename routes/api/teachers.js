const router = require('express').Router();

const { getAll, deleteTeacherById, updateTeacherById, getTeacherById, create, getTeacherByPrice} = require('../../model/teachers.model')

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
        const [response] = await getTeacherById(teacherId)
        await deleteTeacherById(teacherId);
        res.json(response)
        
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.put('/:teacherId', async (req,res)=>{
    try {
        const { teacherId } = req.params;
        await updateTeacherById(teacherId, req.body)
        const [response] = await getTeacherById(teacherId)
        res.json(response[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.post('/new', async (req, res) => {
    try {
        const [response] = await create(req.body);
        const [teacher] = await getTeacherById(response.insertId)
        console.log(response)
        res.json(teacher[0])

    } catch (error) {
        res.json({ fatal: error.message })

    }

})

// FILTROS
router.get('/price/:min/:max', async (req, res) => {
    try {
        const {min,max} = req.params;
        const [teachers] = await getTeacherByPrice(min,max);
        res.json(teachers);
    } catch (error) {
        res.json({ espabila: error.message });
    }
})


module.exports = router;