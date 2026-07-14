import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://mallikarjunhiremaths72_db_user:Vidhrta2024@cluster0.eqdv62i.mongodb.net/vidhrta?retryWrites=true&w=majority&appName=Cluster0";

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
  tls: true,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
};

let client: MongoClient | null = null;

async function getClient(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
  }
  return client;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const mongoClient = await getClient();
    const db = mongoClient.db('vidhrta');
    const collection = db.collection('settings');

    if (req.method === 'GET') {
      const settings = await collection.findOne({ id: 'admin_settings' });
      const password = settings?.adminPassword || 'vidh2024';
      return res.status(200).json({ adminPassword: password });
    }

    if (req.method === 'POST') {
      const { adminPassword } = req.body;
      if (!adminPassword || typeof adminPassword !== 'string' || adminPassword.trim() === '') {
        return res.status(400).json({ error: 'Invalid password' });
      }
      await collection.updateOne(
        { id: 'admin_settings' },
        { $set: { adminPassword: adminPassword.trim() } },
        { upsert: true }
      );
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    client = null;
    console.error('settings handler error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
