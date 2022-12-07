
const getAll = () => {
    /* El consumo de esta promesa (async - await) se hace cuando se aplique el getAll */
    return db.query('select * from subjects')
}


module.exports = {
    getAll
}