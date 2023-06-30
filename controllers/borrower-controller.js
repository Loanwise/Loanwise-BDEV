const Borrow = require('../model/borrower_details')

const borrowers_details = async (req,res) => {
    const {fullName,address,email,alternativeEmail,phoneNumber,dateOfBirth,bvn} = req.body;
    try{
        existingborrower = await Borrow.findOne({email: email});
    }catch (err){
        console.log(err)
    }
    if(existingborrower){
        return res.status(400).json({message: "Borrower exist already"})
    }
    const borrow = new Borrow({
        fullName,
        address,
        email,
        alternativeEmail,
        phoneNumber,
        dateOfBirth,
        bvn
    });

    try{
        await borrow.save();
    }catch (err){
        console.log(err)
    }
    return res.status(201).json(
        {message:borrow}
    )
}

module.exports = {
    borrowers_details
};
