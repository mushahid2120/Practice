import crypto from "node:crypto";
import jwt from "jsonwebtoken";
// const token = jwt.sign({ name: "md" }, "mysecretKey");
// console.log(token);

// Djf-V6IePVpt116E_hhNYcfeePGxe5HpDILMVNBaBms

console.log(
  Buffer.from(
    "eyJuYW1lIjoibWQiLCJpYXQiOjE3NjYzMDkxNDZ9",
    "base64url"
  ).toString()
);

const header='{"alg":"HS256","typ":"JWT"}' 
const payload='{"name":"md","iat":1766309146}'
console.log(Buffer.from(header).toString('base64url') + "." +
  Buffer.from(payload).toString('base64url'))

const hash = crypto
  .createHmac("sha256", "mysecretKey")
  .update(
   Buffer.from(header).toString('base64url') + "." +
  Buffer.from(payload).toString('base64url')
  )
  .digest("base64url");

console.log(hash);
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWQiLCJpYXQiOjE3NjYzMDkyMDJ9
