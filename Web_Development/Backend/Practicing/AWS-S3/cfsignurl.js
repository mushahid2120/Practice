import { getSignedUrl } from "@aws-sdk/cloudfront-signer"; 
import {readFile} from 'fs/promises'

const cloudfrontDistributionDomain = "https://d1m2dzl351o784.cloudfront.net";
const s3ObjectKey = "index.html";
const url = `${cloudfrontDistributionDomain}/${s3ObjectKey}`;
const privKey=await readFile('./private_key.pem','utf-8');
console.log(privKey)
const privateKey = privKey
const keyPairId = "KTKYQVC8RF6DT"; // Public key Id 
const dateLessThan = "2026-01-20";

const signedUrl = getSignedUrl({
  url,
  keyPairId,
  dateLessThan,
  privateKey,
});

console.log(signedUrl)