"use client";

import Link from "next/link";
import React ,{ useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function SignupPage() {
  const router=useRouter();

  const [buttonDisable,setButtonDisable]=useState(true)
  const [loading,setLoading]=useState(false);

  const [user,setUser]=useState({
    name:"",
    email:"",
    password:""
  })

  useEffect(()=>{
    if(user.name.length > 0 && user.email.length > 0 && user.password.length > 0){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  },[user])

  const onSignup=async (e)=>{
    try {
      e.preventDefault();
      setLoading(true);
      
      const response = await axios.post('/api/user/signup', user);
      console.log("submitting", user)
      console.log("signup successfully",response)
      router.push("/login");
    } catch (error) {
      console.log("sign up failed")
    }finally{
      setLoading(false)
    }


  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };
  


    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md bg-zinc-900 text-white rounded-2xl shadow-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center">{loading?"Loading":"Create Account"}</h2>
          <p className="text-zinc-400 text-center text-sm">Sign up to get started</p>
  
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">Name</label>
              <input
              name="name"
              value={user.name}
              onChange={handleChange}
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
              />
            </div>
  
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
  
            
  
            <button
              onClick={onSignup}
              
              className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 ${
                buttonDisable ? "bg-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {buttonDisable ? "Add details": "Sign Up"}
            </button>
          </form>
  
          <p className="text-center text-sm text-zinc-500">
            Already have an account? <Link href="/login" className="text-indigo-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    );
  }
  