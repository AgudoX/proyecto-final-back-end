const router = require('express').Router();

const { getAll, deleteUserById, updateUserById, getUserById } = require('../../model/users.model')

router.get('/', async (req, res) => {
    try {
        const [users] = await getAll('user')
        res.json(users)
    } catch (error) {
        res.json({ espabila: error.message })
    }

})

router.delete('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [response] = await deleteUserById(userId)
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})
 router.put('/:userId', async (req,res)=>{
    try {
        const { userId } = req.params;
        const [response] = await updateUserById(userId, req.body)
        console.log(response)
        const [user]= await getUserById(userId)
        res.json(user[0])
    } catch (error) {
        res.json({ fatal: error.message })
    }
}) 

module.exports = router;