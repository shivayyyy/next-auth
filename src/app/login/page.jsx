"use client";

import Link from "next/link";
import React ,{ useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function LoginPage() {
  const router=useRouter();
  const [user,setUser]=useState({
    email:"",
    password:"",
  })

  const [loading,setLoading]=useState(false);
  const [buttonDisable,setButtonDisable]=useState(true)

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisable(false)
    }
    else{
      setButtonDisable(true);
    }
  },[user])

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };
  
 
  const onLogin=async(e)=>{
    try {
      e.preventDefault();
      setLoading(true);
      const savedUser=await axios.post("/api/user/login",user)
      if(!savedUser){
        console.log("user doesnt save to database")
      }
      console.log("saved user is:",savedUser)


      
      router.push("/profile")
      
    } catch (error) {
      console.log(error.message);
    }
    finally{
      setLoading(false)
    }
  }


    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md bg-zinc-900 text-white rounded-2xl shadow-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center">{loading ? "Please wait":"Welcome Back"}</h2>
          <p className="text-zinc-400 text-center text-sm">Login to continue to your dashboard</p>
          
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
              <input
              name="email"
                value={user.email}
                onChange={handleChange}
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>
  
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
              <input
              name="password"
                value={user.password}
                onChange={handleChange}
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
  
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox accent-indigo-500" />
                <span>Remember me</span>
              </label>
              <a href="/forgot" className="text-indigo-500 hover:underline">Forgot password?</a>
            </div>
  
            <button
              onClick={onLogin}
              
              className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 ${
                buttonDisable ? "bg-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {buttonDisable ? "Enter credential": "Login"}
            </button>
          </form>
  
          <p className="text-center text-sm text-zinc-500">
            Don’t have an account? <Link href="/signup" className="text-indigo-500 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    );
  }
  