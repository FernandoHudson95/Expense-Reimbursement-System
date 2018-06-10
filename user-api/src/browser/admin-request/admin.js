function displayRequests() {
    // console.log(sessionStorage.getItem('username'))
    // let firstname = sessionStorage.getItem('firstname')
    // alert("Welcome to your requests " + username)
    // document.getElementById("user").innerHTML = firstname + "'s reimbursements";
    // let username = sessionStorage.getItem('username')


fetch('http://localhost:3000/reimbursements')
  .then(resp => resp.json())
    .then((requests) => {

        console.log(requests)
        //CLEARS TABLE
        const body = document.getElementById('request-table-body');
        body.innerHTML = '';

        //POPULATES THE TABLE FOR EACH MOVIE
           requests.forEach(addRequests);
        })
        .catch(err => {
            console.log(err);
    });
}

function addRequests(requests) {

    const body = document.getElementById('request-table-body');

    const row = document.createElement('tr'); //CREATES <tr>
    let data = document.createElement('td'); //CREATES <td>
    data.innerText = requests.timeSubmitted; //ASSIGNS VALUE TO THE TD
    row.appendChild(data); //APPENDS THE td TO THE row
    data = document.createElement('td');
    data.innerText = requests.type;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = requests.amount;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = requests.items;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = requests.status;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = requests.approver;
    row.appendChild(data);
    body.appendChild(row);

}

// function displayRequests() {
//     console.log(sessionStorage.getItem('username'))
//     let firstname = sessionStorage.getItem('firstname')
//     // alert("Welcome to your requests " + username)
//     // document.getElementById("user").innerHTML = firstname + "'s reimbursements";
//     let username = sessionStorage.getItem('username')


// fetch('http://localhost:3000/reimbursements/username/' + username)
//   .then(resp => resp.json())
//     .then((requests) => {

//         console.log(requests)
//         //CLEARS TABLE
//         const body = document.getElementById('request-table-body');
//         body.innerHTML = '';

//         //POPULATES THE TABLE FOR EACH MOVIE
//            requests.forEach(addRequests);
//         })
//         .catch(err => {
//             console.log(err);
//     });
// }

// function addRequests(requests) {

//     const body = document.getElementById('request-table-body');

//     const row = document.createElement('tr'); //CREATES <tr>
//     let data = document.createElement('td'); //CREATES <td>
//     data.innerText = requests.timeSubmitted; //ASSIGNS VALUE TO THE TD
//     row.appendChild(data); //APPENDS THE td TO THE row
//     data = document.createElement('td');
//     data.innerText = requests.type;
//     row.appendChild(data);
//     data = document.createElement('td');
//     data.innerText = requests.amount;
//     row.appendChild(data);
//     data = document.createElement('td');
//     data.innerText = requests.items;
//     row.appendChild(data);
//     data = document.createElement('td');
//     data.innerText = requests.status;
//     row.appendChild(data);
//     data = document.createElement('td');
//     data.innerText = requests.approver;
//     row.appendChild(data);
//     body.appendChild(row);

// }

function logOut() {
    fetch('http://localhost:3000/users/logout/')
    .then((data) => {
        alert('Now logging out!')
        window.location= '../sign-in/sign-in.html';
      })
        .catch(err => {
            console.log(err);
    });
}