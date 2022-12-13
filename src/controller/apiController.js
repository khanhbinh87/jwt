const testApi = (req, res) => {
    return res.status(200).json({
        mess: 'ok',
        data: 'test api'
    })
}
const handleRegister = (req, res) => {
    console.log('call me',req.body)
   
}

module.exports = {
    testApi,
    handleRegister
}