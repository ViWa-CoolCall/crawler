import cloudinary from 'cloudinary';
import * as cloudinaryConfig from '../../infra/cloudinary';
import { resolve } from 'path';

export async function upload(folder = 'guarulhos') {
  const filePath = resolve('downloads', 'Receitas.pdf');

  cloudinary.v2.config(cloudinaryConfig);

  const { secure_url } = await cloudinary.v2.uploader.upload(filePath, {
    folder: `challenge/${folder}`,
  });

  return console.log(secure_url);
}

upload();
