import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Gallery from '../../../../models/Gallery';

export async function GET() {
  try {
    await dbConnect();
    const gallery = await Gallery.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: gallery }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    if (!body.imageUrl || !body.alt) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: imageUrl and alt are required' },
        { status: 400 }
      );
    }

    const galleryItem = await Gallery.create(body);
    return NextResponse.json({ success: true, data: galleryItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

