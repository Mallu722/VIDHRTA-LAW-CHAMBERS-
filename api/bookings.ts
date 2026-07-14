import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://mallikarjunhiremaths72_db_user:Vidhrta2024@cluster0.eqdv62i.mongodb.net/vidhrta?retryWrites=true&w=majority&appName=Cluster0";

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
  tls: true,
  tlsAllowInvalidCertificates: false,
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
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const mongoClient = await getClient();
    const db = mongoClient.db('vidhrta');
    const collection = db.collection('bookings');

    if (req.method === 'GET') {
      const bookings = await collection.find({}).sort({ createdAt: -1 }).toArray();
      const cleanedBookings = bookings.map(({ _id, ...rest }) => rest);
      return res.status(200).json(cleanedBookings);
    }

    if (req.method === 'POST') {
      const bookings = req.body;
      if (!Array.isArray(bookings)) {
        return res.status(400).json({ error: 'Body must be an array of bookings' });
      }
      for (const booking of bookings) {
        if (booking && booking.id) {
          const { _id, ...cleanBooking } = booking;
          await collection.updateOne(
            { id: booking.id },
            { $set: cleanBooking },
            { upsert: true }
          );
        }
      }
      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Missing booking id' });
      await collection.deleteOne({ id });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    client = null; // reset on error so next request retries
    console.error('bookings handler error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
