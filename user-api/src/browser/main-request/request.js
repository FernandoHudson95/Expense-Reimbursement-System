function displayRequests() {
    // console.log(sessionStorage.getItem('username'))
    let firstname = sessionStorage.getItem('firstname')
    // alert("Welcome to your requests " + username)
    document.getElementById("user").innerHTML = firstname + "'s reimbursements";
    let username = sessionStorage.getItem('username')


    fetch('http://localhost:3000/reimbursements/username/' + username)
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

let count = 0;

function addRequests(requests) {
    count++;
    console.log(count)
    const body = document.getElementById('request-table-body');

    let row = document.createElement('tr'); //CREATES <tr>
    let data = document.createElement('td'); //CREATES <td>
    data.innerText = requests.timeSubmitted; //ASSIGNS VALUE TO THE TD
    row.setAttribute("onclick", "showItems(this);")
    row.setAttribute("style", "cursor: pointer;")
    row.appendChild(data); //APPENDS THE td TO THE row
    // data = document.createElement('td');
    // data.innerText = requests.type;
    // row.appendChild(data);
    // data = document.createElement('td');
    // data.innerText = requests.amount;
    // row.appendChild(data);
    // data = document.createElement('td');
    // data.innerText = requests.items;
    // row.appendChild(data);
    data = document.createElement('td');
    data.innerText = requests.status;
    row.appendChild(data);
    data = document.createElement('td');
    data.innerText = requests.approver;
    row.appendChild(data);
    body.appendChild(row);

    // let row1 = document.createElement('tr'); //CREATES <tr>
    // let data1 = document.createElement('td'); //CREATES <td>
    // data.setAttribute("class", "hiddenRow")
    // let div = document.createElement('div');
    // div.setAttribute("id", `"#demo${count}"`)
    // div.setAttribute("class", "accordian-body collapse")
    // div.innerText= requests.items;
    // data1.appendChild(div);
    // row1.appendChild(data1);
    // // data = document.createElement('td');
    // // data.innerText = requests.amount;
    // // row.appendChild(data);
    // // data = document.createElement('td');
    // // data.innerText = requests.description;
    // // row.appendChild(data);
    // // data = document.createElement('td');
    // // data.innerText = requests.date;
    // // row.appendChild(data);
    // body.appendChild(row1);


}

function showItems(row) {
    console.log(row)
    let username = sessionStorage.getItem('username')
    document.getElementById("ticket").innerText = `Ticket from ${row.getElementsByTagName("td")[0].innerText}`
    document.getElementById("instructions").innerText = ''


    fetch('http://localhost:3000/reimbursements/username/' + username)
        .then(resp => resp.json())
        .then((requests) => {

            // console.log(requests[row.rowIndex].items)
            // console.log(row.rowIndex)
            //CLEARS TABLE
            const body = document.getElementById('items-table');
            if (body.innerHTML !== '') {
                body.innerHTML = '';
                // requests.forEach(addItems);
                addItems(requests[row.rowIndex - 1].items)
            }
            else {
                // requests.forEach(addItems);
                addItems(requests[row.rowIndex - 1].items)

            }
        })
        .catch(err => {
            console.log(err);
        });
}

function addItems(requests) {
    // count++;
    const body = document.getElementById('items-table');
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

    console.log(requests.length)
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
            window.location = '../sign-in/sign-in.html';
        })
        .catch(err => {
            console.log(err);
        });
}