const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

const region = process.env.AWS_REGION || 'us-east-1';

const ddbClient = new DynamoDBClient({ region });

const dynamoDB = DynamoDBDocumentClient.from(ddbClient);

module.exports = dynamoDB;
