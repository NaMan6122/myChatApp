"use client"
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function signupPage() {
    const router = useRouter(); //initializing router.
    const [user, setUser] = React.useState({ //declaring useState to store signup info entered by the user.
        fullName: "",
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = React.useState(false);

    const [buttonDisabled, setButtonDisabled] = React.useState(true);

    //function to handle the form submission:
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:4500/api/v1/users/signup", user);
            console.log(`Signup Successful!! ${response.data}`);
            alert("User Signup Successful!");
            toast.success(`Signup Successful!!`);
            router.push("/login");
        } catch (error: any) {
            console.log(`Signup Error!!, Please Try Again Later! ${error.message}`);
            toast.error = error.message;
        } finally{
            setLoading(false);
        }
    }

    //creating a useEffect hook so that the signup button becomes visible only if all the details are filled and no field is empty.
    useEffect(() => {
        if(user.fullName.length > 0 && user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    })

    return (
        <div className = "flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing....":"Sign Up"}</h1>
            <hr />

            <label htmlFor = "fullName">Full Name</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="fullName"
            type="text"
            value={user.fullName}
            onChange={(e) => setUser({...user, fullName: e.target.value})}
            placeholder="Full Name"
            />

            <label htmlFor = "username">username</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange = {(e) => setUser({...user, username: e.target.value})}
            placeholder= "username"
            />

            <label htmlFor = "email">email</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="email"
            value={user.email}
            onChange = {(e) => setUser({...user, email: e.target.value})}
            placeholder= "email"
            />

            <label htmlFor = "password">password</label>
            <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange = {(e) => setUser({...user, password: e.target.value})}
            placeholder= "password"
            />

            <button
            onClick = {handleSubmit}
            className="p-2 border border-fray-300 rounded-lg mb-4 focus: outline-none focus border-gray-600">{buttonDisabled ? "Please Fill Up All Fields" : "Sign Up"}</button>
            <Link href="/login">Already a user? Login Here</Link>
        </div>
    )
}