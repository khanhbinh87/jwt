
import mysql from 'mysql2'

// // create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
});



const handleHomeController = (req, res) => {
    return res.render('home.ejs')
}
const handleUserController = (req, res) => {
    return res.render('user.ejs')
}

const handleCreateNewUser = (req, res) => {
    let { email, password, username } = req.body;
    // simple query

    connection.query(`INSERT INTO users(email, password, username) VALUES(?,?,?)`, [email, password, username],
        function (err, results, fields) {
            console.log(results); 
            
        }
    )
   
    return res.send('e')
}
module.exports = {
    handleHomeController,
    handleUserController,
    handleCreateNewUser
}