function login() {
  const username = document.getElementById('inputUsername').value;
  const password = document.getElementById('inputPassword').value;

  const credentials = { username, password }; // this will create an object like {username: 'blake', password: 'pass'} based on the values in those variables

  fetch('http://localhost:3000/users/login', {
    body: JSON.stringify(credentials),
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    method: 'POST'
  })
    .then(resp => {
      // console.log(resp.status)
      if (resp.status === 200) {
        console.log('Valid Credentials')
        return resp.json();
      }
      throw 'Unable to login at this time, please try again later';
    })
    .then(data => {
      // alert(data[0].username)
      // console.log(data[0])
      sessionStorage.setItem('username', data[0].username)
      sessionStorage.setItem('firstname', data[0].firstname)
      console.log(sessionStorage)
      // alert("Welcome " + data[0].firstname)
      if(data[0].role === "Admin"){
        window.location = '../admin-request/admin.html';
      }
      else if(data[0].role === "Employee"){
      window.location = '../main-request/request.html';
      }
      else{
        document.getElementById('invalid-credentials').innerHTML = "Employee role is not found!";
      }
    })
    .catch(err => {
      console.log(err);
      document.getElementById('invalid-credentials').innerHTML = "Invalid Username/Password!";
    })

}
