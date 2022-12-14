const { query } = require("express")

//Devuelve todos aquellos del tipo indicado en el parámetro, en este caso nos interesa teachers.
const getAll = () => {
    return db.query('select group_concat(distinct subjects.name) as subject, round(avg(user_has_teacher.score),1) as media_score, users.* from users left join user_has_subjects on user_has_subjects.user_id=users.id left join subjects on user_has_subjects.subjects_id = subjects.id left join user_has_teacher on user_has_teacher.teacher_id = users.id where users.type ="teacher" and users.active=1 group by users.id')
}

const getTeacherById = (userId) => {
    return db.query('select group_concat(distinct subjects.name) as subject, round(avg(user_has_teacher.score),1) as media_score, users.* from users left join user_has_subjects on user_has_subjects.user_id=users.id left join subjects on user_has_subjects.subjects_id = subjects.id left join user_has_teacher on user_has_teacher.teacher_id = users.id where users.type ="teacher" and users.id=? and users.active=1 group by users.id', [userId])
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
    return db.query('select * from user_has_teacher join users on user_has_teacher.teacher_id = users.id where score between ? and ?  and users.active=1 order by score desc', [pScoreMin, pScoreMax])
}

const orderByScore = () => {
    return db.query(`select group_concat(distinct subjects.name) as subject, round(avg(user_has_teacher.score),1) as media_score, users.* from users 
    left join user_has_subjects on user_has_subjects.user_id=users.id
     left join subjects on user_has_subjects.subjects_id = subjects.id
     left join user_has_teacher on user_has_teacher.teacher_id = users.id
    where users.type ="teacher" and users.active= 1 and subjects.name is not null
    group by users.id 
    order by score desc
    `)
}


const getTeacherByPrice = (min, max) => {
    return db.query('select* from users where type="teacher" and pricehour between ? and ? and users.active=1', [min, max])
}

const getTeacherByPriceAsc = (min, max) => {
    return db.query('select* from users where type="teacher" and pricehour between ? and ? and users.active=1 order by pricehour asc', [+min, +max])
}

const getTeacherByPriceDesc = (min, max) => {
    return db.query('select* from users where type="teacher" and pricehour between ? and ? and users.active=1 order by pricehour desc', [min, max])
}

const getCommentsByTeacherId = (teacherId) => {
    return db.query('SELECT  users.name,  user_has_teacher.opinion as opinion FROM teacher_app.user_has_teacher join users on user_has_teacher.user_id = users.id where user_has_teacher.teacher_id =?', [teacherId])
}

const filterTeachers = (pScore, pCity, pSubject, pPrice) => {

    let sql = `select group_concat(distinct subjects.name) as subject, round(avg(user_has_teacher.score),1) as media_score, users.* 
    from users left join user_has_subjects on user_has_subjects.user_id=users.id 
    left join subjects on user_has_subjects.subjects_id = subjects.id 
    left join user_has_teacher on user_has_teacher.teacher_id = users.id 
    where users.type ="teacher" and users.active=1
    ${pScore ? 'AND  user_has_teacher.score > ?' : ''}
    ${pCity ? 'AND users.address = ?' : ''}
    ${pPrice ? 'AND users.pricehour <= ?' : ''}
    ${pSubject ? 'AND subjects.name = ?' : ''} 
    group by users.id`

    let paramsArr = []

    /* Importante el orden en el que se haga el push ya que sino donde está pSubject puede aparecer pPrice.... Por ello el orden de los push tiene que ser igual al orden en el que aparecen en la query sql */
    if (pScore) paramsArr.push(pScore);
    if (pCity) paramsArr.push(pCity);
    if (pPrice) paramsArr.push(pPrice)
    if (pSubject) paramsArr.push(pSubject);
    /* El params arr es correcto */
    return db.query(sql, paramsArr)
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
    getTeacherByPriceDesc,
    getCommentsByTeacherId,
    orderByScore,
    filterTeachers,
}