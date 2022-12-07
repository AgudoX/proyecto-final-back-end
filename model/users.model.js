
const getAll = () => {
    return db.query('select u.id, u.name, u.surname, u.birthdate, u.email, u.password, u.phone, u.avatar, u.type from users as u')
}

const getUserById = (userId) =>{
    return db.query('select * from users where id=? and type="user"',[userId])
}

const deleteUserById = (userId) => {
    /* return db.query('delete * from users where id=?',[userId]) */
    return db.query('delete from users where id=? and type="user"', [userId])
};

const updateUserById = (userId, {name,surname,birthdate,email,password,phone,avatar}) =>{
    return db.query('update users set name=?, surname=?, birthdate=?, email=?, password=?, phone=?, avatar=? where id=? and type="user"',[name,surname,birthdate,email,password,phone,avatar,userId])
}

module.exports = {
    getAll,
    getUserById,
    deleteUserById,
    updateUserById
}