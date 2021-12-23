const CryptoJS = require("crypto-js");
require("dotenv").config();
const { STRIPE_KEY } = process.env;
const stripe = require("stripe")(STRIPE_KEY);

module.exports.makePayment = async (req, res, next) => {
    const { tokenId, amount } = req.body
    stripe.charges.create({
        source: tokenId,
        amount: amount,
        currency: "usd"
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            const newErr = new Error();
            newError.message = stripeErr.message;
            newError.status = 404;
            next(newError);
        }
        res.status(201).json({ status: 201, message: "Payment Successful", payload: stripeRes})
    })
}

// module.exports.getUser = async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         const user = await User.findById(id)
//         if (!user) {
//             throw new Error("User Not Found")
//         }
//         const { password: lol, ...others } = user
//         res.status(201).json({status: 201, message: "User FOund", payload: others})
//     } catch (error) {
//         const newError = new Error();
//         newError.message= (error.message);
//         newError.status = 401;
//         next(newError)
//     }
// };

// module.exports.editUser = async (req, res, next) => {
//     const { password, email } = req.body;
//     const { id } = req.params
//     if (!password && !user) {
//         return res.status(403).json({
//             status: 403,
//             message: "No Access",
//         })
//     }
//     try {
//         update = {
//             ...(password && { password: CryptoJS.AES.encrypt(password, PASS_SEC).toString() }),
//             ...(email && {email})
//         }
//         const updatedUser = await User.findByIdAndUpdate(id, update, { new: true })
//         if (!updatedUser) {
//             throw new Error("User Not Found")
//         }
//         const { password: lol, ...others } = updatedUser._doc;
//         console.log("Editted Successfully")
//         res.status(200).json({ status: 200, message: "Edited Sucessfully", payload: others})
//     } catch (error) {
//         const newError = new Error();
//         newError.message= (error.message);
//         newError.status = 401;
//         next(newError)
//     }
// };

// module.exports.deleteUser = async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         const result = await User.findByIdAndDelete(id)
//         if (!result) {
//             throw new Error("User Not Found")
//         }
//         const { password: lol, ...others} = result
//         res.status(201).json({ status: 201, message: "Sucessfully Deleted", payload: others })
//     } catch (error) {
//         const newError = new Error();
//         newError.message= (error.message);
//         newError.status = 401;
//         next(newError)
//     }
// };