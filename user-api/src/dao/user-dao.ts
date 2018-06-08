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

// export function getUsers(users: string): Promise<any> {
//   return docClient.query({
//     TableName: 'Users',
//     ExpressionAttributeNames: {
//       '#fn': 'firstname'
//     }
//   }).promise();
// }

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

// export function findAllByYear(year: number): Promise<any> {
//   return docClient.query({
//     TableName: 'movies',
//     KeyConditionExpression: '#yr = :yyyy',
//     ExpressionAttributeNames: { // for aliasing field names
//       '#yr': 'year'
//     },
//     ExpressionAttributeValues: { // for aliasing actual values
//       ':yyyy': year
//     },
//     // ReturnConsumedCapacity: 'TOTAL' // not needed but if you want to see this info it is there

//   }).promise();
// }

// export function findByYearAndTitle(year: number, title: string): Promise<any> {
//   return docClient.get({
//     TableName: 'movies',
//     Key: {
//       year: year,
//       title: title
//     }
//   }).promise();
// }

// export function update(movie): Promise<any> {
//   return docClient.update({
//     TableName: 'movies',
//     Key: {
//       year: movie.year,
//       title: movie.title
//     },
//     UpdateExpression: 'set #rat = :r, #desc = :desc',
//     ExpressionAttributeNames: {
//       '#desc': 'description',
//       '#rat': 'rating'
//     },
//     ExpressionAttributeValues: {
//       ':r': movie.rating,
//       ':desc': movie.description
//     },
//     ReturnValues: 'UPDATED_NEW'
//   }).promise();
// }


//
//ALREADY CREATED TABLE IN AWS SO THIS IS IF YOU NEED TO CREATE A NEW TABLE
//
// export function createMovieTable() {
//   dynamodb.createTable({
//     TableName: 'movies',
//     KeySchema: [
//       {AttributeName: 'year', KeyType: 'HASH'},
//       {AttributeName: 'title', KeyType: 'RANGE'}
//     ],
//     AttributeDefinitions: [
//       {AttributeName: 'year', AttributeType: 'N'},
//       {AttributeName: 'title', AttributeType: 'S'}
//     ],
//     ProvisionedThroughput: {
//       ReadCapacityUnits: 2,
//       WriteCapacityUnits: 2
//     }
//   }, (err, data) => {
//     if(err) {
//       console.log(`Unable to creat table: \n ${JSON.stringify(err, undefined, 2)}`);
//     } else {
//       console.log(`Created table: \n ${JSON.stringify(data, undefined, 2)}`);
//     }
//   });
// }