import db from '../models/index'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

const hassUserPassword = (password) => {

    return bcrypt.hashSync(password, salt);
}
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: {
            email: userEmail
        }
    })
    if (user) return true;
    return false
}
const checkPhonelExist = async (phoneUser) => {
    let phone = await db.User.findOne({
        where: {
            phone: phoneUser
        }
    })
    if (phone) return true;
    return false
}
const registerNewUser = async (rawData) => {
    try {
        //check email phone are exit
        let { email, phone, password, username } = rawData

        let isEmailExist = await checkEmailExist(email)
        if (isEmailExist) {
            return {
                EM: 'The email exist',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhonelExist(phone)
        if (isPhoneExist) {
            return {
                EM: 'The phone exist',
                EC: 1
            }
        }

        //hash pass
        let hassPass = hassUserPassword(password)

        //create new user
        await db.User.create({
            email, password: hassPass, username, phone
        })
        return {
            EM: 'A user is created success',
            EC: 0
        }
    } catch (error) {
        return {
            EM: 'Somthing wrongs in service',
            EC: -2
        }
    }

}
const checkPassword = (inputPass, hashPass) => {
    return bcrypt.compareSync(inputPass, hashPass)
}
const handleUserLogin = async ({ valueLogin, password }) => {
    try {

        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: valueLogin },
                    { phone: valueLogin }
                ]
            }
        })
        if (user) {

            let isCorrectPass = checkPassword(password, user.password)
            if (isCorrectPass) {
                return {
                    EM: 'ok',
                    EC: 0,
                    DT: ''
                }
            }
        }
        console.log('Not found user with email/phone', valueLogin)
        return {
            EM: 'Email/phone number or password is incorrect',
            EC: 1,
            DT: ''
        }


    } catch (error) {
        return {
            EM: 'Somthing wrongs in server',
            EC: -2
        }
    }
}
module.exports = {
    registerNewUser,
    handleUserLogin
}