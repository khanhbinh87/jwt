import userService from "../service/userService"

const handleHomeController = (req, res) => {
    return res.render('home.ejs')
}
const handleUserController = async (req, res) => {
    let userList = await userService.getUserList();
    
    return res.render('user.ejs',{
        userList
    })
}

const handleCreateNewUser = (req, res) => {
    let { email, password, username } = req.body;
   
     userService.createNewUser(email, password, username)


    return res.send('h')
}


module.exports = {
    handleHomeController,
    handleUserController,
    handleCreateNewUser
}