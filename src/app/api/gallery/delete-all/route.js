import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/mongodb';
import Gallery from '../../../../../models/Gallery';
import cloudinary from '../../../../../lib/cloudinary';

export async function DELETE() {
  try {
    await dbConnect();
    
    // Get all gallery items before deletion to extract Cloudinary public_ids
    const allItems = await Gallery.find({});
    
    // Delete all gallery items from MongoDB
    const result = await Gallery.deleteMany({});
    
    // Delete all images from Cloudinary gallery folder
    try {
      const deleteResult = await cloudinary.api.delete_resources_by_prefix('gallery/', {
        resource_type: 'image',
      });
      console.log('Deleted from Cloudinary:', deleteResult);
    } catch (cloudinaryError) {
      console.error('Error deleting from Cloudinary:', cloudinaryError);
      // Continue even if Cloudinary deletion fails
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: `Successfully deleted ${result.deletedCount} gallery items`,
        deletedCount: result.deletedCount
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting gallery items:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete gallery items' },
      { status: 500 }
    );
  }
}

