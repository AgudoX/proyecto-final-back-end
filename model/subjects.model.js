
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

const updateSubjectById = (subjectId, {name,level}) => {
    return db.query('update subjects set name=?, level=? where id=?',[name,level,subjectId])
}

module.exports = {
    getAll,
    getSubjectById,
    deleteSubjectById,
    updateSubjectById
}