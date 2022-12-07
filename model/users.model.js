
const getAll = () => {
    return db.query('select u.id, u.name, u.surname, u.birthdate, u.email, u.password, u.phone, u.avatar, u.type from users as u')
}

const deleteUserById = (userId) => {
    /* return db.query('delete * from users where id=?',[userId]) */
    return db.query('delete from users where id=?', [userId])
};

const create = ({ name, surname, birthdate, email, password, phone, avatar, type }) => {
    return db.query('insert into users values (null, ? ,? ,? ,? ,? ,? ,? ,? ,null ,null ,null ,null)', [name, surname, birthdate, email, password, phone, avatar, type])
}

module.exports = {
    getAll,
    deleteUserById,
    create
}