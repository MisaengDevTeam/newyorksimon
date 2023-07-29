import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  const body = await request.json();

  const client = await mgClientPromise;
  const blogCollection = client.db('misaeng').collection('BlogListing');

  console.log(body);

  const {
    category,
    title,
    content,
    thumbnail,
    updateAt,
    uid: userId,
    author,
    authorPic,
    createdAt,
    hot,
  } = body;

  const result = blogCollection.insertOne({
    userId,
    category,
    title,
    content,
    thumbnail,
    hot,
    author,
    createdAt: new Date(createdAt),
    authorPic,
  });

  return NextResponse.json({ result });
}
