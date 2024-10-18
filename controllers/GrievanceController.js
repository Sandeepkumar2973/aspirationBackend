const Grievance = require('./../models/GrievanceModel.js');

const cloudinary = require('./../config/config.js')



const createGrievance = async (req, res) => {
    try {
        const { name, mobile, text, subject, userId } = req.body;
        const files = req.files;

        // Check if files exist
        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded",
            });
        }

        // Handle multiple file uploads
        const imageFiles = Array.isArray(files) ? files : [files];
        const ImageUrlResult = await Promise.all(
            imageFiles.map(file => cloudinary.uploader.upload(file.path)) // Use .uploader.upload
        );

        const ImageUrls = ImageUrlResult.map(result => result.secure_url);

        // Create the grievance object
        const grievancedata = {
            name,
            mobile,
            text,
            subject,
            userId,
            images: ImageUrls,
        };

        // Save to the database
        const grievance = new Grievance(grievancedata);
        await grievance.save();

        res.status(201).json({
            success: true,
            message: "Grievance created successfully",
            grievance,
        });
    } catch (error) {
        // Log and return error
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Error in creating grievance",
        });
    }
};
const getGrievances = async (req, res) => {
    try {
        const grievances = await Grievance.find();  // Fetch all grievances from the database

        // Check if there are any grievances
        if (!grievances || grievances.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No grievances found",
            });
        }

        // Respond with the grievances
        res.status(200).json({
            success: true,
            count: grievances.length,
            grievances,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching grievances",
            error: error.message,
        });
    }
};
const getGrievanceById = async (req, res) => {
    try {
        const grievanceId = req.params.id;  // Get grievance ID from the request params
        const grievance = await Grievance.findById(grievanceId);  // Fetch grievance by ID

        // Check if the grievance exists
        if (!grievance) {
            return res.status(404).json({
                success: false,
                message: "Grievance not found",
            });
        }

        // Respond with the grievance
        res.status(200).json({
            success: true,
            grievance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching grievance",
            error: error.message,
        });
    }
};


module.exports = {
    createGrievance, getGrievances, getGrievanceById
};


