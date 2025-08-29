import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Get all image files from the gallery directory
        const galleryDirectory = path.join(process.cwd(), 'public/assets/images/gallery');
        const fileNames = await fs.readdir(galleryDirectory);

        // Filter for image files only
        const imageFiles = fileNames.filter(file =>
            /\.(jpg|jpeg|png|gif|webp|heic|heif)$/i.test(file)
        );

        return NextResponse.json({
            images: imageFiles
        });
    } catch (error) {
        console.error('Error reading gallery directory:', error);
        return NextResponse.json(
            { error: 'Failed to load gallery images' },
            { status: 500 }
        );
    }
}
