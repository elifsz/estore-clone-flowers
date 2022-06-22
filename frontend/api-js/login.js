const localhost = 'http://localhost:8080/api/'


function getLogin(email, password) {
    var uriLogin = `${localhost}Users/login?email=${email}&password=${password}`
    fetch(uriLogin)
      .then((res) => {
        return res.text()
      })
      .then((text) => {
        if (text == 'admin') {
          window.location.href = 'admin/flower_management.html'
        } else if (text == 'user') {
          window.location.href = 'index.html'
        } else {
          alert('Wrong email or password')
        }
      })
  }

  function login() {
    var email = $('#user_email').val()
    var password = $('#user_password').val()
    getLogin(email, password)
  }
