const testApi = (req, res) => {
    return res.status(200).send({
        mess: 'ok',
        data: 'test api'
    })
}
module.exports = {
    testApi
}