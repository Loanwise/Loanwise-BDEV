const Users = require('../model/user_notification');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
  
const upload = multer({ storage: storage }).single('profilePicture');



const userAccount = async (req, res) => {
    try {
            
        const { firstName, lastName, email, mobileNumber, changeRole } = req.body;
        const profilePicture = req.file ? req.file.path : undefined;

        if (!firstName || !lastName || !email || !mobileNumber || !changeRole) {
            return res.status(400).json({message: "All fields are required"});
        }

        const currentUser = await Users.findOne({   _id: req.params.id });

        if (!currentUser) {
            return res.status(400).json({message: "User not found"});
        }

        currentUser.firstName = firstName;
        currentUser.lastName = lastName;
        currentUser.email = email;
        currentUser.mobileNumber = mobileNumber;
        currentUser.changeRole = changeRole;
        currentUser.profilePicture = profilePicture

        await currentUser.save();

        return res.json({ message: 'Account Updated Successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = { 
    userAccount, 
    upload
};