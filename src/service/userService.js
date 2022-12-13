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
    // let newUser = await db.User.findOne({
    //     where:{id:1},
    //     attributes:['id','username','email'],
    //     include:{model:db.Group,attributes:['name','description']},
    //     raw:true,
    //     nest:true
    // })

    return await db.User.findAll()
}
const deleteUser = async (userId) => {

    try {
        await db.User.destroy({
            where: {
                id: userId
            }
        })
    } catch (error) {
        console.log('err', error)
    }

}

const getUserById = async (id) => {

    let user = {}
    user = await db.User.findOne({
        where: {
            id: id
        }
    })
    return user.get({ plain: true })

}
const updateUser = async (email, username, id) => {

    try {
       
        await db.User.update({
            email: email,
            username: username
        }, {
            where: {
                id: id
            }
        })

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