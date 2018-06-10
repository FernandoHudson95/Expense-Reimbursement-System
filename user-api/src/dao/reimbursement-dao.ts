import aws from 'aws-sdk';
import {ConfigurationOptions} from 'aws-sdk/lib/config';
const awsConfig: ConfigurationOptions = {
  region: 'us-east-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}

aws.config.update(awsConfig);

const dynamodb = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient(); // subset of functionality of dynamodb

export function saveReimbursement(reimbursement): Promise<any> {
  return docClient.put({
    TableName: 'Reimbursements2',
    Item: reimbursement
  }).promise();
}

export function statusUpdate(timeSubmitted): Promise<any> {
    // console.log('Remibursement Dao');
    return docClient.update({
        TableName: 'Reimbursements',
        Key: {
            timeSubmitted: timeSubmitted.timeSubmitted,
            username: timeSubmitted.username
          },
            UpdateExpression: 'set #stat = :s',
            ConditionExpression: 'attribute_exists(timeSubmitted)',

            ExpressionAttributeNames: {
            '#stat': 'status'
            },
            ExpressionAttributeValues: {
            ':s': timeSubmitted.status
            }
    }).promise();
}

export function reimbursementsByStatus(status): Promise<any> {
  // console.log('Remibursement Dao'); 
    return docClient.query({
        TableName: 'Reimbursements',
        IndexName: 'status-index',
        KeyConditionExpression: '#s = :status',
        ExpressionAttributeValues: {
          ':status': status
        },
        ExpressionAttributeNames: {
          '#s' : 'status'
        }
    }).promise();
}

export function reimbursementsByUsername(username): Promise<any> {
  // console.log('Remibursement Dao'); 
    return docClient.query({
        TableName: 'Reimbursements2',
        // IndexName: 'status-index',
        KeyConditionExpression: "#un = :username",
    ExpressionAttributeNames:{
        "#un": "username"
    },
    ExpressionAttributeValues: {
        ":username":username
    }
    }).promise();
}

export function allReimbursements(username): Promise<any> {
  // console.log('Remibursement Dao'); 
    return docClient.get({
        TableName: 'Reimbursements2',
        Key: username
    //     // IndexName: 'status-index',
    //     KeyConditionExpression: "#un = :username",
    // ExpressionAttributeNames:{
    //     "#un": "username"
    // },
    // ExpressionAttributeValues: {
    //     ":username":username
    // }
    }).promise();
}

// export function allReimbursementsByTime(timeSubmitted): Promise<any> {
//   // console.log('Remibursement Dao'); 
//     return docClient.query({
//         TableName: 'Reimbursements',
//         KeyConditionExpression: "#ts = :timeSubmitted",
//     ExpressionAttributeNames:{
//         "#ts": "timeSubmitted"
//     },
//     ExpressionAttributeValues: {
//         ":timeSubmitted":timeSubmitted
//     }
//     }).promise();
// }