import aws from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk/lib/config';
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

export function statusUpdate(status): Promise<any> {
  return docClient.update({
    TableName: 'Reimbursements2',
    Key: {
      username: status.username,
      timeSubmitted: status.timeSubmitted
    },
    UpdateExpression: 'set #status = :s, approver = :approver',

    ExpressionAttributeNames: {
      '#status': 'status'
    },
    ExpressionAttributeValues: {
      ':s': status.status,
      ':approver': status.approver
    }
  }).promise();
}

export function reimbursementsByStatus(status): Promise<any> {
  return docClient.query({
    TableName: 'Reimbursements2',
    IndexName: 'status-index',
    KeyConditionExpression: '#s = :status',
    ExpressionAttributeValues: {
      ':status': status
    },
    ExpressionAttributeNames: {
      '#s': 'status'
    }
  }).promise();
}

export function reimbursementsByUsername(username): Promise<any> {
  return docClient.query({
    TableName: 'Reimbursements2',
    KeyConditionExpression: "#un = :username",
    ExpressionAttributeNames: {
      "#un": "username",
    },
    ExpressionAttributeValues: {
      ":username": username
    }
  }).promise();
}

export function reimbursementsByUsernameTime(username, timeSubmitted): Promise<any> {
  // console.log('Remibursement Dao'); 
  console.log(username + ' in dao ' + timeSubmitted);
  return docClient.get({
    TableName: 'Reimbursements2',
    Key: {
      'username': username,
      'timeSubmitted': timeSubmitted
    }
  }).promise();
}