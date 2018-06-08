let items = [];

function submitRequest() {

  let item = {
    title: document.getElementById('types-dropdown')[document.getElementById('types-dropdown').selectedIndex].textContent,
    amount: document.getElementById('request-amount').value,
    item: document.getElementById('reimbursement-description').value,
    username: req.session.username
  }
  items.push(item);

    fetch('http://localhost:3000/reimbursements/new', {
      body: JSON.stringify(items),
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
      alert('Reimbursement was added')
      window.location= '../main-request/request.html';
    })
    .catch(err => {
      console.log(err);
    });
}

function newRequest() {

  let item = {
    title: document.getElementById('types-dropdown')[document.getElementById('types-dropdown').selectedIndex].textContent,
    amount: document.getElementById('request-amount').value,
    item: document.getElementById('reimbursement-description').value
  }
  items.push(item);
  console.log(items);
  let table = document.getElementById('request');
  let rowCount = table.rows.length;
  let row = table.insertRow(rowCount);
  let colCount = table.rows[0].cells.length;
  for (let i = 0; i < colCount; i++) {
    let newcell = row.insertCell(i);
    newcell.innerHTML = table.rows[0].cells[i].innerHTML;
    switch (newcell.childNodes[0].type) {
      case "text":
        newcell.childNodes[0].value = "";
        newcell.childNodes[0].id = "txt" + rowCount;
        break;
    }
  }
}

function deleteRequest() {
  if((document.getElementById('request')).rows.length >= 2){
    let table =document.getElementById('request');
    let rows=table.getElementsByTagName('TR');
    // if( table.rows.length <2);
		table.removeChild(rows[rows.length-1]);
  }
  else{
    // alert("One request must be submitted")
    document.getElementById("warning").style.color = "red";
    document.getElementById("warning").innerHTML = "One request must be submitted";
  }
}