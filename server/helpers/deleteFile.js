import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function deleteFile(fileName, folder = 'users') {
  try {
    if (!fileName) return;
    const filePath = path.resolve(__dirname, '../../public/images', folder, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (e) {
    console.error('No se pudo borrar el archivo:', e?.message || e);
  }
}
