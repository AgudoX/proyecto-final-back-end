const getMessages = (user_id, teacher_id) => {
    return db.query(`SELECT * FROM messages where user_id = ? and teacher_id = ? or teacher_id = ? and user_id = ? order by id asc`, [user_id, teacher_id, user_id, teacher_id])
}

const sendMessage = ({ user_id, teacher_id, message }) => {
    return db.query(`insert into messages values (NULL, ?, ?, ?)`, [user_id, teacher_id, message])
}

module.exports = {
    getMessages,
    sendMessage
}