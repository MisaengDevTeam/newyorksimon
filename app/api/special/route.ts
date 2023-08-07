import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import mgClientPromise from '@/app/lib/mongodb';

export async function POST(request: Request) {
  const body = await request.json();

  const { company, building, roomtype, specialOffer } = body;

  const client = await mgClientPromise;
  const specialCollection = client.db('misaeng').collection('SpecialOffer');

  if (building != 'All' || roomtype != 'All') {
    const specialOfferInfo = await specialCollection
      .find({
        cp: company,
        bid: building,
        roomtype,
      })
      .toArray();

    return NextResponse.json({ specialOfferInfo });
  } else {
    const specialOfferInfo = [
      {
        special: 'Modify the special offer',
        broker: 'asdf',
        utility: 'asdf',
      },
    ];
    return NextResponse.json({ specialOfferInfo });
  }

  // if (!specialOffer) {
  // }
}

export async function PUT(request: Request) {
  const body = await request.json();

  const { company, building, roomtype, specialOffer, broker, utility } = body;

  const client = await mgClientPromise;
  const specialCollection = client.db('misaeng').collection('SpecialOffer');

  if (specialOffer) {
    if (specialOffer == 'reset') {
      if (building == 'All') {
        const specialOfferInfo = await specialCollection.updateMany(
          {
            cp: company,
          },
          { $set: { special: '' } }
        );

        if (specialOfferInfo.modifiedCount === 0) {
          return NextResponse.json({ message: 'No documents were updated' });
        }
        return NextResponse.json({ message: 'Updated successfully' });
      } else {
        if (roomtype == 'All') {
          const specialOfferInfo = await specialCollection.updateMany(
            {
              cp: company,
              bid: building,
            },
            { $set: { special: '' } }
          );

          if (specialOfferInfo.modifiedCount === 0) {
            return NextResponse.json({ message: 'No documents were updated' });
          }
          return NextResponse.json({ message: 'Updated successfully' });
        } else {
          const specialOfferInfo = await specialCollection.updateOne(
            {
              cp: company,
              bid: building,
              roomtype,
            },
            { $set: { special: '' } }
          );

          if (specialOfferInfo.modifiedCount === 0) {
            return NextResponse.json({ message: 'No documents were updated' });
          }
          return NextResponse.json({ message: 'Updated successfully' });
        }
      }
    } else {
      if (building == 'All') {
        const specialOfferInfo = await specialCollection.updateMany(
          {
            cp: company,
          },
          { $set: { special: specialOffer } }
        );

        if (specialOfferInfo.modifiedCount === 0) {
          return NextResponse.json({ message: 'No documents were updated' });
        }
        return NextResponse.json({ message: 'Updated successfully' });
      } else {
        if (roomtype == 'All') {
          const specialOfferInfo = await specialCollection.updateMany(
            {
              cp: company,
              bid: building,
            },
            { $set: { special: specialOffer } }
          );

          if (specialOfferInfo.modifiedCount === 0) {
            return NextResponse.json({ message: 'No documents were updated' });
          }
          return NextResponse.json({ message: 'Updated successfully' });
        } else {
          const specialOfferInfo = await specialCollection.updateOne(
            {
              cp: company,
              bid: building,
              roomtype,
            },
            { $set: { special: specialOffer } }
          );

          if (specialOfferInfo.modifiedCount === 0) {
            return NextResponse.json({ message: 'No documents were updated' });
          }
          return NextResponse.json({ message: 'Updated successfully' });
        }
      }
    }
  }

  if (broker) {
    if (building == 'All') {
      const brokerUtilityInfo = await specialCollection.updateMany(
        {
          cp: company,
        },
        { $set: { broker, utility } }
      );

      if (brokerUtilityInfo.modifiedCount === 0) {
        return NextResponse.json({ message: '1No documents were updated' });
      }
      return NextResponse.json({ message: 'Updated successfully' });
    } else {
      if (roomtype == 'All') {
        const brokerUtilityInfo = await specialCollection.updateMany(
          {
            cp: company,
            bid: building,
          },
          { $set: { broker, utility } }
        );

        if (brokerUtilityInfo.modifiedCount === 0) {
          return NextResponse.json({ message: 'No documents were updated' });
        }
        return NextResponse.json({ message: '2Updated successfully' });
      } else {
        const brokerUtilityInfo = await specialCollection.updateOne(
          {
            cp: company,
            bid: building,
            roomtype,
          },
          { $set: { broker, utility } }
        );

        if (brokerUtilityInfo.modifiedCount === 0) {
          return NextResponse.json({ message: 'No documents were updated' });
        }
        return NextResponse.json({ message: '3Updated successfully' });
      }
    }
  }
}
