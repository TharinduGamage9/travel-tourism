import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/mongodb';
import Gallery from '../../../../../models/Gallery';
import cloudinary from '../../../../../lib/cloudinary';

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deletedItem = await Gallery.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    // Delete file from Cloudinary if it's a Cloudinary URL
    if (deletedItem.imageUrl && deletedItem.imageUrl.includes('cloudinary.com')) {
      try {
        // Extract public_id from Cloudinary URL
        const urlParts = deletedItem.imageUrl.split('/');
        const folderIndex = urlParts.findIndex(part => part === 'gallery');
        if (folderIndex !== -1) {
          const publicIdParts = urlParts.slice(folderIndex);
          const publicId = publicIdParts.join('/').replace(/\.[^/.]+$/, ''); // Remove extension
          
          await cloudinary.uploader.destroy(publicId);
          console.log('Deleted from Cloudinary:', publicId);
        }
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError);
        // Continue even if Cloudinary deletion fails
      }
    }
    
    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

