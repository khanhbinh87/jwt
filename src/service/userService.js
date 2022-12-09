import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird';
// // create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'jwt'
// });



const salt = bcrypt.genSaltSync(10);

const hassUserPassword = (password) => {

    return bcrypt.hashSync(password, salt);
}
const createNewUser = async (email, password, username) => {
    const connection = await mysql.createConnection(
        { host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    let hassPass = hassUserPassword(password);

    try {
        const [rows, fields] = await connection.execute(`INSERT INTO users(email, password, username) VALUES(?,?,?)`, [email, hassPass, username],
            function (err, results, fields) {
               
                if (err) {
                    console.log(err)
                }
            }
        );
        
    } catch (error) {
        console.log('err', error)
    }


}
const getUserList = async () => {

    // create the connection

    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // query database
    try {
        const [rows, fields] = await connection.execute('Select * from users');
        return rows
    } catch (error) {
        console.log('err', error)
    }
}
const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // query database
    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?',[id]);
        return rows
    } catch (error) {
        console.log('err', error)
    }
}
module.exports = {
    hassUserPassword,
    createNewUser,
    getUserList,
    deleteUser
}