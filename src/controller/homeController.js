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

const handleCreateNewUser = (req, res) => {
    let { email, password, username } = req.body;

    userService.createNewUser(email, password, username)


    return res.redirect('/user')
}
const handleDeleteUser = (req, res) => {

    userService.deleteUser(req.params.id)
    return res.redirect('/user')

}

module.exports = {
    handleHomeController,
    handleUserController,
    handleCreateNewUser,
    handleDeleteUser
}