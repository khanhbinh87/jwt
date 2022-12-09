import userService from "../service/userService"

const handleHomeController = (req, res) => {
    return res.render('home.ejs')
}
const handleUserController = (req, res) => {
    return res.render('user.ejs')
}

const handleCreateNewUser = (req, res) => {
    let { email, password, username } = req.body;
   
    // userService.createNewUser(email, password, username)
    userService.getUserList();

    return res.send('h')
}


module.exports = {
    handleHomeController,
    handleUserController,
    handleCreateNewUser
}