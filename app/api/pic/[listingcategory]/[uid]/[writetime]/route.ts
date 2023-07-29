import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

const region = 'us-east-1';
const bucketName = 'misaeng';
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

const s3client = new S3Client({
  region,
  credentials: {
    accessKeyId: accessKeyId as string,
    secretAccessKey: secretAccessKey as string,
  },
});

interface IParams {
  listingcategory: string;
  uid: string;
  writetime: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const { listingcategory, uid, writetime } = params;

  const imageName = `${listingcategory}/${uid}/${writetime}/${uuidv4().toString()}`;
  const option = {
    Bucket: bucketName,
    Key: imageName,
  };
  await s3client.send(new PutObjectCommand(option));
  const command = new PutObjectCommand(option);

  try {
    const signedUrl = await getSignedUrl(s3client, command, {
      expiresIn: 60 * 5,
    });
    return NextResponse.json({ signedUrl });
  } catch (err) {
    console.error(err);
    return null;
  }
}
