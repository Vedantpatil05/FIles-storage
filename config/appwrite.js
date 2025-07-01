const { Client, Storage } = require('appwrite');
const client = new Client();

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your Appwrite Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your Project ID
    .setKey(process.env.APPWRITE_API_KEY); // Your API Key

const storage = new Storage(client);

module.exports = { storage };
