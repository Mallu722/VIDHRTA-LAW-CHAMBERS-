import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (!uri) {
  console.warn('MONGODB_URI is not set in environment variables.');
}

async function getClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  if (client) return client;
  if (!clientPromise) {
    clientPromise = MongoClient.connect(uri);
  }
  client = await clientPromise;
  return client;
}

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const mongoClient = await getClient();
    const db = mongoClient.db();
    const collection = db.collection('bookings');

    if (req.method === 'GET') {
      const bookings = await collection.find({}).toArray();
      // Remove MongoDB _id if present to keep Frontend types clean
      const cleanedBookings = bookings.map(({ _id, ...rest }) => rest);
      return res.status(200).json(cleanedBookings);
    }

    if (req.method === 'POST') {
      const bookings = req.body;
      if (!Array.isArray(bookings)) {
        return res.status(400).json({ error: 'Body must be an array of bookings' });
      }

      // Overwrite collection with new list
      await collection.deleteMany({});
      if (bookings.length > 0) {
        await collection.insertMany(bookings);
      }
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
