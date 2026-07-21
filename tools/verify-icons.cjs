const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '..', 'icons');
const sizes = [16, 32, 48, 128];

sizes.forEach(size => {
  const file = path.join(iconsDir, `icon${size}.png`);
  const buf = fs.readFileSync(file);
  // PNG header: width at offset 16 (4 bytes, big-endian), height at offset 20
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  console.log(`icon${size}.png: ${width}x${height} (${buf.length} bytes)`);
});
