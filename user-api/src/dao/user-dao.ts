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

export function saveUser(user): Promise<any> {
  return docClient.put({
    TableName: 'Users',
    Item: user
  }).promise();
}

export function checkUser(username): Promise<any> {
  console.log('made it to the dao');
  return docClient.query({
    TableName: 'Users',
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': username
    },
  }).promise();
}