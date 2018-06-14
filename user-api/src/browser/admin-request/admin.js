function pending() {
    // console.log(sessionStorage.getItem('username'))
    // let firstname = sessionStorage.getItem('firstname')
    // alert("Welcome to your requests " + username)
    // document.getElementById("user").innerHTML = firstname + "'s reimbursements";
    // let username = sessionStorage.getItem('username')
    document.getElementById("buttonAppear1").innerHTML = '';
    document.getElementById("buttonAppear2").innerHTML = '';
    document.getElementById("page-title").innerHTML = 'Pending Reimbursements';
    document.getElementById('admin-items-table').innerHTML = '';
    
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

            if (stuff.length === 0) {
                document.getElementById("admin-instructions").innerHTML = 'No Pending Requests';
                document.getElementById("buttonAppear1").innerHTML = '';
                document.getElementById("buttonAppear2").innerHTML = '';
            }
            else {
                body.innerHTML = '';

                requests.forEach(addPendingRequests);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function addPendingRequests(requests) {

    // console.log(requests)

    document.getElementById("admin-instructions").innerHTML = 'Select a ticket to approve or deny.';

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
    data.innerText = requests.status;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = requests.approver;
    row.appendChild(data);
    body.appendChild(row);
}

function addButtons(row) {
    // console.log(row)

    let username = row.getElementsByTagName("td")[1].innerText
    let timeSubmitted = row.getElementsByTagName("td")[0].innerText

    // console.log(username)


    fetch('http://localhost:3000/reimbursements/username/' + username + '/timeSubmitted/' + timeSubmitted)
        .then(resp => resp.json())
        .then((requests) => {
            // console.log(requests[row.rowIndex].items)
            // console.log(row.rowIndex)
            //CLEARS TABLE
            const body = document.getElementById('admin-items-table');
            if (body.innerHTML !== '') {
                body.innerHTML = '';
                addItems(requests.items)
            }
            else {
                addItems(requests.items)

            }
        })
        .catch(err => {
            console.log(err);
        });

    sessionStorage.setItem('rUsername', row.getElementsByTagName("td")[1].innerText)
    sessionStorage.setItem('rTime', row.getElementsByTagName("td")[0].innerText)
    // console.log(row.getElementsByTagName("td")[1].innerText)
    document.getElementById("buttonAppear1").innerHTML = '<button class="btn" style="-webkit-text-fill-color: white; background-color:green" onclick="changeToApprove()">Approve</button>';
    document.getElementById("buttonAppear2").innerHTML = '<button class="btn" style="-webkit-text-fill-color: white; background-color: #d30202" onclick="changeToDeny()">Deny</button>';
    document.getElementById("admin-instructions").innerHTML = row.getElementsByTagName("td")[1].innerText + "'s ticket from " + row.getElementsByTagName("td")[0].innerText;

}

function addItems(requests) {
    // count++;
    const body = document.getElementById('admin-items-table');
    let row = document.createElement('tr'); //CREATES <tr>
    let data = document.createElement('th'); //CREATES <td>
    data.innerText = "Type"; //ASSIGNS VALUE TO THE TD
    row.appendChild(data); //APPENDS THE td TO THE row
    data = document.createElement('th');
    data.innerText = "Amount";
    row.appendChild(data);
    data = document.createElement('th');
    data.innerText = "Description";
    row.appendChild(data);
    data = document.createElement('th');
    data.innerText = "Date of Expense";
    row.appendChild(data);
    body.appendChild(row);

    // console.log(requests.length)
    for (let i = 0; i < requests.length; i += 4) {
        let row = document.createElement('tr'); //CREATES <tr>
        let data = document.createElement('td'); //CREATES <td>
        data.innerText = requests[i]; //ASSIGNS VALUE TO THE TD
        row.appendChild(data); //APPENDS THE td TO THE row
        data = document.createElement('td');
        data.innerText = requests[i + 1];
        row.appendChild(data);
        data = document.createElement('td');
        data.innerText = requests[i + 2];
        row.appendChild(data);
        data = document.createElement('td');
        data.innerText = requests[i + 3];
        row.appendChild(data);
        body.appendChild(row);
    }

}

function changeToApprove(row) {
    document.getElementById('admin-items-table').innerHTML = '';

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
            // document.getElementById('admin-items-table').innerHTML = '';
            document.getElementById("buttonAppear1").innerHTML = '';
            document.getElementById("buttonAppear2").innerHTML = '';
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
            document.getElementById('admin-items-table').innerHTML = '';
            document.getElementById("buttonAppear1").innerHTML = '';
            document.getElementById("buttonAppear2").innerHTML = '';
            pending();

        })
        .catch(err => {
            console.log(err);
        });
}



function addOtherRequests(requests) {
    

    const body = document.getElementById('request-table-body');

    const row = document.createElement('tr'); //CREATES <tr>
    let data = document.createElement('td'); //CREATES <td>
    data.innerText = requests.timeSubmitted; //ASSIGNS VALUE TO THE TD
    row.setAttribute("onclick", "showItems(this)")
    row.setAttribute("style", "cursor: pointer;")
    row.appendChild(data); //APPENDS THE td TO THE row
    data = document.createElement('td');
    data.innerText = requests.username;
    row.appendChild(data); row.appendChild(data); //APPENDS THE <td> TO THE ROW
    data = document.createElement('td');
    data.innerText = requests.status;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = requests.approver;
    row.appendChild(data);
    body.appendChild(row);
}

function showItems(row) {
    let username = row.getElementsByTagName("td")[1].innerText
    let timeSubmitted = row.getElementsByTagName("td")[0].innerText
    document.getElementById("buttonAppear1").innerHTML = '';
    document.getElementById("buttonAppear2").innerHTML = '';

    sessionStorage.setItem('rUsername', row.getElementsByTagName("td")[1].innerText)
    sessionStorage.setItem('rTime', row.getElementsByTagName("td")[0].innerText)
    document.getElementById("admin-instructions").innerHTML = row.getElementsByTagName("td")[1].innerText + "'s ticket from " + row.getElementsByTagName("td")[0].innerText;

    fetch('http://localhost:3000/reimbursements/username/' + username + '/timeSubmitted/' + timeSubmitted)
        .then(resp => resp.json())
        .then((requests) => {

            //CLEARS TABLE
            const body = document.getElementById('admin-items-table');
            if (body.innerHTML !== '') {
                body.innerHTML = '';
                addItems(requests.items)
            }
            else {
                addItems(requests.items)

            }
        })
        .catch(err => {
            console.log(err);
        });

    sessionStorage.setItem('rUsername', row.getElementsByTagName("td")[1].innerText)
    sessionStorage.setItem('rTime', row.getElementsByTagName("td")[0].innerText)
}

function approved() {
    document.getElementById("page-title").innerHTML = 'Approved Reimbursement Requests';
    document.getElementById("buttonAppear1").innerHTML = '';
    document.getElementById("buttonAppear2").innerHTML = '';
    document.getElementById('admin-items-table').innerHTML = '';
    document.getElementById("admin-instructions").innerHTML = 'Select a ticket to see more information';


    let status = "Approved"
    fetch('http://localhost:3000/reimbursements/status/' + status)
        .then(resp => resp.json())
        .then((requests) => {

            //CLEARS TABLE
            const body = document.getElementById('request-table-body');
            body.innerHTML = '';

            requests.forEach(addOtherRequests);
        })
        .catch(err => {
            console.log(err);
        });
}

function denied() {
    document.getElementById("page-title").innerHTML = 'Denied Reimbursement Requests';
    document.getElementById("buttonAppear1").innerHTML = '';
    document.getElementById("buttonAppear2").innerHTML = '';
    document.getElementById('admin-items-table').innerHTML = '';
    document.getElementById("admin-instructions").innerHTML = 'Select a ticket to see more information';

    let status = "Denied"
    fetch('http://localhost:3000/reimbursements/status/' + status)
        .then(resp => resp.json())
        .then((requests) => {

            //CLEARS TABLE
            const body = document.getElementById('request-table-body');
            body.innerHTML = '';

            requests.forEach(addOtherRequests);
        })
        .catch(err => {
            console.log(err);
        });
}


function addItems(requests) {
    // count++;
    const body = document.getElementById('admin-items-table');
    let row = document.createElement('tr'); //CREATES <tr>
    let data = document.createElement('th'); //CREATES <td>
    data.innerText = "Type"; //ASSIGNS VALUE TO THE TD
    row.appendChild(data); //APPENDS THE td TO THE row
    data = document.createElement('th');
    data.innerText = "Amount";
    row.appendChild(data);
    data = document.createElement('th');
    data.innerText = "Description";
    row.appendChild(data);
    data = document.createElement('th');
    data.innerText = "Date of Expense";
    row.appendChild(data);
    body.appendChild(row);

    for (let i = 0; i < requests.length; i += 4) {
        let row = document.createElement('tr'); //CREATES <tr>
        let data = document.createElement('td'); //CREATES <td>
        data.innerText = requests[i]; //ASSIGNS VALUE TO THE TD
        row.appendChild(data); //APPENDS THE td TO THE row
        data = document.createElement('td');
        data.innerText = requests[i + 1];
        row.appendChild(data);
        data = document.createElement('td');
        data.innerText = requests[i + 2];
        row.appendChild(data);
        data = document.createElement('td');
        data.innerText = requests[i + 3];
        row.appendChild(data);
        body.appendChild(row);
    }

}

function logOut() {
    fetch('http://localhost:3000/users/logout/')
        .then((data) => {
            alert('Now logging out!')
            sessionStorage.clear();
            window.location = '../sign-in/sign-in.html';
        })
        .catch(err => {
            console.log(err);
        });
}