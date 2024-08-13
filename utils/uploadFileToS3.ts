import { uploadFile } from 'react-s3';

const config = {
    bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    region: process.env.NEXT_PUBLIC_AWS_REGION_NAME!,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET!,
};

export const uploadFileToS3 = async (file: File) => {
    try {
        const res = await uploadFile(file, config);
        return res.location;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
