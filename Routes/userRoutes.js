import  express  from "express";
import multer from "multer";

const router = express.Router();
import fileUpload from "../Controller/UserController.js";
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})
const upload = multer({storage}).single('image')

router.post("/upload",upload,fileUpload);

export default router;