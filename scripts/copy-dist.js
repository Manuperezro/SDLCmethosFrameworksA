import fs from 'fs';
import path from 'path';

const distPath = path.resolve(process.cwd(), 'dist/index.html');
const rootIndexPath = path.resolve(process.cwd(), 'index.html');
const labPath = path.resolve(process.cwd(), 'learning_lab.html');

if (fs.existsSync(distPath)) {
  const builtHtml = fs.readFileSync(distPath, 'utf8');
  fs.writeFileSync(rootIndexPath, builtHtml, 'utf8');
  fs.writeFileSync(labPath, builtHtml, 'utf8');
  console.log('✓ Successfully copied dist/index.html to root index.html and learning_lab.html');
} else {
  console.error('dist/index.html does not exist!');
  process.exit(1);
}
