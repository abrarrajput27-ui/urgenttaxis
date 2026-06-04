import fs from 'fs';
import https from 'https';
import path from 'path';

// Using extremely reliable Wikimedia Commons direct URLs and Pravatar
const images = [
  // Hero Background & Cars
  { url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Delhi_skyline_from_Jama_Masjid_minaret.jpg', name: 'hero-bg.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Toyota_Innova_2.0_G_front.jpg', name: 'hero-car.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Toyota_Innova_2.0_G_front.jpg', name: 'cta-car.jpg' },
  
  // Fleet Cars
  { url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Suzuki_Dzire_VXi_front.jpg', name: 'car-dzire.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/2018_Suzuki_Ertiga_GX_front.jpg', name: 'car-ertiga.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Toyota_Innova_2.0_G_front.jpg', name: 'car-innova.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/2016_Toyota_Innova_2.0_V_TGN140R_%2820170529%29.jpg', name: 'car-crysta.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Force_Traveller_front.jpg', name: 'car-traveller.jpg' },

  // Routes
  { url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Har_Ki_Pauri%2C_Haridwar_2.jpg', name: 'route-haridwar.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Clock_Tower_Dehradun.jpg', name: 'route-dehradun.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Nainital_Lake_2016.jpg', name: 'route-haldwani.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Lakshman_Jhula%2C_Rishikesh.jpg', name: 'route-rishikesh.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Shimla_from_Jakhu.jpg', name: 'route-shimla.jpg' },
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const stream = fs.createWriteStream(filepath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        console.log(`Downloaded ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const run = async () => {
  for (const img of images) {
    const target = path.join('src', 'assets', 'images', img.name);
    try {
      if (!fs.existsSync(target)) {
          await downloadImage(img.url, target);
          await sleep(1500); // Wait 1.5 seconds between downloads to avoid 429
      }
    } catch (e) {
      console.error(e.message);
    }
  }
};

run();
