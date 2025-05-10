"use client"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router=useRouter();

 
  const handleLogout=async ()=>{
    try {
      await axios.get("/api/user/logout")
      console.log("logged out successfully")
      router.push("/login")
    } catch (error) {
      console.log("error during logout:",error)
    }
  }

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await axios.get('/api/user/selfData');
        
        const newId=response.data.data._id;
        const userName=response.data.data.name;
        console.log(userName)
       
        router.push(`/profile/${newId}/${userName}`)
        
      } catch (error) {
        console.error('Error fetching ID', error);
      }
    };
    fetchId();
}, []
     
)

 
    return (
      
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        
        <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-2xl p-8 space-y-4 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
  
          <div className="bg-zinc-800 rounded-xl p-6 space-y-3">
            <div>
              <p className="text-sm text-zinc-400">Profile Name</p>
              <p className="text-xl font-semibold">John Doe</p>
            </div>
  
            <div>
              <p className="text-sm text-zinc-400">Profile ID</p>
              <p className="text-lg  font-mono tracking-wide">#84910XZT</p>
            </div>

            <div>
          <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
      
            </div>
          </div>
        </div>
      </div>
    );
  }
  