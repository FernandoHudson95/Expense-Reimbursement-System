function addUser() {
  const firstname = document.getElementById('employee-first-name').value;
  const lastname = document.getElementById('employee-last-name').value;
  const username = document.getElementById('employee-username').value;
  const password = document.getElementById('employee-password').value;
  const email = document.getElementById('employee-email').value;
  const role = document.getElementById('employee-role').value;

  const newUser = {firstname, lastname, username, password, email, role};

  console.log(newUser);

    fetch('http://localhost:3000/users', {
      body: JSON.stringify(newUser),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    // .then(resp => {
    //   if (resp.status === 401 || resp.status === 403) {
    //     alert('invalid permissions')
    //     throw 'Invalid permissions';
    //   }
    //   return resp.json();
    // })
    .then((data) => {
      console.log('user was added')
      window.location= '../sign-in/sign-in.html';
    })
    .catch(err => {
      console.log(err);
    });
}
