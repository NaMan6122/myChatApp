import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/userModel.js"

//Method to validate a loggedIn user, also adds a 'user' field in the req object for secured routes to gain access over user details.
const verifyJWT = asyncHandler( async(req, _, next) => {
    //note that a user will only be considered logged in, if he has the access token with him.
    //const token = req.header('x-auth-token');
    //console.log(req.cookies);
    const accessToken = req.cookies?.accessToken || req.header("Authorization").replace("Bearer", "");
    //console.log(`AccessToken: ${accessToken}`);
    if(!accessToken){
        throw new ApiError(400, "Invalid Request!! Please Register or Login First!!");
    }

    //now to verify whether that the token is correct or not, we decode the token using token secret,
    //the decoded token will have the field _id, now we will search for the user with this _id.

    const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    if(!user){
        throw new ApiError(400, "Invalid Access Token, User does not exisst!!");
    }
    //now we have the user, we can add him to the req object, so that we can access it in other routes, directly.
    req.user = user;
    next();
});

export { verifyJWT };