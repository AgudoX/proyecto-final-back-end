const router = require('express').Router();

router.use('/users', require('./api/users'))
router.use('/subjects', require('./api/subjects'))
router.use('/teachers', require('./api/teachers'))
router.use('/messages', require('./api/messages'))

router.get('/', (req, res) => {
    res.send('Hola')
})

module.exports = router;