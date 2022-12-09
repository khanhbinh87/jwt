import bcrypt from 'bcryptjs'
import mysql from 'mysql2'

// // create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});



const salt = bcrypt.genSaltSync(10);

const hassUserPassword = (password) => {

    return bcrypt.hashSync(password, salt);
}
const createNewUser = (email, password, username) => {
    let hassPass = hassUserPassword(password);
    connection.query(`INSERT INTO users(email, password, username) VALUES(?,?,?)`, [email, hassPass, username],
        function (err, results, fields) {
            console.log(results);

        }
    )
}
const getUserList = () => {
    connection.query(`Select * from users`,
        function (err, results, fields) {
            console.log(results);

        }
    )
}
module.exports = {
    hassUserPassword,
    createNewUser,
    getUserList
}