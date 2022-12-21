const { getMessages, sendMessage } = require('../../model/message.model');

const router = require('express').Router();

router.post('/', async (req, res) => {
    const { user_id, teacher_id } = req.body
    console.log(user_id, teacher_id)
    try {
        const [messages] = await getMessages(user_id, teacher_id, user_id, teacher_id)
        res.json(messages)
    } catch (error) {
        res.json({ espabila: error })
    }

})

router.post('/new', async (req, res) => {

    try {
        const [messages] = await sendMessage(req.body)
        res.json(messages)
    } catch (error) {
        res.json({ espabila: error })
    }

})

module.exports = router;