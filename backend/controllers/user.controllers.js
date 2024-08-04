import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const onSignup = asyncHandler( async(req, res) => {
    const {fullName, username, email, password} = req.body;
    console.log(username, fullName, email, password);
    if(!fullName || !username || !email  || !password ){
        throw new ApiError(400, "All Fields Are Mandatory!!");
    }
    
    //checking if user already exists.
    const existingEntry = await User.findOne({
        $or: [{username}, {email}]
    });
    if(existingEntry){
        throw new ApiError(400, "User Already Exists!!");
    }
    console.log(`hi`)
    
    const user = await User.create({
        fullName,
        username,
        email,
        password,
    });
    console.log(user);
    if(!user){
        throw new ApiError(400, "Registration Failed, Please Try Again Later!!");
    }
    return res.status(200)
    .json(new ApiResponse(200, user, "User Registered Successfully!!"));

});

export {
    onSignup,
}