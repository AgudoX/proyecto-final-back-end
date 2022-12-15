const router = require('express').Router();
const bcrypt = require('bcryptjs');
const multer = require('multer')
//Indicamos en que ruta queremos colocar las imágenes, normalmente en public/images
const upload = multer({ dest: 'public/images' });
const fs = require('fs');

const { getAll, deleteTeacherById, updateTeacherById, getTeacherById, create, getTeacherByPrice, getTeacherByPriceAsc, getTeacherByPriceDesc, filterByScore, getCommentsByTeacherId, orderByScore, filterTeachers, getInactiveTeachers } = require('../../model/teachers.model')
/* const { getAll, deleteTeacherById, updateTeacherById, getTeacherById, create, getTeacherByPrice, getTeacherByPriceAsc, getTeacherByPriceDesc, filterByScore, getCommentsByTeacherId, orderByScore, filterTeachers } = require('../../model/teachers.model'); */

router.get('/', async (req, res) => {
    try {
        const [teachers] = await getAll('teacher')
        res.json(teachers)
    } catch (error) {
        res.json({ espabila: error.message })
    }
})

router.get('/inactive', async (req, res) => {
    try {
        const [teachers] = await getInactiveTeachers('teacher')
        res.json(teachers)
    } catch (error) {
        res.json({ espabila: error.message })
    }
})

// FILTROS
router.get('/price/:min/:max', async (req, res) => {
    try {
        const { min, max } = req.params;
        const [teachers] = await getTeacherByPrice(min, max);
        res.json(teachers);
    } catch (error) {
        res.json({ espabila: error.message });
    }
})

router.get('/price/asc/:min/:max', async (req, res) => {
    try {
        const { min, max } = req.params;
        const [teachers] = await getTeacherByPriceAsc(min, max);
        res.json(teachers);
    } catch (error) {
        res.json({ espabila: error.message });
    }
})

router.get('/price/desc/:min/:max', async (req, res) => {
    try {
        const { min, max } = req.params;
        const [teachers] = await getTeacherByPriceDesc(min, max);
        res.json(teachers);
    } catch (error) {
        res.json({ espabila: error.message });
    }
})

router.get('/score/:min/:max', async (req, res) => {

    const { min, max } = req.params
    try {
        const [teachers] = await filterByScore(+min, +max);
        res.json(teachers)
    } catch (error) {
        res.json({ espabila: error.message })
    }
})

router.get('/score', async (req, res) => {
    try {
        const [teachers] = await orderByScore()
        res.json(teachers)
    } catch (error) {
        res.json({ espabila: error.message })
    }
})

router.get('/:teacherId', async (req, res) => {
    const { teacherId } = req.params
    try {
        const [teacher] = await getTeacherById(teacherId);
        res.json(teacher[0])
    } catch (error) {
        res.json({ espabila: error.message })
    }
})


router.get('/:teacherId/coments', async (req, res) => {
    const { teacherId } = req.params
    try {
        const [coments] = await getCommentsByTeacherId(teacherId);
        res.json(coments)
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

router.put('/:teacherId', async (req, res) => {
    try {
        const { teacherId } = req.params;
        await updateTeacherById(teacherId, req.body)
        const [response] = await getTeacherById(teacherId)
        res.json(response[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.post('/new', upload.single('avatar'), async (req, res) => {

    /* multer */
    if (req.file) {
        const extension = '.' + req.file.mimetype.split('/')[1];
        // Obtengo el nombre de la nueva imagen
        const newName = req.file.filename + extension;
        // Obtengo la ruta donde estará, adjuntándole la extensión
        const newPath = req.file.path + extension;
        // Muevo la imagen para que resiba la extensión
        fs.renameSync(req.file.path, newPath);
        req.body.avatar = newName;
    }

    req.body.remote = (req.body.remote === 'false') ? 0 : 1;

    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        const [response] = await create(req.body);
        const [teacher] = await getTeacherById(response.insertId)
        res.json(teacher[0])

    } catch (error) {
        console.log(error)
        res.json({ fatal: error.message })

    }
}
)


router.post('/filter', async (req, res) => {
    const { score, city, subject, price, remote } = req.body
    try {
        const [response] = await filterTeachers(score, city, subject, price, remote);
        res.json(response)

    } catch (error) {
        res.json({ fatal: error.message })

    }



})


module.exports = router;