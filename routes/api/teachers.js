const router = require('express').Router();
const bcrypt = require('bcryptjs');
const multer = require('multer')
//Indicamos en que ruta queremos colocar las imágenes, normalmente en public/images
const upload = multer({ dest: 'public/images' });
const fs = require('fs');
const NodeGeocoder = require('node-geocoder');

const { getAll, deleteTeacherById, updateTeacherById, getTeacherById, create, getTeacherByPrice, getTeacherByPriceAsc, getTeacherByPriceDesc, filterByScore, getCommentsByTeacherId, orderByScore, filterTeachers, getInactiveTeachers, getTeacherByEmail, getStudentsByTeacher } = require('../../model/teachers.model');
const { checkToken } = require('../../helpers/middlewares');
const { getUserPending, getUserById, updateUserStatus, createUserTeacher } = require('../../model/users.model');
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

router.get('/profile', checkToken, async (req, res) => {

    res.json(req.user)
})

router.get('/request', checkToken, async (req, res) => {
    let arrUser = []
    const [request] = await getUserPending(req.user.id)
    for (let requ of request) {
        const [user] = await getUserById(requ.user_id)

        arrUser.push(user[0])
    }
    res.json(arrUser)
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

router.get('/email/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const [users] = await getTeacherByEmail(email)
        res.json(users)
    } catch (error) {
        res.json({ espabila: error.message })
    }

})

router.get('/:teacherId/students', async (req, res) => {
    const { teacherId } = req.params
    try {
        const [users] = await getStudentsByTeacher(teacherId)
        res.json(users)
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

router.put('/update/status', async (req, res) => {
    const { status, user_id, teacher_id } = req.body;
    try {
        const [user] = await updateUserStatus(status, user_id, teacher_id)
        res.json(user)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.post('/new', upload.single('avatar'), async (req, res) => {
    const options = {
        provider: 'google',

        // Optional depending on the providers
        apiKey: 'AIzaSyBMOcTcAkobrlfKIBOJNz6lDw2R5fJsk_Q', // for Mapquest, OpenCage, Google Premier
        formatter: null // 'gpx', 'string', ...
    };
    const geocoder = NodeGeocoder(options);
    const response = await geocoder.geocode(req.body.address);
    req.body.lat = response[0].latitude
    req.body.long = response[0].longitude

    console.log(req.body)
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
    const { score, subject, price, remote } = req.body
    try {
        const [response] = await filterTeachers(score, subject, price, remote);
        res.json(response)

    } catch (error) {
        res.json({ fatal: error.message })

    }
})


router.post('/newstudent', async (req, res) => {
    try {
        const [response] = await createUserTeacher(req.body);
        res.json(response)

    } catch (error) {
        res.json({ fatal: error.message })

    }
})


module.exports = router;