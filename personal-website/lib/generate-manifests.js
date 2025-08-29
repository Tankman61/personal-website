const fs = require('fs');
const path = require('path');

const assetsDir = path.join(process.cwd(), 'public/assets/images/gallery');
const manifestPath = path.join(process.cwd(), 'src/lib/gallery-manifest.json');

try {
    const imageFiles = fs.readdirSync(assetsDir)
        .filter(file => /\.(png|jpe?g|webp|gif|avif)$/i.test(file));
    const imageUrls = imageFiles.map(file => `/assets/images/gallery/${file}`);
    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    fs.writeFileSync(manifestPath, JSON.stringify(imageUrls, null, 2));
    console.log(` Gallery manifest generated with ${imageUrls.length} images.`);
} catch (error) {
    if (error.code === 'ENOENT') {
        fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
        fs.writeFileSync(manifestPath, JSON.stringify([], null, 2));
        console.log("Created empty gallery manifest (no assets directory).");
    } else {
        throw error;
    }
}
