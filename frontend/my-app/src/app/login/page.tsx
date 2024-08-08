"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:4500/api/v1/users/login", user);
            console.log(`User login successfull!! ${response.data}`);
            alert("User login successfull!!");
            router.push("/homepage");
            setLoading(false);
        } catch (error: any) {
            console.log(error, error.message);
        }
    }

    //creating a useEffect hook so that the signup button becomes visible only if all the details are filled and no field is empty.
    useEffect(() => {
        if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    })

    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing...." : "Login"}</h1>
        <hr />
        <label htmlFor="email">email</label>
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
        />

        <label htmlFor="username">username</label>
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
        />

        <label htmlFor="password">password</label>
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
        />

        <Link href="/resetpassword">forgot password?</Link>
        <br></br>
        <button
            onClick={onLogin}
            className="p-2 border border-fray-300 rounded-lg mb-4 focus: outline-none focus border-gray-600">{buttonDisabled ? "Please Fill All Fields" : "Login"}</button>
        <Link href="/signup">New here? Lets Signup</Link>
    </div>)
}