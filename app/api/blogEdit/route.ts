import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  const body = await request.json();
  const client = await mgClientPromise;
  const blogCollection = client.db('misaeng').collection('BlogListing');

  const { category, blogId } = body;

  if (category) {
    const result = await blogCollection
      .find(
        { category },
        {
          projection: {
            _id: 1,
            title: 1,
          },
        }
      )
      .toArray();

    const transformedResult = result.map((doc) => {
      return {
        label: doc.title,
        value: doc._id.toString(),
      };
    });

    return NextResponse.json({ result: transformedResult });
  }

  if (blogId) {
    const result = await blogCollection
      .find(
        { _id: new ObjectId(blogId) },
        {
          projection: {
            _id: 1,
            content: 1,
          },
        }
      )
      .toArray();

    return NextResponse.json({ result });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const client = await mgClientPromise;
  const blogCollection = client.db('misaeng').collection('BlogListing');

  const { content, blogId } = body;

  const result = await blogCollection.updateOne(
    { _id: new ObjectId(blogId) },
    { $set: { content } }
  );

  return NextResponse.json({ result });
}
