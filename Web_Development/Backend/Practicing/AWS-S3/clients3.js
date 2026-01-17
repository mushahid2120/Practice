import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  DeletePublicAccessBlockCommand,
  GetObjectCommand,
  GetPublicAccessBlockCommand,
  HeadBucketCommand,
  ListBucketsCommand,
  PublicAccessBlockConfiguration$,
  PutBucketPolicyCommand,
  PutObjectCommand,
  PutPublicAccessBlockCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { createReadStream, createWriteStream } from "fs";

import fs from 'fs/promises'

const s3client = new S3Client({
  profile: "mushahid",
});

//********list Bucket************
// const command =new ListBucketsCommand()

//**********create Bucket************
// const command = new CreateBucketCommand({Bucket: "nodejs-mushahid-sdk"})

//**********PublicAccessBlock**************
// const command =new GetPublicAccessBlockCommand({Bucket:"nodejs-mushahid-sdk"})
// const command = new PutPublicAccessBlockCommand({
//   Bucket: "nodejs-mushahid-sdk",
//   PublicAccessBlockConfiguration: {BlockPublicAcls: false,IgnorePublicAcls:true,BlockPublicPolicy:false,RestrictPublicBuckets:true},
// });
// const command =new DeletePublicAccessBlockCommand({Bucket:"nodejs-mushahid-sdk"})

// const policy = {
//   Version: "2012-10-17",
//   Statement: [
//     {
//       Sid: "Statement1",
//       Effect: "Allow",
//       Principal: "*",
//       Action: "s3:GetObject",
//       Resource: "arn:aws:s3:::nodejs-mushahid-sdk/*"
//     }
//   ]
// };


// const command =new PutBucketPolicyCommand({
//     Bucket:"nodejs-mushahid-sdk",
//     Policy:JSON.stringify(policy)
// })

// const command=new DeleteBucketCommand({Bucket: 'nodejs-mushahid'})
// const command =new ListBucketsCommand({Bucket: "nodejs-mushahid"})
// const command =new HeadBucketCommand({Bucket: "nodejs-mushahid-sdk"})

//*********download data********
// const command=new GetObjectCommand({Bucket: "nodejs-mushahid-sdk",Key: "index.html"})

// const response=await s3client.send(command)
// const writeStream=createWriteStream('index.html')
// response.Body.pipe(writeStream)


//******uploadFile***********
// const fileReadStream=createReadStream('clients3.js')
// const command =new PutObjectCommand({
//     Bucket: "nodejs-mushahid-sdk",
//     Key: "clients3.js",
//     Body: fileReadStream,
//     ContentType: "text/javascript"
// })


const command =new DeleteObjectCommand({
    Bucket: "nodejs-mushahid-sdk",
    Key: "clients3.js"
})

const response = await s3client.send(command);

console.log(response);
