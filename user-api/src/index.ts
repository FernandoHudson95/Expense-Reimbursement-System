import express from 'express';
import {Request, Response, NextFunction} from 'express';
import path from 'path';
import{ userRouter} from './routers/user-router';
import session from 'express-session';
import bodyParser from 'body-parser';
import { reimbursementRouter } from './routers/reimbursement-router';

const app = express();

const port = 3000;
app.set('port', port);

const sess = {
    secret: 'keyboard cat',
    cookie: { secure: false },
    resave: true,
    saveUninitialized: false
  };

  // set up express to attach sessions
app.use(session(sess));

// allow static content to be served, navigating to url with nothing after / will serve index.html from public
app.use(
    express.static(path.join(__dirname, 'browser'))
  );

//   // allow cross origins
// app.use((req, resp, next) => {
//     resp.header("Access-Control-Allow-Origin", "*");
//     resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   })
  

/**
 * Log all requests url and method to the console
 */
app.use((req: Request, resp: Response, next: NextFunction) => {
console.log(`request was made with url: ${req.path} 
and method: ${req.method}`)
next();
});

// //WAY TO CHECK HOW IT REGISTERS AND RUNS THROUGH MIDDLEWARE, NOT IMPORTANT
// app.get('/pizzas', (req, resp, next) => {
//     console.log('middleware 1 for get pizzas');
//     next();
// });
// app.get('/pizzas', (req, resp, next) => {
//     console.log('middleware 2 for get pizzas');
//     next();
// });
// app.get('/pizzas', (req, resp, next) => {
//     console.log('middleware 3 for get pizzas');
//     next();
// });
// app.get('/pizzas', (req, resp, next) => {
//     console.log('middleware 4 for get pizzas');
//     next();
// });

//REGISTER THE BODY PARSER TO CONVERT REQUEST JSON TO AN ACTUAL OBJECT
app.use(bodyParser.json());

/**************************************************************
 * Register Routers
 **************************************************************/
app.use('/users', userRouter); //USED TO REGISTER A NEW USER LOG IN ACCOUNT

app.use('/reimbursements', reimbursementRouter); //USED TO ADD A NEW REIMBURSEMENT REQUEST AND ACCES REIMBURSEMENT REQUESTS

app.listen(port, () => {
    console.log(`app is running at http://localhost:${app.get('port')}`);
});