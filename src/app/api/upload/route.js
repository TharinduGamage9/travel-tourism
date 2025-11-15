import { NextResponse } from 'next/server';
import cloudinary from '../../../../lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check file size (max 10MB for Cloudinary)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Create a unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const extension = file.name.split('.').pop();
    const baseName = sanitizedFileName.replace(/\.[^/.]+$/, '');
    const publicId = `${timestamp}_${randomString}_${baseName}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64 data URI for Cloudinary
    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      public_id: publicId,
      folder: 'gallery',
      resource_type: 'image',
    });

    if (!uploadResult || !uploadResult.secure_url) {
      return NextResponse.json(
        { success: false, error: 'Failed to upload image to Cloudinary' },
        { status: 500 }
      );
    }

    console.log('Upload successful to Cloudinary:', uploadResult.secure_url);

    return NextResponse.json(
      { 
        success: true, 
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        fileName: `${publicId}.${uploadResult.format || extension}`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to upload image',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          stack: error.stack,
        } : undefined
      },
      { status: 500 }
    );
  }
}
