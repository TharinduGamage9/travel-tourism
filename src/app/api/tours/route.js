import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Tour from '../../../../models/Tour';

export async function GET() {
  try {
    await dbConnect();
    const tours = await Tour.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tours }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    console.log('POST /api/tours - Starting...');
    await dbConnect();
    console.log('MongoDB connected successfully');
    
    const body = await request.json();
    console.log('Received body:', JSON.stringify(body, null, 2));
    
    // Validate required fields
    const missingFields = [];
    if (!body.title || !body.title.trim()) missingFields.push('title');
    if (!body.city || !body.city.trim()) missingFields.push('city');
    if (!body.shortDesc || !body.shortDesc.trim()) missingFields.push('shortDesc');
    if (!body.desc || !body.desc.trim()) missingFields.push('desc');
    if (!body.photo || !body.photo.trim()) missingFields.push('photo');
    if (!body.price || !body.price.trim()) missingFields.push('price');
    
    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    console.log('Creating tour in MongoDB...');
    const tour = await Tour.create(body);
    console.log('Tour created successfully:', tour._id);
    
    return NextResponse.json({ success: true, data: tour }, { status: 201 });
  } catch (error) {
    console.error('MongoDB Error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create tour',
        details: process.env.NODE_ENV === 'development' ? {
          name: error.name,
          message: error.message,
          code: error.code,
        } : undefined
      },
      { status: 500 }
    );
  }
}

