const Blog = require('../models/blogModel');
const fs = require('fs')


exports.createBlog = async (req, res) => {
    try {
        const { heading, mainContent, subContents: subContentsString } = req.body;

        // Parse subContents from JSON string to array
        const subContents = JSON.parse(subContentsString);

        const photo = {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype
        };

        const data = new Blog({
            heading,
            mainContent,
            subContents,
            photo
        });

        const newBlog = await data.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().select("-photo");
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.FilePhoto = async (req, res) => {
    try {
        const chat = await Blog.findById(req.params.id).select("photo");
        if (chat?.photo.data) {
            res.set("content-type", chat.photo.contentType);
            return res.status(200).send(chat.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while getting photo",
            error,
        });
    }
};
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const { heading, mainContent, subContents: subContentsString } = req.body;

        // Parse subContents from JSON string to array if provided
        let subContents;
        if (subContentsString) {
            subContents = JSON.parse(subContentsString);
        }

        if (heading != null) blog.heading = heading;
        if (mainContent != null) blog.mainContent = mainContent;
        if (subContents != null) blog.subContents = subContents;

        // Handle photo update if a new file is uploaded
        if (req.file) {
            blog.photo = {
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype
            };
        }

        const updatedblog = await blog.save();
        res.status(200).json(updatedblog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).select("-photo");
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};