
const getAll = () => {
    return db.query('select u.id, u.name, u.surname, u.birthdate, u.email, u.password, u.phone, u.avatar, u.type, u.active from users as u where type = "user" and active = 1')
}

const getInactiveUsers = () => {
    return db.query('select u.id, u.name, u.surname, u.birthdate, u.email, u.password, u.phone, u.avatar, u.type, u.active from users as u where type = "user" and active = 0 ')
}


const getUserById = (userId) => {
    return db.query('select * from users where id=? and type="user"', [userId])
}

const getById = (userId) => {
    return db.query('select * from users where id=?', [userId])
}

const getByEmail = (pEmail) => {
    return db.query('Select * from users where email = ?', [pEmail])
}

const deleteUserById = (userId) => {
    /* return db.query('delete * from users where id=?',[userId]) */
    return db.query('delete from users where id=? and type="user"', [userId])
};

const create = ({ name, surname, birthdate, email, password, phone, avatar, type, active }) => {
    return db.query('insert into users values (null, ? ,? ,? ,? ,? ,? ,? ,? ,null ,null ,null ,?,null,null,null)', [name, surname, birthdate, email, password, phone, avatar, type, active])
}

const updateUserById = (userId, { name, surname, birthdate, email, password, phone, avatar }) => {

    let paramsArr = [name, surname, birthdate, email, password, phone]

    if (avatar) paramsArr.push(avatar);
    if (userId) paramsArr.push(userId)

    return db.query(`update users set name=?, surname=?, birthdate=?, email=?, password=?, phone=? ${avatar ? ', avatar=?' : ' '} where id=? and type="user"`, paramsArr)
}

const createOpinion = (pId, pScore, pOpinion) => {
    return db.query('update user_has_teacher set score = ? , opinion = ? where id = ?', [pScore, pOpinion, pId])
}

const updateActiveById = (userId, active) => {
    return db.query('update users set active=? where id=?', [active, userId])
}


module.exports = {
    getAll,
    create,
    getUserById,
    deleteUserById,
    updateUserById,
    getByEmail,
    getById,
    getInactiveUsers,
    updateActiveById,
    createOpinion
}