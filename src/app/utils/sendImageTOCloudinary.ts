/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: config.Cloud_Name,
  api_key: config.Api_key,
  api_secret: config.Api_Secret
});

export const sendImageTOcloudinary = async (imageName: string, path: string): Promise<string| unknown|any> => {


  try {
    const uploadResult = await cloudinary.uploader
      .upload(
        path, { public_id: `${imageName}` },

      )
      .catch((error) => {
        console.log(error);
      });
    // file will be delete after complete uploading in the cloudinary
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File is deleted.');
      }
    });

    return uploadResult
  } catch (error) {
    console.log(error);

  }






}



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });