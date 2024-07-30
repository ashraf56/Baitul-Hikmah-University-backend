import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

export const sendImageTOcloudinary= async ()=>{

    // Configuration
    cloudinary.config({ 
        cloud_name: config.Cloud_Name, 
        api_key:  config.Api_key, 
        api_secret:  config.Api_Secret 
    });
    
    const uploadResult = await cloudinary.uploader
    .upload(
        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
            public_id: 'shoes',
        }
    )
    .catch((error) => {
        console.log(error);
    });
 
 console.log(uploadResult);

}