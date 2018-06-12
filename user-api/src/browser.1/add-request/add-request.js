let items = [];
let items1 = [];
let count = 0;

function submitRequest() {
  // console.log(sessionStorage.getItem('username'))
  // let username = sessionStorage.getItem('username')

 
  //     let elem = document.getElementById('container').elements;
  //           for(var i = 0; i < elem.length-4; i++) {
  //               items1.push(elem[i].value)
  //           } 
  //           console.log(items1)

  // let item = {
  //   username: sessionStorage.getItem('username'),
  //   title: document.getElementById('types-dropdown')[document.getElementById('types-dropdown').selectedIndex].textContent,
  //   amount: document.getElementById('request-amount').value,
  //   item: items1
  // }
  // items.push(item);


  //THIS WORKS , GO BACK TO HERE IF IT DOESNT WORK ANYMORE
  let item = {
    username: sessionStorage.getItem('username'),
    title: document.getElementById('types-dropdown')[document.getElementById('types-dropdown').selectedIndex].textContent,
    amount: document.getElementById('request-amount').value,
    item: document.getElementById('reimbursement-description').value,
  }
  items.push(item);
  //UP TO THIS CODE ABOVE ^^^^^^^^
  
  console.log(items)

  //USE THIS BELOW TO GET ALL ELEMENTS IN MULTIPLE ROWS IN AN ARRAY
  //
  // var elem = document.getElementById('container').elements;
  //       for(var i = 0; i < elem.length-4; i++)
  //       {
  //           items1.push(elem[i].value)
  //       } 
  //       console.log(items1)


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
      window.location = '../main-request/request.html';
    })
    .catch(err => {
      console.log(err);
    });
}

function grabElements() {
  var str = '';

  let table = document.getElementById('request');
  let rowCount = table.rows.length
  let cellCount = table.rows[0].cells.length

  var elem = document.getElementById('container').elements;
  for (var i = 0; i < elem.length - 4; i++) {
    str += "<b>Value:</b><i>" + elem[i].value + "</i>&nbsp;&nbsp;";
    str += "<BR>";
    items.push(elem[i].value)
  }
  document.getElementById('lblValues').innerHTML = str;
  console.log(items)
}

function newRequest() {

  //IF USER CLICKS ADD ITEM AND FIELDS ARE EMPTY, EMPTY STRING WILL BE PUSHED TO THE ARRAY CAUSING AN ERROR
  //NEED TO FIX THIS WITH A SWITCH OF IF TO ONLY ADD IF STRINGS ARE NOT EMPTY

  // let item = {
  //   title: document.getElementById('types-dropdown')[document.getElementById('types-dropdown').selectedIndex].textContent,
  //   amount: document.getElementById('request-amount').value,
  //   item: document.getElementById('reimbursement-description').value
  // }
  // items.push(item);


  // console.log(items);
  // console.log(items[0].amount)
  // console.log(items[0].item)
  // if (items[0].amount === '' && items[0].item === '') {
  //   document.getElementById("warning").style.color = "red";
  //   document.getElementById("warning").innerHTML = "Can not have empty fields";
  // }
  // else{
  let table = document.getElementById('request');
  let rowCount = table.rows.length;
  count++;
  console.log(count)
  let row = table.insertRow(rowCount);
  let colCount = table.rows[0].cells.length;
  for (let i = 0; i < colCount; i++) {
    let newcell = row.insertCell(i);
    newcell.innerHTML = table.rows[0].cells[i].innerHTML;

  }
  // }
}

function deleteRequest() {
  if ((document.getElementById('request')).rows.length >= 2) {
    count--;
    console.log(count);
    let table = document.getElementById('request');
    let rows = table.getElementsByTagName('TR');
    // if( table.rows.length <2);
    table.removeChild(rows[rows.length - 1]);
  }
  else {
    // alert("One request must be submitted")
    document.getElementById("warning").style.color = "red";
    document.getElementById("warning").innerHTML = "One request must be submitted";
  }
}