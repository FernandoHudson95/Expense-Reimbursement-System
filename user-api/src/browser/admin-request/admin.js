function pending() {
    // console.log(sessionStorage.getItem('username'))
    // let firstname = sessionStorage.getItem('firstname')
    // alert("Welcome to your requests " + username)
    // document.getElementById("user").innerHTML = firstname + "'s reimbursements";
    // let username = sessionStorage.getItem('username')
    document.getElementById("page-title").innerHTML = 'Pending Reimbursements';
let status = "Pending"
fetch('http://localhost:3000/reimbursements/status/' + status)
  .then(resp => resp.json())
    .then((requests) => {

        //CLEARS TABLE
        const body = document.getElementById('request-table-body');
        body.innerHTML = '';
        requests.forEach(addPendingRequests);
        console.log(body);
        let stuff = body.getElementsByTagName('tr');
        console.log(stuff.length);
        
        if(stuff.length === 0){
            document.getElementById("admin-instructions").innerHTML ='No Pending Reimbursements';
            document.getElementById("buttonAppear1").innerHTML ='';
            document.getElementById("buttonAppear2").innerHTML = '';
        }
        else{
        body.innerHTML = '';

        //POPULATES THE TABLE FOR EACH MOVIE
           requests.forEach(addPendingRequests);
        }
        })
        .catch(err => {
            console.log(err);
    });
}

function addPendingRequests(requests) {

// console.log(requests)

    document.getElementById("admin-instructions").innerHTML ='Select a request to approve or deny.';

    const body = document.getElementById('request-table-body');

    const row = document.createElement('tr'); //CREATES <tr>
    let data = document.createElement('td'); //CREATES <td>
    data.innerText = requests.timeSubmitted; //ASSIGNS VALUE TO THE TD
    row.setAttribute("onclick", "addButtons(this);")
    row.setAttribute("style", "cursor: pointer;")
    row.appendChild(data); //APPENDS THE td TO THE row
    data = document.createElement('td');
    data.innerText = requests.username;
    row.appendChild(data);
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

function addButtons(row){
    // console.log(row);
 
    sessionStorage.setItem('rUsername', row.getElementsByTagName("td")[1].innerText)
    sessionStorage.setItem('rTime',  row.getElementsByTagName("td")[0].innerText)
    // console.log(row.getElementsByTagName("td")[1].innerText)
    document.getElementById("buttonAppear1").innerHTML = '<button class="btn btn-danger" background-color="green" onclick="changeToApprove()">Approved</button>';
    document.getElementById("buttonAppear2").innerHTML = '<button class="btn btn-danger" onclick="changeToDeny()">Denied</button>';
    document.getElementById("admin-instructions").innerHTML = "Reimbursement by " + row.getElementsByTagName("td")[1].innerText + " on " + row.getElementsByTagName("td")[0].innerText ;

}

function changeToApprove(row) {
    rUsername = sessionStorage.getItem('rUsername')
    rTime = sessionStorage.getItem('rTime')
    let status = {
        username: rUsername,
        timeSubmitted: rTime,
        status: "Approved",
        approver: sessionStorage.getItem('username')
    }
    fetch('http://localhost:3000/reimbursements/update', {
        body: JSON.stringify(status),
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        method: 'POST'
      })
    .then(resp => resp.json())
      .then((requests) => {
  
          pending();

          })
          .catch(err => {
              console.log(err);
      });
}
function changeToDeny() {
     rUsername = sessionStorage.getItem('rUsername')
    rTime = sessionStorage.getItem('rTime')
    let status = {
        username: rUsername,
        timeSubmitted: rTime,
        status: "Denied",
        approver: sessionStorage.getItem('username')
    }
    fetch('http://localhost:3000/reimbursements/update', {
        body: JSON.stringify(status),
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        method: 'POST'
      })
    .then(resp => resp.json())
      .then((requests) => {
  
          pending();
          
          })
          .catch(err => {
              console.log(err);
      });
}



function addOtherRequests(requests) {
    document.getElementById("admin-instructions").innerHTML ='';
    document.getElementById("buttonAppear1").innerHTML ='';
    document.getElementById("buttonAppear2").innerHTML = '';

    const body = document.getElementById('request-table-body');

    const row = document.createElement('tr'); //CREATES <tr>
    let data = document.createElement('td'); //CREATES <td>
    data.innerText = requests.timeSubmitted; //ASSIGNS VALUE TO THE TD
    // row.setAttribute("onclick", "changeStatus(this)")
    row.appendChild(data); //APPENDS THE td TO THE row
    data = document.createElement('td');
    data.innerText = requests.username;
    row.appendChild(data);row.appendChild(data); //APPENDS THE <td> TO THE ROW
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

function approved() {
    document.getElementById("page-title").innerHTML = 'Approved Reimbursements';
    
    let status = "Approved"
    fetch('http://localhost:3000/reimbursements/status/' + status)
      .then(resp => resp.json())
        .then((requests) => {
    
            //CLEARS TABLE
            const body = document.getElementById('request-table-body');
            body.innerHTML = '';
    
            //POPULATES THE TABLE FOR EACH MOVIE
               requests.forEach(addOtherRequests);
            })
            .catch(err => {
                console.log(err);
        });
}

function denied() {
    document.getElementById("page-title").innerHTML = 'Denied Reimbursements';
    let status = "Denied"
fetch('http://localhost:3000/reimbursements/status/' + status)
  .then(resp => resp.json())
    .then((requests) => {

        //CLEARS TABLE
        const body = document.getElementById('request-table-body');
        body.innerHTML = '';

        //POPULATES THE TABLE FOR EACH MOVIE
           requests.forEach(addOtherRequests);
        })
        .catch(err => {
            console.log(err);
    });
}

function changeStatus(x) {
    // console.log(x.rowIndex)
    let status = document.getElementsByTagName("td");
    // .rows[0].cells[0].innerHTML
    // console.log(status)

    // var rows = document.getElementsByTagName("td");
    // console.log(x.innerText)
    // if(x.innerText === "Pending"){
    //     alert("New status is changed")
    // }
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