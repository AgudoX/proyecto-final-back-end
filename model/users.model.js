
const getAll = () => {
    return db.query('select u.id, u.name, u.surname, u.birthdate, u.email, u.password, u.phone, u.avatar, u.type from users as u')
}


module.exports = {
    getAll
}