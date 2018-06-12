import express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as reimbursementService from '../services/reimbursement-service';


export const reimbursementRouter = express.Router();

reimbursementRouter.post('/new', [ //POST STATEMENT THAT GIVES A STRING OF DAY AND TIME FOR TIMESUBMITTED
  (req, resp) => {             //USE THIS FOR REIMBURSEMENTS 2 TABLE WHERE TIMESUBMITTED IS A STRING

    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    function myFunction() {
      let d = new Date();
      var h = addZero(d.getHours());
      var m = addZero(d.getMinutes());
      var s = addZero(d.getSeconds());
      let time = h + ":" + m + ":" + s;
      let t = new Date();
      let day = t.toDateString();
      const timeSubmitted = day + " at " + time;
      return timeSubmitted;
    }

    //  console.log(req.session.username)

    let timeSubmitted = myFunction();
    let username = req.body[0].username;
    let type = req.body[0].title;
    let items = req.body[0].item
    let amount = req.body[0].amount;
    let status = 'Pending';
    let approver = 'Pending'

    let reimbursement = { timeSubmitted, username, type, items, amount, status, approver }
    reimbursementService.save(reimbursement)
      .then(data => {
        resp.json(data);
      })
      .catch(err => {
        console.log(err);
        resp.sendStatus(500);
        resp.send({ error: err.message })
      });
  }]);

// reimbursementRouter.post('/new', [          //POST STATEMENT THAT GIVES A NUMBER OF EPOCH TIME FOR TIMESUBMITTED
// (req, resp) => {                        //USE THIS FOR REIMBURSEMENTS TABLE WHERE TIMESUBMITTED IS A NUMBER

//   // console.log(req.body[0].title)  //THIS NEEDS [0] BECAUSE IT GETS INSIDE OF THE BODY ARRAY AND GETS WHATEVER AFTER IS CALLED
//   // consoley.log(req.sessionStore.sessions)
//   // console.log(req.sessionStore.sessions.cookie)
//   // let usernametest = sessionStorage.getItem('username')
//   // console.log(sessionStorage)

//   let timeSubmitted= Date.now();
//   let username = req.body[0].username;
//   let type = req.body[0].title;
//   let items = req.body[0].item
//   let amount = req.body[0].amount;
//   let status = 'Pending';
//   let approver = 'Pending'

//   let reimbursement = {timeSubmitted, username, type, items, amount, status, approver}

//   reimbursementService.save(reimbursement)
//     .then(data => {
//       resp.json(data);
//     })
//     .catch(err => {  
//       console.log(err);
//       resp.sendStatus(500);
//       resp.send({ error: err.message })
//     });
// }]);

reimbursementRouter.post('/update', (req, resp) => {
  console.log(req.body)
  reimbursementService.statusUpdate(req.body)
    .then(data => {
      resp.json(data);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
});

reimbursementRouter.get('/status/:status', (req, resp, next) => {
  console.log(req.params.status);
  reimbursementService.reimbursementsByStatus(req.params.status)
    .then(data => {
      resp.json(data.Items);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
});

reimbursementRouter.get('/username/:username', (req, resp, next) => {
  // console.log(req.params.username);
  // let username = req.session.username;
  reimbursementService.reimbursementsByUsername(req.params.username)
    .then(data => {
      // console.log(`Retrieving reimbursements for employee ${req.params.username}`);
      resp.json(data.Items);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
});

reimbursementRouter.get('/username/:username/status/:status', (req, resp, next) => {
  // console.log(req.params.username);
  // let username = req.session.username;
  reimbursementService.reimbursementsByUsername(req.params.username)
    .then(data => {
      // console.log(`Retrieving reimbursements for employee ${req.params.username}`);
      resp.json(data.Items);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
});

// reimbursementRouter.get('', (req, resp, next) => {
//   // console.log(req.params.username);
//   reimbursementService.allReimbursements(req.params.username)
//     .then(data => {
//       console.log(`Retrieving all reimbursements for employee ${req.params.username}`);
//       resp.json(data.Items);
//     })
//     .catch(err => {
//       console.log(err);
//       resp.sendStatus(500);
//     });
// });



// reimbursementRouter.post('', [
//   (req, resp) => {
//     reimbursementService.save(req.body)
//       .then(data => {
//         resp.json(data);
//       })
//       .catch(err => {
//         console.log(err);
//         resp.sendStatus(500);
//         resp.send({ error: err.message })
//       });
//   }]);

// reimbursementRouter.get('/timeSubmitted/:timeSubmitted', (req, resp) => {
//   // console.log(req.params.timeSubmitted);
//   reimbursementService.allReimbursementsByTime(req.params.timeSubmitted)
//     .then(data => {
//       resp.json(data.Items);
//     })
//     .catch(err => {
//       console.log(err);
//       resp.sendStatus(500);
//     });
// });