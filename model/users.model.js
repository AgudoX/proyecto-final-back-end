
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

const getCommentsByStudentId = (studentId) => {
    return db.query('SELECT  users.name,  user_has_teacher.opinion as opinion FROM teacher_app.user_has_teacher join users on user_has_teacher.user_id = users.id where user_has_teacher.user_id =?', [studentId])
}

const getUserTeachers = (userId) => {
    return db.query(`SELECT DISTINCT users.name, users.surname, users.birthdate, users.email, users.phone, users.pricehour, users.experience FROM users
    join user_has_teacher on user_has_teacher.teacher_id = users.id
    where user_has_teacher.user_id = ? and status="accepted"`, [userId])
}

const deleteUserById = (userId) => {
    /* return db.query('delete * from users where id=?',[userId]) */
    return db.query('delete from users where id=? and type="user"', [userId])
};

const getUserPending = (teacherId) => {
    return db.query(`SELECT * FROM teacher_app.user_has_teacher where teacher_id = ? and status = "pending"`, [teacherId])
}

const create = ({ name, surname, birthdate, email, password, phone, avatar, type, active }) => {
    return db.query('insert into users values (null, ? ,? ,? ,? ,? ,? ,? ,? ,null ,null ,null ,?,null,null,null)', [name, surname, birthdate, email, password, phone, avatar, type, active])
}

const updateUserStatus = (pStatus, pUserId, pTeacherId) => {
    return db.query(`update user_has_teacher set status = ? where user_id = ? and teacher_id = ?`, [pStatus, pUserId, pTeacherId])
}

const updateUserById = (userId, { name, surname, birthdate, email, phone, avatar }) => {

    let paramsArr = [name, surname, birthdate, email, phone]

    if (avatar) paramsArr.push(avatar);
    if (userId) paramsArr.push(userId)

    return db.query(`update users set name=?, surname=?, birthdate=?, email=?, phone=? ${avatar ? ', avatar=?' : ' '} where id=? and type="user"`, paramsArr)
}

const createOpinion = (pId, pScore, pOpinion) => {
    return db.query('update user_has_teacher set score = ? , opinion = ? where id = ?', [pScore, pOpinion, pId])
}

const updateActiveById = (userId, active) => {
    return db.query('update users set active=? where id=?', [active, userId])
}

const createUserTeacher = ({ user_id, teacher_id }) => {
    return db.query('insert into user_has_teacher values (null, ? ,? ,null ,null, "pending")', [user_id, teacher_id])
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
    createOpinion,
    getUserPending,
    getCommentsByStudentId,
    getUserTeachers,
    updateUserStatus,
    createUserTeacher
}