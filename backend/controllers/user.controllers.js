import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const generateTokens = async(userID) => { //async handler could'nt be used, as it by default accepts function with parameters (req, res).
    try {
        const user = await User.findById(userID);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        //console.log(accessToken, refreshToken);
    
        user.refreshToken = refreshToken; //saving the refreshToken in the DB as well.
        user.save({validateBeforeSave : false});
        return {accessToken, refreshToken};
    } catch (error) {
        console.log(`token gen error`);
        throw new ApiError(500, "Error generating tokens!!");
    }
};

const onSignup = asyncHandler( async(req, res) => {
    const {fullName, username, email, password, role} = req.body;
    console.log(username, fullName, email, password, role);
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
    //console.log(`hi`)
    //doing this method to create a new DB entry instead of create because we need to check whether options fields are empty or not.
    const userObj = {
        fullName : fullName,
        username : username,
        email : email,
        password : password,
    }
    if(role == "student" || role == "expert" ){
        userObj.role = role;
    }
    const user = new User(userObj);
    if(!user){
        throw new ApiError(400, "Registration Failed, Please Try Again Later!!");
    }
    user.save();
    console.log(user);

    return res.status(200)
    .json(new ApiResponse(200, user, "User Registered Successfully!!"));

});

const onLogin = asyncHandler( async(req, res) => {
    
    const { username, email, password } = req.body;
    //console.log(username, password);
    if(!username || !password || !email){
        throw new ApiError(400, "All Fields Are Mandatory!!");
    }

    const user = await User.findOne({
        $or: [{username}, {email}],
    });
    //console.log(user);
    if(!user){
        throw new ApiError(400, "User does not exist!!");
    }
    //comparing the passwords:
    const isMatch = await user.isPasswordCorrect(password);
    if(!isMatch){
        throw new ApiError(400, "Invalid Password!!");
    }

    //now generating tokens to validate the login of the user:
    const { accessToken, refreshToken } = await generateTokens(user._id);
    //console.log(accessToken, refreshToken);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const cookieOptions={ //cookie config and settings, so that they can only be edited by the server.
        httpOnly: true,
        secure: false,
    }
    return res.status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken,
    }, "User logged in Successfully!!"));
});

const getCurrentUserInfo = asyncHandler( async(req, res) => {
    const currUser = req?.user;
    console.log(currUser);
    if(!currUser){
        throw new ApiError(401, "You are not logged in!!");
    }
    return res.status(200)
    .json(new ApiResponse(200, currUser, "User Details Fetched Successfully!!"));
});

export {
    onSignup,
    onLogin,
    getCurrentUserInfo,
}