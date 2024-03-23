
const saveToken = (token, res) => {
    // localStorage.setItem('token', token);
  
    res.cookie('AUTH',token,{
      domain: 'localhost',
      path:'/'
  })
}


module.exports = {
    saveToken
}