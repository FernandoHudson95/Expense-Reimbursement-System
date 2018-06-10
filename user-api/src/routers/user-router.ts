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

  userService.checkUser(req.body.username)
    .then(data => {
      // console.log(data)  //THIS IS WHERE I CAN SEE THE ITEMS BEING SENT BACK. CHECKS USERNAME AND PASS
      if(req.body.password === data.Items[0].password) {
        console.log('Logged in.'); 
        req.session.username = data.Items[0].username;
        req.session.role = data.Items[0].role;
        //console.log(req.session.username)  //THIS SHOWS THE USERNAME THAT IS SAVED IN THE SESSION
        //console.log(req.session.role)   //THIS SHOWS THE USERS ROLE SAVED IN THE SESSION
        //console.log(data.Items)
        resp.json(data.Items);
      } else {
        console.log('something was entered wrong');
        resp.sendStatus(418);
      }
    })
    .catch(err => {
      console.log(err);
      resp.sendStatus(500);
    });
});

userRouter.get('/logout', (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/sign-in/sign-in.html');
      }
    });
  }
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

