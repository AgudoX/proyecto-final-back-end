//Devuelve todos aquellos del tipo indicado en el parámetro, en este caso nos interesa teachers.
const getAll = (pType = 'teachers') => {
    return db.query('select * from teacher_app.users where type = ?', [pType])
}

const deleteTeacherById = (teacherId) => {
    return db.query('delete from users where type="teacher" and id=?', [teacherId])
}


module.exports = {
    getAll,
    deleteTeacherById
}