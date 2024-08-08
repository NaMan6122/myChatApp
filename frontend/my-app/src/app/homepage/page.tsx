"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

export default function homePage(){
    
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connectedUsers, setConnectedUser] = useState([]);
    const route = useRouter();

    useEffect(() => { //configuring socket as soon as the page loads.
        const newSocket = io(
            //passing the server socket uri:
            process.env.SERVER_SOCKET_URI || "http://localhost:4500",{
                withCredentials : true,
            });
        setSocket(newSocket);

        //Handle incoming messages or connection requests from before:
        socket?.on("previous-connections", (users) => {
            setConnectedUser(users);
        });
    });

    //this function will be executed only if the logged in user is a student.
    const findExpertRequest = async function(){
        try {
            //get the loggedin user data from backend to find whether this is a student or expert:
            const response = await axios.get("http://localhost:4500/api/v1/get-user-info");
            console.log(response);
        } catch (error : any) {
            console.log(error, error?.message); 
        }
    }



    return (<div className="grid grid-cols-[1fr_2px_3fr] w-screen h-screen">
        {/* Left Section */}
        <div className="p-6 bg-slate-950">
          <h1 className="mb-4 text-2xl font-bold">MyChatApp</h1>
          
          <p>Conversations</p>
        </div>
  
        {/* Vertical Line */}
        <div className="bg-amber-600"></div>
  
        {/* Right Section */}
        <div className="p-6 bg-slate-950">
          <h1 className="text-2xl font-bold">send request to expert</h1>
          <p>Chat with users</p>
        </div>
      </div>)
}