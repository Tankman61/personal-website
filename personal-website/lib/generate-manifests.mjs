import * as fs from 'fs';
import * as path from 'path';

// for gallery images
// for gallery images
// for gallery images
const assetsDir = path.join(process.cwd(), 'public/assets/images/gallery');
const manifestPath = path.join(process.cwd(), 'src/lib/gallery-manifest.json');
console.log(`Looking for gallery images in: ${assetsDir}`);

// Ensure directory exists for the manifest file
fs.mkdirSync(path.dirname(manifestPath), { recursive: true });

try {
    // First check if the gallery directory exists
    if (!fs.existsSync(assetsDir)) {
        console.log(`Gallery directory not found at: ${assetsDir}`);
        fs.writeFileSync(manifestPath, JSON.stringify([], null, 2));
        console.log('Created empty gallery manifest (no gallery directory).');
    } else {
        const imageFiles = fs
            .readdirSync(assetsDir)
            .filter((file) => /\.(png|jpe?g|webp|gif|avif)$/i.test(file));

        if (imageFiles.length === 0) {
            console.log('No image files found in gallery directory.');
        }

        const imageUrls = imageFiles.map((file) => `/assets/images/gallery/${file}`);
        fs.writeFileSync(manifestPath, JSON.stringify(imageUrls, null, 2));
        console.log(`Gallery manifest generated with ${imageUrls.length} images.`);
    }
} catch (error) {
    console.error('Error generating gallery manifest:', error);
    // Create empty manifest as fallback
    fs.writeFileSync(manifestPath, JSON.stringify([], null, 2));
    console.log('Created empty gallery manifest due to error.');
    throw error;
}
