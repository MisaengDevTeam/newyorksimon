import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function GET(request: Request) {
  try {
    const client = await mgClientPromise;
    const clientListCollection = client.db('misaeng').collection('ClientList');

    // Convert cursor to an array
    const clients = await clientListCollection.find({}).toArray();

    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error fetching clients:', error);

    return NextResponse.json({ error: 'Failed to fetch clients' });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const { name, gender, phone, email, movein, budget, area, agent, createdAt } =
    body;

  const client = await mgClientPromise;
  const clientListCollection = client.db('misaeng').collection('ClientList');

  const result = clientListCollection.insertOne({
    name,
    gender,
    phone,
    email,
    movein,
    budget,
    area,
    agent,
    createdAt: new Date(createdAt),
  });

  return NextResponse.json({ result });
}
