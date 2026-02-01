import { getSignedUrl } from "@aws-sdk/cloudfront-signer"; 
import {readFile} from 'fs/promises'

const cloudfrontDistributionDomain = "https://d24gtp8x4ffd63.cloudfront.net";
const s3ObjectKey = "6970f9b06392c17c7a494a50.jpg";
const url = `${cloudfrontDistributionDomain}/${s3ObjectKey}?download=false&filename=mypic.png`;
const privKey=await readFile('./private_key.pem','utf-8');
const privateKey = privKey
const keyPairId = "K1WWF25J0YVIQ7"; // Public key Id 
const dateLessThan = "2026-02-05";

const signedUrl = getSignedUrl({
  url,
  keyPairId,
  dateLessThan,
  privateKey,
});

console.log(signedUrl)

