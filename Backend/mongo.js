const { MongoClient } = require('mongodb');

//chaîne de connexion
const uri = "mongodb+srv://amles:5ydzJjO6IoAgvGDp@cluster0.xrf8i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connexion à MongoDB réussie !");
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error);
    }
}

module.exports = run;

