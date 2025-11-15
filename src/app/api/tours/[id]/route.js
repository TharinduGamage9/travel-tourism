import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/mongodb';
import Tour from '../../../../../models/Tour';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    console.log('Fetching tour with ID:', id);
    
    const tour = await Tour.findById(id);
    
    if (!tour) {
      console.log('Tour not found with ID:', id);
      return NextResponse.json(
        { success: false, error: 'Tour not found' },
        { status: 404 }
      );
    }
    
    console.log('Tour found:', tour._id);
    return NextResponse.json({ success: true, data: tour }, { status: 200 });
  } catch (error) {
    console.error('Error fetching tour:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch tour' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deletedTour = await Tour.findByIdAndDelete(id);
    
    if (!deletedTour) {
      return NextResponse.json(
        { success: false, error: 'Tour not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedTour) {
      return NextResponse.json(
        { success: false, error: 'Tour not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: updatedTour }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

