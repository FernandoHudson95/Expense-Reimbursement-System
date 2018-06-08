import express from 'express';
import * as userService from '../services/user-service';
import * as userClass from '../class/user-class';
// import {Request, Response, NextFunction} from 'express';
import { authMiddleware } from '../security/auth-middleware';

export const userRouter = express.Router();


userRouter.post('', [
  (req, resp) => {

    const user = {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      role: req.body.role,
      username: req.body.username
    }
    console.log('made it into the router');

    userService.save(user)
      .then(data => {
        resp.json(data);
      })
      .catch(err => {
        console.log(err);
        resp.sendStatus(500);
      });
  }]);

userRouter.post('/login', (req, resp) => {
  console.log('Made it to the router')

  userService.checkUser(req.body.username, req.body.password)
    .then(data => {
      console.log(data)
      if(data.Count === 1){
        resp.json(data.Items);
      }
      else{
        resp.sendStatus(401);
      }
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
});

//MIGHT ADD THIS CODE INTO ABOVE CODE TO CHECK AND ADD SESSIONS

// if (req.body.username === 'admin' && req.body.password === 'admin') {
//   req.session.role = 'admin';
//   resp.json({
//     username: 'admin',
//     role: 'admin'
//   });
// } else {
//   req.session.role = 'employee';
//   resp.json({
//     username: req.body.username,
//     role: req.body.password
//   });


//POSSIBLY WILL ADD FUNCTIONALITY TO DELETE USER ACCOUNT BELOW (USE NETNINJA VIDEO #11)

//   userRouter.delete('/username/:username', (req:Request, resp:Response) =>{
//     users = users.filter((p) => p.name !== req.params.name);
//     resp.end();
// });


// userRouter.get('/name/:name', (req: Request, resp: Response) => {
//    const name = req.params.name;   
//    console.log(`retrieving user with name ${name}`);
//    for (let u of users) {
//        if(u.name === name) {
//            resp.json(u);
//            return;
//        }
//    }
//    resp.end();
// });

