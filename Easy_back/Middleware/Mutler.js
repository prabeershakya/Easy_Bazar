const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const fileName = file?.originalname?.replace(/\s/g, "_");
        cb(null, fileName);
    },
});

const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf|jpg|jpeg|png)$/i)) {
        return callback(new Error('Invalid file format'), false);
    }
    callback(null, true);
};

const fileUpload = (fieldName) => (req, res, next) => {
    multer({ storage, fileFilter }).single(fieldName)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (req.file) {
            console.log("Uploaded File:");
            console.log(`- ${req.file.originalname} -> ${req.file.filename}`);
        }

        next();
    });
};

module.exports = fileUpload;
