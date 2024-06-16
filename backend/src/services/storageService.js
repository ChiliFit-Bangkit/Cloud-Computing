const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');

const storage = new Storage();
const bucketName = process.env.BUCKET_NAME;

const uploadFile = async (file) => {
  const blob = storage.bucket(bucketName).file(file.originalname);
  const blobStream = blob.createWriteStream();

  return new Promise((resolve, reject) => {
    blobStream.on('error', err => {
      reject(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      resolve(publicUrl);
    });

    fs.createReadStream(file.path).pipe(blobStream);
  });
};

module.exports = { uploadFile };
