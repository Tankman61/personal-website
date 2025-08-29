import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'public/assets');
const manifestPath = path.join(process.cwd(), 'src/lib/gallery-manifest.json');

try {
    const imageFiles = fs.readdirSync(assetsDir)
        .filter(file => /\.(png|jpe?g|webp|gif|avif)$/i.test(file));
    const imageUrls = imageFiles.map(file => `/assets/${file}`);
    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    fs.writeFileSync(manifestPath, JSON.stringify(imageUrls, null, 2));
    console.log(`✅ Gallery manifest generated with ${imageUrls.length} images.`);
} catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code?: string }).code === "ENOENT") {
        fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
        fs.writeFileSync(manifestPath, JSON.stringify([], null, 2));
        console.log("Created empty gallery manifest (no assets directory).");
    } else {
        throw error;
    }
}
