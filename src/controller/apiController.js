import loginRegisterService from '../service/loginRegisterService'
const testApi = (req, res) => {
    return res.status(200).json({
        mess: 'ok',
        data: 'test api'
    })
}
const handleRegister = async (req, res) => {

    let { email, phone, username, password } = req.body;
    try {
        if (!email || !phone || !password) {
            return res.status(200).json({
                EM: "Missing required parameter",
                EC: "1",
                DT: ''
            })
        }



        //service creat user
        let data = await loginRegisterService.registerNewUser({email,phone,username,password})

        return res.status(200).json({

            EM: data.EM,
            EC: data.EC,
            DT: ''

        })
    } catch (error) {
        res.status(500).json({
            EM: 'error',
            EC: '-1',
            DT: ''
        })
    }

}

module.exports = {
    testApi,
    handleRegister
}