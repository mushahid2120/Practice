import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
const client = new S3Client({profile: 'mushahid'});
const command = new GetObjectCommand({Bucket: 'nodejs-mushahid-sdk',Key: 'file.pdf'});
const url = await getSignedUrl(client, command, { expiresIn: 3600 });
console.log(url)