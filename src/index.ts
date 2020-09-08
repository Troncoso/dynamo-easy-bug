require('reflect-metadata');
import { DynamoStore } from '@shiftcoders/dynamo-easy';
import { ExampleEntity } from './ExampleEntity';
const AWS = require('aws-sdk');
const DynamoDbLocal = require('dynamodb-local');

(async() => {
    // Configure AWS to use dynamodb local
    AWS.config.update({
        endpoint: 'http://localhost:8000',
        region: 'us-east-1'
    });
    // Launch DynamoDB local instance
    await DynamoDbLocal.launch(8000, `${__dirname}/../localdb`, [ '-sharedDb' ]);

    try {
        // Attempt to get a count
        const count = await new DynamoStore(ExampleEntity).query()
        .wherePartitionKey('somekey')
        .whereSortKey().beginsWith('test')
        .execCount();
        console.log('TOTAL: ' + count);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        DynamoDbLocal.stop(8000);
    }
})();