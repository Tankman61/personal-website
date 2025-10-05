import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGES_DIR = join(__dirname, '../public/assets/images');
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return;
  }

  try {
    const stats = await stat(filePath);
    const sizeMB = stats.size / (1024 * 1024);

    console.log(`Processing: ${basename(filePath)} (${sizeMB.toFixed(2)}MB)`);

    const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    await sharp(filePath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const newStats = await stat(outputPath);
    const newSizeMB = newStats.size / (1024 * 1024);
    const savings = ((1 - newSizeMB / sizeMB) * 100).toFixed(1);

    console.log(`  ✓ Saved as ${basename(outputPath)} (${newSizeMB.toFixed(2)}MB, ${savings}% smaller)`);
  } catch (error) {
    console.error(`  ✗ Error processing ${basename(filePath)}:`, error.message);
  }
}

async function processDirectory(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

console.log('Starting image optimization...\n');
console.log(`Images directory: ${IMAGES_DIR}\n`);

await processDirectory(IMAGES_DIR);

console.log('\n✅ Image optimization complete!');
console.log('\nNext steps:');
console.log('1. Update manifest to use .webp extensions');
console.log('2. Remove old .jpg/.png files after verifying .webp files work');