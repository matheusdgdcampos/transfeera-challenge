require('dotenv').config();
const { Logger } = require('@nestjs/common');
const { MongoClient } = require('mongodb');
const { receivers } = require('../constants/receivers.constants.cjs');

async function receiversSeed() {
    const logger = new Logger(receiversSeed.name);
    try {
        const databaseUrl = process.env.DATABASE_URL;
        const databaseName = process.env.DATABASE_NAME;
        logger.log(`trying to connecting to database with URL[${databaseUrl}]`);
        const client = await MongoClient.connect(databaseUrl);
        logger.log('connection established');
        const db = client.db(databaseName);
        logger.log(
            'inserting data in database, this may take a few seconds...',
        );
        await db.collection('receivers').insertMany(receivers);
        logger.log('data inserted with success');
        process.exit(0)
    } catch (error) {
        logger.log(error);
        throw error;
    }
}

receiversSeed();
