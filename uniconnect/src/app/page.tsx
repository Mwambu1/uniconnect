"use client";
import { signIn } from "@/lib/firebase/auth/userAuth";
import { appRoutes } from "@/lib/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  // State for email and password
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const router = useRouter();

  // Submit function to handle sign-in
  const submit = async () => {
    const userData = { email, password };
  
    try {
      const res = await signIn(userData);  // Wait for the result of signIn
      if (res === 'success') {
        router.push(appRoutes.feed);  // Navigate if login is successful
      } else {
        console.error("Login failed");
        // Handle failed login case here (e.g., show an error message)
      }
    } catch (error) {
      console.error("An error occurred during sign-in", error);
      // Handle errors that occurred during sign-in process
    }
  };

  return (
    <main className="grid grid-cols-1 xl:flex max-h-screen items-center bg-white justify-between xl:p-24">
      <div className="flex flex-col gap-3 p-10">
        <div className="flex justify-center">
          <Image className="flex justify-center bg-transparent" src="/unza_logo.png" alt="unza logo" width={200} height={400}></Image>
        </div>
        <h1 className="text-gray-800 text-center">Welcome to <span className="font-extrabold text-gray-400">UNICONNECT</span></h1>
      </div>
      
      <div className="relative m-5 flex flex-col text-gray-700 bg-transparent shadow-xl p-5 rounded-xl bg-clip-border">
        <h4 className="block font-sans text-center text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Sign Up
        </h4>
        <p className="block text-center mt-1 font-sans text-xs antialiased font-normal leading-relaxed text-gray-700">
          Nice to meet you! Enter your details to register.
        </p>
        <form className="xl:max-w-screen-lg mt-2 mb-2 sm:w-96" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-3 mb-1">
            <h6 className="block -mb-3 font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Your Email
            </h6>
            <div className="relative h-8 w-full xl:min-w-[200px]">
              <input 
                placeholder="name@mail.com"
                value={email}  // Bind input value to email state
                onChange={(e) => setEmail(e.target.value)}  // Update state on change
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
              />
            </div>
            
            <h6 className="block -mb-1 font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Password
            </h6>
            <div className="relative h-8 w-full min-w-[200px]">
              <input 
                type="password" 
                placeholder="********"
                value={password}  // Bind input value to password state
                onChange={(e) => setPassword(e.target.value)}  // Update state on change
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
              />
            </div>
          </div>
          
          <button
            onClick={submit}  // Call submit function on click
            className="mt-3 block w-full select-none rounded-lg bg-gray-900 py-3 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Sign Up
          </button>
          
          <p className="block mt-4 font-sans text-xs antialiased font-normal leading-relaxed text-center text-gray-700">
            Already have an account?
            <a href={appRoutes.createAccount} className="font-medium text-gray-900">
              Sign In
            </a>
          </p>
        </form>
      </div>  
    </main>
  );
}
