const Users = require('../model/user_notification');
const bcrypt = require("bcrypt");

const securityPassword = async (req, res) => {
    try {
        const { previousPassword, newPassword, confirmPassword } = req.body

        if (!previousPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'Previous password, new password, and confirm password are required' });
        }

        const currentUser = await Users.findOne({ _id: req.params.id });

        if (!currentUser) {
            return res.status(400).json({ message: 'User not found' });
        }


        const isMatch = await bcrypt.compare(previousPassword, currentUser.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Previous password is invalid' });
        }


        if (previousPassword === newPassword) {
            return res.status(400).json({ message: 'New password must be different from the previous password' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Password and confirm password do not match' });
        }

        const saltRounds = 15;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        currentUser.password = hashedPassword;
        await currentUser.save();

        return res.json({ message: 'Successfully saved' });

    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: 'Failed to reset password' });
    }
}

exports.securityPassword = securityPassword;