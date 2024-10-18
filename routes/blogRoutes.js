const express = require("express");
const {
    FilePhoto,
    createBlog,
    getAllBlogs,
    deleteBlog,
    getBlogById,
} = require("../controllers/blogController");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const upload = multer({ dest: "uploads/" });
router.post("/blog_create", upload.single("photo"), createBlog);
router.get("/get_all", getAllBlogs);
router.delete('/delete/:id', deleteBlog);
router.get('/single_blog/:id', getBlogById);
router.get("/singlePhoto/:id", FilePhoto);

module.exports = router;
