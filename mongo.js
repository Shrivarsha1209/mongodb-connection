const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017";

async function connectToMongoDB() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        return "Connection successful to MongoDB on localhost:27017";
    } catch (error) {
        return `Connection error: ${error.message}`;
    } finally {
        await client.close();
    }
}

app.get('/', async (req, res) => {
    const message = await connectToMongoDB();
    res.send(`<h1>${message}</h1>`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});