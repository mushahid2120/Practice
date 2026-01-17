import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "fs";

const s3Client = new S3Client({ profile: "mushahid" });
const fileReadStream = createReadStream(
  "C:\\Users\\saba ahmad\\Desktop\\GitHub\\Practice\\Web_Development\\Backend\\Practicing\\G-Drive_Express_Mongoose\\Backend\\GDrive\\696765d6a81f2268e9f8eb8e.pdf"
);

const parallelUploads3 = new Upload({
  client: s3Client,
  params: {
    Bucket: "nodejs-mushahid-sdk",
    Key: "file.pdf",
    Body: fileReadStream,
    ContentType: "application/pdf"
  },
  queueSize: 4,
  partSize: 1024 * 1024 * 5,
  leavePartsOnError: false,
});

parallelUploads3.on("httpUploadProgress", (progress) => {
  console.log(progress);
});

await parallelUploads3.done();
