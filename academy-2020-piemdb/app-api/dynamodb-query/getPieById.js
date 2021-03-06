const { createDynamoDbClient, executeQuery } = require('./dynamoBoilerplate');

const createQueryInput = (id) => ({
  TableName: `${process.env.TABLE_NAME}`,
  ScanIndexForward: false,
  ConsistentRead: false,
  KeyConditionExpression: '#50b30 = :50b30 And #50b31 = :50b31',
  ExpressionAttributeValues: {
    ':50b30': id,
    ':50b31': 'PIE',
  },
  ExpressionAttributeNames: {
    '#50b30': 'uuid',
    '#50b31': 'sort-key',
  },
});

const getPieById = async (id) => {
  // Create the DynamoDB Client with the region you want
  const dynamoDbClient = createDynamoDbClient();
  // Create the input for query call
  const queryInput = createQueryInput(id);
  // Call DynamoDB's query API
  const queryResult = await executeQuery(dynamoDbClient, queryInput);
  return (queryResult).Items[0];
};

module.exports = {
  getPieById,
};
