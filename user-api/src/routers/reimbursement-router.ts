import express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as reimbursementService from '../services/reimbursement-service';


export const reimbursementRouter = express.Router();

//  reimbursementRouter.post('', [ //POST STATEMENT THAT GIVE A STRING OF DAY AND TIME FOR TIMESUBMITTED
//    (req, resp) => {             //USE THIS FOR REIMBURSEMENTS 2 TABLE WHERE TIMESUBMITTED IS A STRING

//      function addZero(i) {
//        if (i < 10) {
//            i = "0" + i;
//        }
//        return i;
//    }
  
//    function myFunction() {
//        let d = new Date();
//        var h = addZero(d.getHours());
//        var m = addZero(d.getMinutes());
//        var s = addZero(d.getSeconds());
//        let time = h + ":" + m + ":" + s;
//        let t = new Date();
//        let day = t.toDateString();
//        const timeSubmitted = day + " at " + time;
//        return timeSubmitted ;
//    }

//      const reimbursement = {
//          timeSubmitted: myFunction(),
//          username: req.body.username,
//          type: req.body.type,
//          items: req.body.items,
//          receipts: req.body.receipts,
//          status: req.body.status,
//          approver: req.body.approver

//      }
//      reimbursementService.save(reimbursement)
//        .then(data => {
//          resp.json(data);
//        })
//        .catch(err => {
//          console.log(err);
//          resp.sendStatus(500);
//          resp.send({ error: err.message })
//        });
//   }]);

  reimbursementRouter.post('', [          //POST STATEMENT THAT GIVES A NUMBER OF EPOCH TIME FOR TIMESUBMITTED
  (req, resp) => {                        //USE THIS FOR REIMBURSEMENTS TABLE WHERE TIMESUBMITTED IS A NUMBER

    const t = new Date();
    const timeSubmitted = t.toDateString();

    const reimbursement = {
        timeSubmitted: timeSubmitted,
        username: req.body.username,
        type: req.body.type,
        items: req.body.items,
        receipts: req.body.receipts,
        status: req.body.status,
        approver: req.body.approver

    }
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

reimbursementRouter.put('', (req, resp) => {
  reimbursementService.statusUpdate(req.body)
    .then(data => {
      resp.json(data);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
});

reimbursementRouter.get('/status/:status', (req, resp) => {
  // console.log(req.params.status);
  reimbursementService.reimbursementsByStatus(req.params.status)
    .then(data => {
      resp.json(data.Items);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
});

reimbursementRouter.get('/username/:username', (req, resp) => {
  // console.log(req.params.username);
  reimbursementService.reimbursementsByUsername(req.params.username)
    .then(data => {
      console.log(`Retrieving reimbursements for employee ${req.params.username}`);
      resp.json(data.Items);
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
});



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