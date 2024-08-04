"use-client"
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function signupPage() {
    const router = useRouter(); //initializing router.
    const [user, setUser] = React.useState({ //declaring useState to store signup info entered by the user.
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
            const response = await axios.post("")

        } catch (error: any) {
            console.log(`Signup Error!!, Please Try Again Later! ${error.message}`);
            toast.error = error.message;
        }
    }
}