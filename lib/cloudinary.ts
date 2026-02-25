// Cloudinary utility (placeholder)
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(files: File[], category: string): Promise<string[]> {
	const folder = `ramz-florist3/${category}`;
	const urls: string[] = [];
	for (const file of files) {
		const buffer = Buffer.from(await file.arrayBuffer());
		const upload = await new Promise<any>((resolve, reject) => {
			cloudinary.uploader.upload_stream(
				{ folder },
				(err, result) => {
					if (err || !result) return reject(err);
					resolve(result);
				}
			).end(buffer);
		});
		urls.push(upload.secure_url);
	}
	return urls;
}
