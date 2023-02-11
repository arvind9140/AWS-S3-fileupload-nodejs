import dotenv from "dotenv";
import AWS from "aws-sdk";
import multer from "multer";
import {v4 as uuid} from "uuid";
import userModel from "../model/userModel.js";

dotenv.config();
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const fileUpload = async(req, res) => {

    const   myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }
        const userData = new userModel(
            {
                fileURL: `${uuid()}.${fileType}`,
                fileName: req.file.originalname,
               
            }
        )
        userData.save();
    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })
}
export default fileUpload;