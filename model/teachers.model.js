const { query } = require("express")

//Devuelve todos aquellos del tipo indicado en el parámetro, en este caso nos interesa teachers.
const getAll = (pType = 'teachers') => {
    return db.query('select * from teacher_app.users where type = ?', [pType])
}

const getTeacherById = (userId) => {
    return db.query('select * from users where id=? and type="teacher"', [userId])
}

const deleteTeacherById = (teacherId) => {
    return db.query('delete from users where type="teacher" and id=?', [teacherId])
}

const create = ({ name, surname, birthdate, email, password, phone, avatar, type, experience, pricehour, address, active }) => {
    return db.query('insert into users values (null, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)', [name, surname, birthdate, email, password, phone, avatar, type, experience, pricehour, address, active])
}

const updateTeacherById = (userId, { name, surname, birthdate, email, password, phone, avatar, experience, pricehour, address, active }) => {
    return db.query('update users set name=?, surname=?, birthdate=?, email=?, password=?, phone=?, avatar=?, experience=?, pricehour=?, address=?, active=? where id=? and type="teacher"', [name, surname, birthdate, email, password, phone, avatar, experience, pricehour, address, active, userId])
}

//Filtros

const filterByScore = (pScoreMin, pScoreMax) => {
    return db.query('select * from user_has_teacher join users on user_has_teacher.teacher_id = users.id where score between ? and ? order by score desc;', [pScoreMin, pScoreMax])
}


const getTeacherByPrice = (min,max)=>{
    return db.query('select* from users where type="teacher" and pricehour between ? and ?', [min,max])
}

const getTeacherByPriceAsc = (min,max) => {
    return db.query('select* from users where type="teacher" and pricehour between ? and ? order by pricehour asc', [+min,+max])
}

const getTeacherByPriceDesc = (min,max) => {
    return db.query('select* from users where type="teacher" and pricehour between ? and ? order by pricehour desc', [min,max])
}

module.exports = {
    getAll,
    getTeacherById,
    deleteTeacherById,
    create,
    updateTeacherById,
    filterByScore,
    getTeacherByPrice,
    getTeacherByPriceAsc,
    getTeacherByPriceDesc
}