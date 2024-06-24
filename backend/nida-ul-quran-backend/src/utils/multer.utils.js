const multer = require('multer');
const path = require('path').join(__dirname, '../../public/profileimage');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }

});
const upload = multer({
    storage: storage
}, {
    limits: 1024 * 1024 * 5
});
const uploadImage = upload.single('profileImage');

module.exports = uploadImage;