import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird';
import db from "../models"


const salt = bcrypt.genSaltSync(10);

const hassUserPassword = (password) => {

    return bcrypt.hashSync(password, salt);
}
const createNewUser = async (email, password, username) => {

    let hassPass = hassUserPassword(password);

    try {

        await db.User.create({
            username: username,
            password: hassPass,
            email: email
        })

    } catch (error) {
        console.log('err', error)
    }


}
const getUserList = async () => {

    // create the connection

    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // query database
    try {
        const [rows, fields] = await connection.execute('Select * from user');
        return rows
    } catch (error) {
        console.log('err', error)
    }
}
const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // query database
    try {
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
        return rows
    } catch (error) {
        console.log('err', error)
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    // query database
    try {
        const [rows, fields] = await connection.execute('Select * from user WHERE id=?', [id]);

        return rows
    } catch (error) {
        console.log('err', error)
    }
}
const updateUser = async (email, username, id) => {
    const connection = await mysql.createConnection(
        { host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute(`UPDATE user Set email=?,username =?  WHERE id = ?`, [email, username, id],
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


module.exports = {
    hassUserPassword,
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUser
}