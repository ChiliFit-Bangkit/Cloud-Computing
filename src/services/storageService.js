const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');

const storage = new Storage();
const bucketName = process.env.BUCKET_NAME;

const uploadFile = async (file) => {
  const blob = storage.bucket(bucketName).file(file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', err => {
      console.error('Error uploading file:', err);
      reject(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      resolve(publicUrl);
    });

    fs.createReadStream(file.path).pipe(blobStream);
  });
};

const deleteFile = async (fileUrl) => {
  try {
    const fileName = path.basename(fileUrl);
    await storage.bucket(bucketName).file(fileName).delete();
    console.log(`File ${fileName} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Error deleting file');
  }
};

module.exports = { uploadFile, deleteFile };
