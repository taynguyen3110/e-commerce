import { applicationDefault } from "firebase-admin/app";
import admin from 'firebase-admin';
import fs from 'fs/promises'; // Using fs.promises for async/await
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path";
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
  await readFile(new URL('e-commerce-e6f2f-firebase-adminsdk-izl5h-0ab4bffc35.json', import.meta.url))
);

// Simulate __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase Admin SDK with application default credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

// Path to your JSON file
const jsonFilePath = path.join(__dirname, './src/mock/products.json');

// Read and import data to Firestore
(async () => {
  try {
    // Read the JSON file
    const data = await fs.readFile(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Start a batch write operation
    const batch = firestore.batch();

    // Loop through each product and add to batch
    jsonData.products.forEach(product => {
      const productRef = firestore.collection('products').doc(product.id);
      batch.set(productRef, product);
    });

    // Commit the batch
    await batch.commit();
    console.log('Data import successful!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
})();
