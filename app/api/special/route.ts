import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  const body = await request.json();

  const { company, specialOffer } = body;

  const client = await mgClientPromise;
  const specialCollection = client.db('misaeng').collection('SpecialOffer');

  if (!specialOffer) {
    const specialOfferInfo = await specialCollection
      .find({
        cp: company,
      })
      .toArray();

    return NextResponse.json({ specialOfferInfo });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();

  const { company, specialOffer, broker, utility } = body;

  const client = await mgClientPromise;
  const specialCollection = client.db('misaeng').collection('SpecialOffer');

  if (specialOffer) {
    const specialOfferInfo = await specialCollection.updateOne(
      {
        cp: company,
      },
      { $set: { special: specialOffer } }
    );

    if (specialOfferInfo.modifiedCount === 0) {
      return NextResponse.json({ message: 'No documents were updated' });
    }

    return NextResponse.json({ message: 'Updated successfully' });
  }

  if (broker) {
    const brokerUtility = await specialCollection.updateOne(
      {
        cp: company,
      },
      { $set: { broker, utility } }
    );

    if (brokerUtility.modifiedCount === 0) {
      return NextResponse.json({ message: 'No documents were updated' });
    }

    return NextResponse.json({ message: 'Updated successfully' });
  }
}
