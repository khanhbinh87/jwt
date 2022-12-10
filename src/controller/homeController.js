import userService from "../service/userService"

const handleHomeController = (req, res) => {
    return res.render('home.ejs')
}
const handleUserController = async (req, res) => {
    let userList = await userService.getUserList();

    return res.render('user.ejs', {
        userList
    })
}

const handleCreateNewUser = async (req, res) => {
    let { email, password, username } = req.body;

    await userService.createNewUser(email, password, username)


    return res.redirect('/user')
}
const handleDeleteUser = async (req, res) => {

    await userService.deleteUser(req.params.id)
    return res.redirect('/user')

}
const getUpdateUser = async (req, res) => {
    let id = req.params.id
    let user = await userService.getUserById(id)

    let userData = {}
    if (user && user.length > 0) {
        userData = user[0]

    }
    return res.render('update-user', { userData })
}
const handleUpdateUser = async (req, res) => {
    const { email, username, id } = req.body;

    await userService.updateUser(email, username, id)
    return res.redirect('/user')

}
module.exports = {
    handleHomeController,
    handleUserController,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUser,
    handleUpdateUser
}