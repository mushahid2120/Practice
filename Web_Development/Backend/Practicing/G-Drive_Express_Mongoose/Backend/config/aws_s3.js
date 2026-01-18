import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ profile: "mushahid" });
if (!s3Client) console.log("AWS Connection failed");

console.log("AWS Connection Successfull");

export const createPutSignUrl = async (fileFullName,filetype) => {

  const putObjCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileFullName,
    ContentType: filetype,
  });

  const url = await getSignedUrl(s3Client, putObjCommand, {
    expiresIn: 60 * 5,
    signableHeaders: new Set(["Content-Type"]),
  });
  return url ;
};

export const verifyS3Object=async(fileFullName)=>{
    const headObjCommand = new HeadObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileFullName,
    });

      const s3Response = await s3Client.send(headObjCommand);
    return s3Response.ContentLength
}

// async function createS3Bucket(bucketName = "nodejs-storageapp") {
//   try {
//     const headCommand = new HeadBucketCommand({ Bucket: bucketName });
//     const response = await s3Client.send(headCommand);
//     console.log("Bucket Already Avaliable");
//   } catch (error) {
//     if (error.$metadata?.httpStatusCode === 404) {
//       const createBucketCommand = new CreateBucketCommand({
//         Bucket: bucketName,
//       });
//       const response = await s3Client.send(createBucketCommand);
//       console.log("Bucket has been created");
//     } else console.log(error);
//   }
// }

// createS3Bucket("nodejs-storageapp");
