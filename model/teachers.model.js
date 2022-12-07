//Devuelve todos aquellos del tipo indicado en el parámetro, en este caso nos interesa teachers.
const getAll = (pType = 'teachers') => {
    return db.query('select * from teacher_app.users where type = ?', [pType])
}

const deleteTeacherById = (teacherId) => {
    return db.query('delete from users where type="teacher" and id=?', [teacherId])
}

const updateTeacherById = (userId, {name,surname,birthdate,email,password,phone,avatar,experience,pricehour,address,active}) =>{
    return db.query('update users set name=?, surname=?, birthdate=?, email=?, password=?, phone=?, avatar=?, experience=?, pricehour=?, address=?, active=? where id=? and type="teacher"',[name,surname,birthdate,email,password,phone,avatar,experience,pricehour,address,active,userId])
}


module.exports = {
    getAll,
    deleteTeacherById,
    updateTeacherById
}