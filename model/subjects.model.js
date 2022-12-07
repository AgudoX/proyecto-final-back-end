
const getAll = () => {
    /* El consumo de esta promesa (async - await) se hace cuando se aplique el getAll */
    return db.query('select * from subjects')
}

const getSubjectById = (subjectId) => {
    return db.query('select * from subjects where id=?', [subjectId])
}


const deleteSubjectById = (subjectId) => {
    return db.query('delete from subjects where id=?', [subjectId])
}

//En este caso como estamos haciendo destructuring de req.body los valores que se le están pasando a create tienen que ser las claves de req.body.
const create = ({ name, level }) => {
    return db.query('insert into subjects (name,level) values ( ?, ?)', [name, level])
}

const updateSubjectById = (subjectId, {name,level}) => {
    return db.query('update subjects set name=?, level=? where id=?',[name,level,subjectId])
}



module.exports = {
    getAll,
    getSubjectById,
    deleteSubjectById,
    create,
    updateSubjectById
}