const Users = require("../model/user_notification");


const getNotification = async (req, res) => {
    try {
        const user = await Users.findOne({_id: req.params.id})
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        } 

        return res.json({
        inAppNotification: user.inAppNotification,
        emailNotification: user.emailNotification,
        notificationSettings: user.notificationSettings,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


const updateNotification = async (req, res) => {

    try {
        const { inAppNotification, emailNotification, notificationSettings } = req.body;
        const updatedUser = await Users.findOneAndUpdate(
        {_id: req.params.id},
        {
            inAppNotification: inAppNotification || false,
            emailNotification: emailNotification || false,
            notificationSettings: {
            newApplications: notificationSettings?.newApplications || false,
            loanRepayments: notificationSettings?.loanRepayments || false,
            dueDates: notificationSettings?.dueDates || false,
            },
        },
        { new: true }
        );
        
        if (!updatedUser) {
        return res.status(400).json({ message: 'User not found' });
        }
        return res.json({ message: 'Notification settings updated successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



exports.getNotification = getNotification;
exports.updateNotification = updateNotification;