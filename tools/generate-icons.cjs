const sharp = require('sharp');
const path = require('path');

const sizes = [16, 32, 48, 128];
const srcImg = path.join(__dirname, '..', 'icons', 'icon128.png');
const outDir = path.join(__dirname, '..', 'icons');

async function generate() {
  for (const size of sizes) {
    const outFile = path.join(outDir, `icon${size}.png`);
    await sharp(srcImg)
      .resize(size, size, { fit: 'cover', kernel: 'lanczos3' })
      .png()
      .toFile(outFile);
    console.log(`✓ Generated ${outFile} (${size}x${size})`);
  }
  console.log('\nAll icons generated successfully!');
}

generate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
