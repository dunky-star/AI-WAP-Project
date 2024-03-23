const Cookies = require('js-cookie')

const saveToken = (token) => {
    // localStorage.setItem('token', token);
    Cookies.set('token', token)
}

const getToken = () => {
    return Cookies.get('token')
}

module.exports = {
    saveToken,
    getToken
}