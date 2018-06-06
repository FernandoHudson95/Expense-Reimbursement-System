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

    userService.save(user)
      .then(data => {
        resp.json(data);
      })
      .catch(err => {
        console.log(err);
        resp.sendStatus(500);
      });
  }]);

  userRouter.post('/login', (req, resp, next) => {
    const user = req.body && req.body;
  
    // should probably send a call to the db to get the actual user object to determine role
    if (req.body.username === 'admin' && req.body.password === 'admin') {
      req.session.role = 'admin';
      resp.json({
        username: 'admin',
        role: 'admin'
      });
    } else if (req.body.username === 'blake' && req.body.password === 'pass') {
      req.session.role = 'employee';
      resp.json({
        username: 'blake',
        role: 'employee'
      });
    } else {
      resp.sendStatus(401);
    }
  });

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

// userRouter.post('', (req:Request, resp: Response) => {
//     console.log(`adding user: ${JSON.stringify(req.body)}
//         to users`);
//         if(!req.body.name || !req.body.age || !req.body.status) {
//             resp.sendStatus(400);
//         } else{
//             const user = {
//                 name: req.body.name,
//                 age: req.body.age,
//                 status: req.body.status
//             }
//             user.push(u);
//             resp.sendStatus(201);
//         }
//         resp.end();   
// });
