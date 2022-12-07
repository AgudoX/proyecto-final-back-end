
const getAll = () => {
    /* El consumo de esta promesa (async - await) se hace cuando se aplique el getAll */
    return db.query('select * from subjects')
}

const deleteSubjectById = (subjectId) => {
    return db.query('delete from subjects where id=?', [subjectId])
}

//En este caso como estamos haciendo destructuring de req.body los valores que se le están pasando a create tienen que ser las claves de req.body.
const create = ({ name, level }) => {
    return db.query('insert into subjects (name,level) values ( ?, ?)', [name, level])
}


module.exports = {
    getAll,
    deleteSubjectById,
    create
}