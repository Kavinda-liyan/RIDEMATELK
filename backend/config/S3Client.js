import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region: BUCKET_REGION,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY },
});

export default s3;
