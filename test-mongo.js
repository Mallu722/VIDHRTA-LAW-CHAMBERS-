import { MongoClient } from 'mongodb';
// Standard non-srv connection string with shards resolved from DNS
const uri = "mongodb://mallikarjunhiremaths72_db_user:Vidhrta2024@ac-th8gdge-shard-00-00.eqdv62i.mongodb.net:27017,ac-th8gdge-shard-00-01.eqdv62i.mongodb.net:27017,ac-th8gdge-shard-00-02.eqdv62i.mongodb.net:27017/vidhrta?ssl=true&replicaSet=atlas-th8gdge-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

async function main() {
  const client = new MongoClient(uri);
  try {
    console.log("Connecting to MongoDB via direct shard URL...");
    await client.connect();
    console.log("Connected successfully!");
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
  } catch (err) {
    console.error("Connection failed:", err.message || err);
  } finally {
    await client.close();
  }
}

main();
